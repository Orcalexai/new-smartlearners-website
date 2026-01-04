'use client'

import React from 'react'
import './MathFormulasBackground.css'

const MathFormulasBackground = () => {
  const mathSymbols = [
    'π = 3.14159...',
    '∑(n=1 to ∞)',
    '∫ f(x)dx',
    'E = mc²',
    'a² + b² = c²',
    '∂/∂x',
    'sin²θ + cos²θ = 1',
    'e^(iπ) + 1 = 0',
    'i² = -1',
    '(a+b)²',
    'F = ma',
    'PV = nRT',
    '√(x²) = |x|',
    'd/dx(xⁿ)',
    'log(xy)',
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {mathSymbols.map((formula, index) => (
        <div
          key={index}
          className={`math-formula formula-${index + 1}`}
        >
          {formula}
        </div>
      ))}
    </div>
  )
}

export default MathFormulasBackground