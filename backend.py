"""
Simple FastAPI Backend with SQLite Database and PhonePe Integration
Run with: uvicorn backend:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from datetime import datetime, date, timedelta
import hashlib
import base64
import json
import uuid
import random
import string
import httpx
import requests
from uuid import uuid4
from phonepe.sdk.pg.payments.v2.standard_checkout_client import StandardCheckoutClient
from phonepe.sdk.pg.payments.v2.models.request.standard_checkout_pay_request import StandardCheckoutPayRequest
from phonepe.sdk.pg.payments.v2.models.request.create_sdk_order_request import CreateSdkOrderRequest
from phonepe.sdk.pg.common.models.request.meta_info import MetaInfo
from phonepe.sdk.pg.env import Env
from phonepe.sdk.pg.common.exceptions import PhonePeException

# ============= Configuration =============
# Production Configuration
USE_PRODUCTION = True

# Production Credentials from PhonePe
PHONEPE_CLIENT_ID = "SU2509081721523360149881"
PHONEPE_CLIENT_VERSION = "1"
PHONEPE_CLIENT_SECRET = "666ac7e0-800e-409b-8ba6-a080e8bb7d77"

# Production URLs
PHONEPE_PRODUCTION_URL = "https://api.phonepe.com/apis/hermes"
PHONEPE_CALLBACK_URL = "https://smartgen.smartlearners.ai/payment/callback"
PHONEPE_REDIRECT_URL = "https://smartlearners.ai/payment-success"

# Course fees mapping
COURSE_FEES = {
    "cbse-6-10": 200.00,
    "cbse-11-12": 300.00,
    "cbse-jee-foundation": 500.00,
    "jee-mains": 800.00,
    "jee-advanced": 1000.00
}

# Initialize PhonePe SDK Client
try:
    phonepe_env = Env.PRODUCTION if USE_PRODUCTION else Env.SANDBOX

    phonepe_client = StandardCheckoutClient.get_instance(
        client_id=PHONEPE_CLIENT_ID,
        client_secret=PHONEPE_CLIENT_SECRET,
        client_version=int(PHONEPE_CLIENT_VERSION),
        env=phonepe_env,
        should_publish_events=False
    )

    env_name = "PRODUCTION" if USE_PRODUCTION else "SANDBOX"
    print(f"[SUCCESS] PhonePe SDK Client initialized successfully in {env_name} mode")
    print(f"Using Client ID: {PHONEPE_CLIENT_ID}")

except Exception as e:
    print(f"PhonePe SDK Client initialization failed: {e}")
    phonepe_client = None

# ============= Database Setup =============
DATABASE_URL = "sqlite:///./smartlearners.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ============= Database Models =============
class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    registration_id = Column(String, unique=True, index=True)
    student_name = Column(String)
    parent_name = Column(String)
    email = Column(String)
    mobile_number = Column(String)
    class_level = Column(String)
    school_name = Column(String)
    city = Column(String)
    selected_course = Column(String)
    course_fee = Column(Float)
    how_did_you_hear = Column(String)
    other_source = Column(String, nullable=True)
    status = Column(String, default="pending")  # pending, payment_initiated, paid, completed
    created_at = Column(DateTime, default=datetime.utcnow)

    payments = relationship("PaymentTransaction", back_populates="registration")

class PaymentTransaction(Base):
    __tablename__ = "payment_transactions"

    id = Column(Integer, primary_key=True, index=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"))
    merchant_order_id = Column(String, unique=True, index=True)
    phonepe_transaction_id = Column(String, nullable=True)
    amount = Column(Float)
    payment_status = Column(String, default="PENDING")
    callback_received = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    registration = relationship("Registration", back_populates="payments")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"))
    username = Column(String, unique=True, index=True)
    password = Column(String)  # Store plain password for simplicity (not recommended for production)
    email = Column(String)
    mobile_number = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

# Create all tables
Base.metadata.create_all(bind=engine)

# ============= Pydantic Schemas =============
class RegistrationCreate(BaseModel):
    student_name: str
    parent_name: str
    email: EmailStr
    mobile_number: str
    class_level: str
    school_name: str
    city: str
    selected_course: str
    how_did_you_hear: str
    other_source: Optional[str] = None

class PaymentInitiate(BaseModel):
    registration_id: str  # Can be either numeric ID or string registration_id

class FreeTrialCreate(BaseModel):
    fullname: str
    email: EmailStr
    username: str
    roll_number: str
    phone_number: str
    password: Optional[str] = None
    payment_done: Optional[bool] = False
    school_name: Optional[str] = None
    class_name: Optional[str] = None

# ============= Utility Functions =============
def generate_username(student_name: str, registration_id: int) -> str:
    """Generate unique username"""
    clean_name = ''.join(c for c in student_name if c.isalnum()).lower()[:8]
    return f"{clean_name}{registration_id}"

def generate_password(length: int = 10) -> str:
    """Generate random password"""
    chars = string.ascii_letters + string.digits + "!@#$%"
    return ''.join(random.choice(chars) for _ in range(length))

# ============= PhonePe Integration =============
def generate_phonepe_checksum(payload: str, endpoint: str = "/pg/v1/pay") -> str:
    """Generate checksum for PhonePe API"""
    data = payload + endpoint + PHONEPE_CLIENT_SECRET
    checksum = hashlib.sha256(data.encode()).hexdigest()
    return checksum + "###" + PHONEPE_CLIENT_VERSION

def initiate_phonepe_payment_direct(amount: float, merchant_order_id: str, mobile_number: str) -> Dict[str, Any]:
    """Direct PhonePe API integration as fallback"""
    try:
        amount_in_paise = int(amount * 100)

        # Create payment request payload
        payload_dict = {
            "merchantId": PHONEPE_CLIENT_ID,
            "merchantTransactionId": merchant_order_id,
            "merchantUserId": f"USER_{merchant_order_id[:8]}",
            "amount": amount_in_paise,
            "redirectUrl": f"{PHONEPE_REDIRECT_URL}?order_id={merchant_order_id}",
            "redirectMode": "REDIRECT",
            "callbackUrl": PHONEPE_CALLBACK_URL,
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }

        # Encode payload
        payload_json = json.dumps(payload_dict)
        payload_base64 = base64.b64encode(payload_json.encode()).decode()

        # Generate checksum
        checksum = generate_phonepe_checksum(payload_base64, "/pg/v1/pay")

        # Make API request
        headers = {
            "accept": "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum
        }

        request_body = {
            "request": payload_base64
        }

        # Use production or sandbox URL based on configuration
        api_url = "https://api.phonepe.com/apis/hermes/pg/v1/pay" if USE_PRODUCTION else "https://api-preprod.phonepe.com/apis/merchant-simulator/pg/v1/pay"

        print(f"=== Direct API Payment Request ===")
        print(f"API URL: {api_url}")
        print(f"Merchant ID: {PHONEPE_CLIENT_ID}")
        print(f"Transaction ID: {merchant_order_id}")
        print(f"Amount: Rs.{amount} ({amount_in_paise} paise)")
        print(f"Callback URL: {PHONEPE_CALLBACK_URL}")
        print(f"Redirect URL: {PHONEPE_REDIRECT_URL}")

        # Debug payload
        print(f"\n--- Payload Debug ---")
        print(f"Payload Dict: {json.dumps(payload_dict, indent=2)}")
        print(f"Payload JSON String: {payload_json}")
        print(f"Payload Base64: {payload_base64}")

        # Debug checksum
        print(f"\n--- Checksum Debug ---")
        print(f"Checksum Input: {payload_base64 + '/pg/v1/pay' + PHONEPE_CLIENT_SECRET}")
        print(f"Salt Key: {PHONEPE_CLIENT_SECRET}")
        print(f"Checksum: {checksum}")

        print(f"\n--- Request Debug ---")
        print(f"Request Headers: {json.dumps(headers, indent=2)}")
        print(f"Request Body: {json.dumps(request_body, indent=2)}")
        print(f"==================================")

        response = requests.post(api_url, json=request_body, headers=headers, timeout=30)

        print(f"API Response Status: {response.status_code}")
        print(f"API Response Headers: {dict(response.headers)}")

        try:
            response_data = response.json()
            print(f"API Response JSON: {response_data}")
        except Exception as e:
            print(f"Failed to parse JSON response: {e}")
            print(f"Raw Response Text: {response.text}")
            response_data = {"error": "Invalid JSON response", "raw_text": response.text}

        if response.status_code == 200 and response_data.get("success"):
            redirect_url = response_data.get("data", {}).get("instrumentResponse", {}).get("redirectInfo", {}).get("url")

            if redirect_url:
                return {
                    "success": True,
                    "redirect_url": redirect_url,
                    "transaction_id": merchant_order_id
                }
            else:
                return {
                    "success": False,
                    "error": "No redirect URL in response",
                    "response": response_data
                }
        else:
            error_msg = response_data.get("message", "Unknown error")
            error_code = response_data.get("code", "UNKNOWN")
            return {
                "success": False,
                "error": f"{error_code}: {error_msg}",
                "response": response_data
            }

    except Exception as e:
        print(f"Direct API Error: {str(e)}")
        return {"success": False, "error": str(e)}

def initiate_phonepe_payment_sdk(amount: float, merchant_order_id: str, mobile_number: str) -> Dict[str, Any]:
    """Initiate payment with PhonePe using official SDK"""
    try:
        if phonepe_client is None:
            return {
                "success": False,
                "error": "PhonePe SDK client not initialized"
            }

        amount_in_paise = int(amount * 100)

        # Create payment request using official SDK method
        # Note: PhonePe SDK doesn't support callback_url in build_request
        standard_pay_request = StandardCheckoutPayRequest.build_request(
            merchant_order_id=merchant_order_id,
            amount=amount_in_paise,
            redirect_url=f"{PHONEPE_REDIRECT_URL}?order_id={merchant_order_id}"
        )

        print(f"=== PhonePe SDK Payment Request ===")
        print(f"Order ID: {merchant_order_id}")
        print(f"Amount: Rs.{amount} ({amount_in_paise} paise)")
        print(f"Redirect URL: {PHONEPE_REDIRECT_URL}?order_id={merchant_order_id}")
        print(f"==================================")

        # Initiate payment using official SDK
        standard_pay_response = phonepe_client.pay(standard_pay_request)

        print(f"PhonePe SDK Response Type: {type(standard_pay_response)}")
        print(f"PhonePe SDK Response: {standard_pay_response}")

        # Try to get redirect URL from response
        redirect_url = None
        if hasattr(standard_pay_response, 'redirect_url'):
            redirect_url = standard_pay_response.redirect_url
        elif hasattr(standard_pay_response, 'data') and hasattr(standard_pay_response.data, 'redirect_url'):
            redirect_url = standard_pay_response.data.redirect_url
        elif isinstance(standard_pay_response, dict) and 'redirect_url' in standard_pay_response:
            redirect_url = standard_pay_response['redirect_url']

        print(f"Extracted redirect URL: {redirect_url}")

        if redirect_url:
            return {
                "success": True,
                "redirect_url": redirect_url,
                "transaction_id": merchant_order_id
            }
        else:
            return {
                "success": False,
                "error": "Failed to get redirect URL from PhonePe",
                "response": str(standard_pay_response)
            }

    except PhonePeException as pe:
        print(f"PhonePe SDK Exception: Code={pe.code}, Message={pe.message}")
        return {
            "success": False,
            "error": pe.message,
            "code": pe.code
        }
    except Exception as e:
        print(f"General Error: {str(e)}")
        return {"success": False, "error": str(e)}

def get_phonepe_order_status_direct(merchant_order_id: str) -> Dict[str, Any]:
    """Get order status from PhonePe using direct API"""
    try:
        # Create status check request
        endpoint = f"/pg/v1/status/{PHONEPE_CLIENT_ID}/{merchant_order_id}"
        checksum = generate_phonepe_checksum("", endpoint)

        headers = {
            "accept": "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": PHONEPE_CLIENT_ID
        }

        api_url = f"https://api.phonepe.com/apis/hermes{endpoint}" if USE_PRODUCTION else f"https://api-preprod.phonepe.com/apis/merchant-simulator{endpoint}"

        response = requests.get(api_url, headers=headers, timeout=30)
        response_data = response.json()

        print(f"Direct API Status Response: {response_data}")

        if response.status_code == 200 and response_data.get("success"):
            payment_state = response_data.get("data", {}).get("state", "PENDING")
            return {
                "success": True,
                "payment_status": payment_state,
                "order_id": merchant_order_id,
                "response": response_data
            }
        else:
            return {
                "success": False,
                "error": response_data.get("message", "Status check failed"),
                "response": response_data
            }

    except Exception as e:
        print(f"Direct API Status Check Error: {str(e)}")
        return {"success": False, "error": str(e)}

def get_phonepe_order_status(merchant_order_id: str) -> Dict[str, Any]:
    """Get order status from PhonePe using official SDK"""
    try:
        if phonepe_client is None:
            # Fallback to direct API if SDK not initialized
            return get_phonepe_order_status_direct(merchant_order_id)

        # Get order status using official SDK
        response = phonepe_client.get_order_status(merchant_order_id, details=False)

        print(f"Order Status Response: {response}")

        return {
            "success": True,
            "payment_status": response.state,
            "order_id": merchant_order_id,
            "response": str(response)
        }

    except PhonePeException as pe:
        print(f"PhonePe Status Check Exception: Code={pe.code}, Message={pe.message}")
        # Fallback to direct API
        return get_phonepe_order_status_direct(merchant_order_id)
    except Exception as e:
        print(f"Status Check Error: {str(e)}")
        # Fallback to direct API
        return get_phonepe_order_status_direct(merchant_order_id)

def validate_phonepe_callback(username: str, password: str, callback_header: str, callback_body: str) -> Dict[str, Any]:
    """Validate PhonePe callback using official SDK"""
    try:
        if phonepe_client is None:
            return {
                "success": False,
                "error": "PhonePe SDK client not initialized"
            }

        # Validate callback using official SDK
        callback_response = phonepe_client.validate_callback(
            username=username,
            password=password,
            callback_header_data=callback_header,
            callback_response_data=callback_body
        )

        callback_type = callback_response.callback_type
        callback_data = callback_response.callback_data

        return {
            "success": True,
            "callback_type": callback_type,
            "callback_data": callback_data,
            "merchant_order_id": getattr(callback_data, 'merchant_transaction_id', None),
            "state": getattr(callback_data, 'state', None)
        }

    except PhonePeException as pe:
        print(f"PhonePe Callback Validation Exception: Code={pe.code}, Message={pe.message}")
        return {
            "success": False,
            "error": pe.message,
            "code": pe.code
        }
    except Exception as e:
        print(f"Callback Validation Error: {str(e)}")
        return {"success": False, "error": str(e)}

# ============= FastAPI App =============
app = FastAPI(title="Smart Learners API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://www.smartlearners.ai",
        "https://smartlearners.ai",
        "https://smartgen.smartlearners.ai"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============= API Endpoints =============
@app.get("/")
async def root():
    return {"message": "Smart Learners Payment API", "status": "active"}

@app.post("/api/register")
async def register(registration: RegistrationCreate, db: Session = Depends(get_db)):
    """Create new registration"""
    try:
        # Generate unique registration ID
        reg_id = f"REG{datetime.now().strftime('%Y%m%d')}{uuid.uuid4().hex[:6].upper()}"

        # Get course fee
        course_fee = COURSE_FEES.get(registration.selected_course, 0)

        # Create registration
        db_registration = Registration(
            registration_id=reg_id,
            student_name=registration.student_name,
            parent_name=registration.parent_name,
            email=registration.email,
            mobile_number=registration.mobile_number,
            class_level=registration.class_level,
            school_name=registration.school_name,
            city=registration.city,
            selected_course=registration.selected_course,
            course_fee=course_fee,
            how_did_you_hear=registration.how_did_you_hear,
            other_source=registration.other_source
        )

        db.add(db_registration)
        db.commit()
        db.refresh(db_registration)

        return {
            "success": True,
            "registration_id": db_registration.registration_id,
            "id": db_registration.id,
            "course_fee": course_fee
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/payment/initiate")
async def initiate_payment(payment: PaymentInitiate, db: Session = Depends(get_db)):
    """Initiate payment with PhonePe"""
    try:
        # Get registration - handle both numeric ID and string registration_id
        registration = None

        # Try to parse as integer first (numeric ID)
        try:
            numeric_id = int(payment.registration_id)
            registration = db.query(Registration).filter(Registration.id == numeric_id).first()
        except ValueError:
            # If not numeric, treat as string registration_id
            registration = db.query(Registration).filter(Registration.registration_id == payment.registration_id).first()

        if not registration:
            print(f"Registration not found for ID: {payment.registration_id}")
            raise HTTPException(status_code=404, detail="Registration not found")

        print(f"Found registration: ID={registration.id}, RegID={registration.registration_id}, Course={registration.selected_course}, Fee={registration.course_fee}")

        # Generate merchant order ID
        merchant_order_id = f"ORD{datetime.now().strftime('%Y%m%d')}{uuid.uuid4().hex[:8].upper()}"

        # Create payment transaction
        payment_txn = PaymentTransaction(
            registration_id=registration.id,
            merchant_order_id=merchant_order_id,
            amount=registration.course_fee,
            payment_status="PENDING"
        )
        db.add(payment_txn)
        db.commit()

        # Update registration status
        registration.status = "payment_initiated"
        db.commit()

        # Production PhonePe Integration
        print("Initiating PhonePe payment...")

        # Try SDK first, then fallback to direct API
        payment_response = initiate_phonepe_payment_sdk(
            amount=registration.course_fee,
            merchant_order_id=merchant_order_id,
            mobile_number=registration.mobile_number
        )

        if not payment_response.get("success"):
            print(f"SDK failed: {payment_response.get('error')}")
            print("Attempting direct API integration...")

            # Fallback to direct API
            payment_response = initiate_phonepe_payment_direct(
                amount=registration.course_fee,
                merchant_order_id=merchant_order_id,
                mobile_number=registration.mobile_number
            )

        if payment_response.get("success"):
            return {
                "success": True,
                "merchant_order_id": merchant_order_id,
                "redirect_url": payment_response.get("redirect_url"),
                "amount": registration.course_fee
            }
        else:
            return {
                "success": False,
                "merchant_order_id": merchant_order_id,
                "error": payment_response.get("error"),
                "amount": registration.course_fee
            }

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/payment/callback")
async def payment_callback(request: Request, db: Session = Depends(get_db)):
    """Handle PhonePe payment callback with Basic Auth validation"""
    try:
        # Get callback data from headers and body
        callback_header = request.headers.get("Authorization", "")
        x_verify_header = request.headers.get("X-VERIFY", "")
        callback_body = await request.body()
        callback_body_str = callback_body.decode('utf-8')

        print(f"=== PhonePe Callback Received ===")
        print(f"Authorization Header: {callback_header}")
        print(f"X-VERIFY Header: {x_verify_header}")
        print(f"Callback Body: {callback_body_str}")
        print(f"================================")

        # Step 1: Validate Basic Auth credentials
        if callback_header:
            # Decode Basic Auth header
            try:
                # Format: "Basic base64(username:password)"
                auth_type, auth_string = callback_header.split(" ", 1)
                if auth_type.lower() == "basic":
                    decoded_auth = base64.b64decode(auth_string).decode('utf-8')
                    username, password = decoded_auth.split(":", 1)

                    # Validate credentials
                    if username != PHONEPE_CLIENT_ID or password != PHONEPE_CLIENT_SECRET:
                        print(f"❌ Invalid credentials: {username}")
                        raise HTTPException(status_code=401, detail="Invalid credentials")

                    print(f"✅ Basic Auth validated successfully")
            except Exception as e:
                print(f"❌ Basic Auth validation failed: {e}")
                raise HTTPException(status_code=401, detail="Authentication failed")

        # Step 2: For PhonePe SDK validation (if using SDK)
        username_configured = PHONEPE_CLIENT_ID
        password_configured = PHONEPE_CLIENT_SECRET

        # Validate callback using official SDK
        callback_response = validate_phonepe_callback(
            username=username_configured,
            password=password_configured,
            callback_header=x_verify_header or callback_header,
            callback_body=callback_body_str
        )

        if callback_response.get("success"):
            merchant_order_id = callback_response.get("merchant_order_id")
            payment_state = callback_response.get("state")

            print(f"Valid callback for order: {merchant_order_id}, state: {payment_state}")

            # Update payment transaction in database
            if merchant_order_id:
                payment_transaction = db.query(PaymentTransaction).filter(
                    PaymentTransaction.merchant_order_id == merchant_order_id
                ).first()

                if payment_transaction:
                    if payment_state == "COMPLETED":
                        payment_transaction.payment_status = "SUCCESS"
                    elif payment_state == "FAILED":
                        payment_transaction.payment_status = "FAILED"

                    payment_transaction.callback_received = True
                    db.commit()

            return {"status": "callback_processed", "success": True}

        else:
            print(f"Invalid callback: {callback_response.get('error')}")
            return {"status": "invalid_callback", "error": callback_response.get("error")}

    except Exception as e:
        print(f"Callback processing error: {str(e)}")
        return {"status": "error", "message": str(e)}

@app.get("/api/payment/status/{merchant_order_id}")
async def check_payment_status(merchant_order_id: str, db: Session = Depends(get_db)):
    """Check payment status and get credentials"""
    try:
        # Get payment transaction
        payment = db.query(PaymentTransaction).filter(
            PaymentTransaction.merchant_order_id == merchant_order_id
        ).first()

        if not payment:
            raise HTTPException(status_code=404, detail="Payment not found")


        # Check payment status with PhonePe SDK
        if payment.payment_status == "PENDING":
            # Try to get status from PhonePe
            try:
                status_response = get_phonepe_order_status(merchant_order_id)

                if status_response.get("success"):
                    phonepe_status = status_response.get("payment_status")
                    print(f"PhonePe Status Check Response: {status_response}")
                    print(f"PhonePe Payment Status: {phonepe_status}")

                    if phonepe_status == "COMPLETED" or phonepe_status == "SUCCESS":
                        payment.payment_status = "SUCCESS"
                        print("Payment marked as SUCCESS")
                    elif phonepe_status == "FAILED":
                        payment.payment_status = "FAILED"
                        print("Payment marked as FAILED")
                    else:
                        print(f"Payment status remains '{phonepe_status}'")
                else:
                    print(f"Status check failed - {status_response.get('error')}")
                    payment.payment_status = "PENDING"

            except Exception as e:
                print(f"Error checking PhonePe status: {e}")
                payment.payment_status = "PENDING"

            payment.callback_received = True
            db.commit()

            # Get registration
            registration = payment.registration

            # Generate user credentials
            existing_user = db.query(User).filter(User.registration_id == registration.id).first()

            print(f"DEBUG: payment.payment_status = '{payment.payment_status}'")
            print(f"DEBUG: existing_user = {existing_user}")
            print(f"DEBUG: existing_user is None = {existing_user is None}")

            # Check if payment is successful
            if payment.payment_status == "SUCCESS":
                if not existing_user:
                    # Create new user
                    username = generate_username(registration.student_name, registration.id)
                    password = generate_password()

                    # Create user
                    new_user = User(
                        registration_id=registration.id,
                        username=username,
                        password=password,
                        email=registration.email,
                        mobile_number=registration.mobile_number
                    )
                    db.add(new_user)

                    # Update registration status
                    registration.status = "completed"
                    db.commit()

                    return {
                        "success": True,
                        "payment_status": "SUCCESS",
                        "credentials": {
                            "username": username,
                            "password": password,
                            "login_url": "https://app1.aieducator.com/login"
                        },
                        "message": "Payment successful! Your account has been created."
                    }
                else:
                    # Return existing user credentials
                    print(f"DEBUG: Returning existing user credentials")
                    return {
                        "success": True,
                        "payment_status": "SUCCESS",
                        "credentials": {
                            "username": existing_user.username,
                            "password": existing_user.password,
                            "login_url": "https://app1.aieducator.com/login"
                        },
                        "message": "Payment already processed. Here are your credentials."
                    }

        print(f"DEBUG: Reached final return block. payment.payment_status = '{payment.payment_status}'")

        # If we reach here, payment status is likely FAILED or still PENDING
        if payment.payment_status == "SUCCESS":
            # This shouldn't happen, but handle SUCCESS case anyway
            return {
                "success": True,
                "payment_status": "SUCCESS",
                "message": "Payment was successful but credentials may not be available"
            }
        elif payment.payment_status == "FAILED":
            return {
                "success": False,
                "payment_status": "FAILED",
                "message": "Payment failed. Please try again."
            }
        else:
            # For any other status (including PENDING), treat as failed
            return {
                "success": False,
                "payment_status": payment.payment_status,
                "message": "Payment is still pending or failed"
            }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/test")
async def test_endpoint():
    """Test if API is working"""
    return {"status": "API is working", "timestamp": datetime.now().isoformat()}

@app.post("/api/free-trial/register")
async def register_free_trial(trial_data: FreeTrialCreate):
    """Register a free trial user by forwarding to external API"""
    try:
        # Prepare payload for external API
        payload = {
            "fullname": trial_data.fullname,
            "email": trial_data.email,
            "username": trial_data.username,
            "roll_number": trial_data.roll_number,
            "phone_number": trial_data.phone_number,
            "payment_done": trial_data.payment_done
        }

        # Only include optional fields if provided
        if trial_data.password:
            payload["password"] = trial_data.password
        if trial_data.school_name:
            payload["school_name"] = trial_data.school_name
        if trial_data.class_name:
            payload["class_name"] = trial_data.class_name

        print(f"=== Free Trial Registration ===")
        print(f"Username: {trial_data.username}")
        print(f"Email: {trial_data.email}")
        print(f"Forwarding to external API...")

        # Forward request to external API
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://autogen.aieducator.com/create-user-from-payment/",
                json=payload,
                headers={"Content-Type": "application/json"}
            )

            print(f"External API Response Status: {response.status_code}")
            print(f"External API Response: {response.text}")

            response_data = response.json()

            if response.status_code == 200 and response_data.get("status") == "success":
                return {
                    "success": True,
                    "status": "success",
                    "username": response_data.get("username"),
                    "payment_done": response_data.get("payment_done"),
                    "trial_expiry_date": response_data.get("trial_expiry_date")
                }
            else:
                error_msg = response_data.get("error", "Registration failed")
                raise HTTPException(status_code=response.status_code, detail=error_msg)

    except httpx.RequestError as e:
        print(f"Request Error: {str(e)}")
        raise HTTPException(status_code=503, detail=f"External API unreachable: {str(e)}")
    except HTTPException:
        raise
    except Exception as e:
        print(f"Free trial registration error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Run with: uvicorn backend:app --reload --port 8000