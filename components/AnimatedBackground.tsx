'use client'

import React, { useState, useEffect } from 'react'
import MathFormulasBackground from './MathFormulasBackground'
import GeometricShapesBackground from './GeometricShapesBackground'
import ParticleNetworkBackground from './ParticleNetworkBackground'
import GradientWaveBackground from './GradientWaveBackground'
import FloatingBubblesBackground from './FloatingBubblesBackground'
import SimpleTestBackground from './SimpleTestBackground'

const AnimatedBackground = () => {
  const [currentAnimation, setCurrentAnimation] = useState(0)
  const animations = [
    <SimpleTestBackground key="test" />,
    <MathFormulasBackground key="math" />,
    <GeometricShapesBackground key="geometric" />,
    <ParticleNetworkBackground key="particle" />
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % animations.length)
    }, 10000) // Change animation every 10 seconds

    return () => clearInterval(interval)
  }, [animations.length])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none' }}>
      <GradientWaveBackground />
      {animations[currentAnimation]}
    </div>
  )
}

export default AnimatedBackground