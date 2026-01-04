'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type UserType = 'parent' | 'school' | null

interface UserTypeContextType {
  userType: UserType
  setUserType: (type: UserType) => void
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined)

export function UserTypeProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserTypeState] = useState<UserType>(null)

  useEffect(() => {
    // Load user type from localStorage on mount
    const savedType = localStorage.getItem('userType') as UserType
    if (savedType) {
      setUserTypeState(savedType)
    }
  }, [])

  const setUserType = (type: UserType) => {
    setUserTypeState(type)
    if (type) {
      localStorage.setItem('userType', type)
    } else {
      localStorage.removeItem('userType')
    }
  }

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  )
}

export function useUserType() {
  const context = useContext(UserTypeContext)
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider')
  }
  return context
}
