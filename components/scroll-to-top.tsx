'use client'

import { useEffect, useState } from 'react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 300)
    window.addEventListener('scroll', toggle, { passive: true })
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: '32px', right: '32px', zIndex: 40,
        width: '44px', height: '44px',
        background: '#63c5ff',
        color: '#020408',
        border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Space Mono', monospace",
        fontSize: '1rem', fontWeight: 700,
        cursor: 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0)',
        transition: 'opacity 0.3s, transform 0.3s, background 0.2s',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#00ffa3'
        e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,163,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#63c5ff'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      ↑
    </button>
  )
}
