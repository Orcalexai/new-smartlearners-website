'use client'

import React, { useEffect, useRef } from 'react'
import './GeometricShapesBackground.css'

const GeometricShapesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const shapes: Shape[] = []
    const shapeCount = 15

    interface Shape {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      moveX: number
      moveY: number
      type: 'triangle' | 'square' | 'hexagon' | 'circle'
      opacity: number
    }

    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        moveX: (Math.random() - 0.5) * 0.5,
        moveY: (Math.random() - 0.5) * 0.5,
        type: ['triangle', 'square', 'hexagon', 'circle'][Math.floor(Math.random() * 4)] as Shape['type'],
        opacity: Math.random() * 0.15 + 0.05
      })
    }

    const drawShape = (shape: Shape) => {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate(shape.rotation)
      ctx.strokeStyle = `rgba(147, 51, 234, ${shape.opacity})`
      ctx.lineWidth = 2

      switch (shape.type) {
        case 'triangle':
          ctx.beginPath()
          ctx.moveTo(0, -shape.size)
          ctx.lineTo(shape.size * 0.866, shape.size * 0.5)
          ctx.lineTo(-shape.size * 0.866, shape.size * 0.5)
          ctx.closePath()
          ctx.stroke()
          break
        case 'square':
          ctx.strokeRect(-shape.size/2, -shape.size/2, shape.size, shape.size)
          break
        case 'hexagon':
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i
            const x = shape.size * Math.cos(angle)
            const y = shape.size * Math.sin(angle)
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.stroke()
          break
        case 'circle':
          ctx.beginPath()
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2)
          ctx.stroke()
          break
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.forEach(shape => {
        shape.x += shape.moveX
        shape.y += shape.moveY
        shape.rotation += shape.rotationSpeed

        if (shape.x < -50) shape.x = canvas.width + 50
        if (shape.x > canvas.width + 50) shape.x = -50
        if (shape.y < -50) shape.y = canvas.height + 50
        if (shape.y > canvas.height + 50) shape.y = -50

        drawShape(shape)
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      className="geometric-shapes-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }}
    />
  )
}

export default GeometricShapesBackground