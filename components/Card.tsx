'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  hover?: boolean
  gradient?: boolean
  glass?: boolean
  glow?: boolean
  className?: string
  delay?: number
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  gradient = false,
  glass = false,
  glow = false,
  className = '',
  delay = 0,
  onClick
}) => {
  const baseClasses = 'card'
  const hoverClasses = hover ? 'card-hover' : ''
  const gradientClasses = gradient ? 'card-gradient' : ''
  const glassClasses = glass ? 'card-glass' : ''
  const glowClasses = glow ? 'card-glow' : ''
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${glassClasses} ${glowClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export default Card