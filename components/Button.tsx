'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
  target?: '_blank' | '_self'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  href,
  type = 'button',
  target,
  disabled = false
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  }

  const isExternalLink = href && (href.startsWith('http') || href.startsWith('https'))
  const shouldOpenInNewTab = target === '_blank' || isExternalLink

  const buttonContent = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  )

  const buttonClasses = `btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href && !onClick) {
    if (isExternalLink) {
      return (
        <motion.a
          href={href}
          target={shouldOpenInNewTab ? '_blank' : '_self'}
          rel={shouldOpenInNewTab ? 'noopener noreferrer' : undefined}
          className={buttonClasses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {buttonContent}
        </motion.a>
      )
    } else {
      return (
        <Link href={href} className={buttonClasses}>
          <motion.div
            style={{ display: 'inline-flex', alignItems: 'center' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {buttonContent}
          </motion.div>
        </Link>
      )
    }
  }

  const handleClick = () => {
    if (href && shouldOpenInNewTab) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else if (onClick) {
      onClick()
    }
  }
  
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {buttonContent}
    </motion.button>
  )
}

export default Button