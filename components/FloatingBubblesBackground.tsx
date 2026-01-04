'use client'

import React from 'react'
import './FloatingBubblesBackground.css'

const FloatingBubblesBackground = () => {
  const bubbles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="bubbles-container">
      {bubbles.map((index) => (
        <div
          key={index}
          className={`bubble bubble-${index + 1}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 15}s`
          }}
        />
      ))}
    </div>
  )
}

export default FloatingBubblesBackground