'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Ensuring fonts and DOM are fully ready, plus a cinematic minimum wait time.
    const handleLoad = () => {
      // Small artificial delay to guarantee the animation is seen and sets the mood
      setTimeout(() => setLoading(false), 1200);
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#020408', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          {/* Animated Noise Background Overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.05,
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />

          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ 
              fontFamily: "'Space Mono', monospace", 
              fontSize: '0.75rem', 
              color: '#00ffa3', 
              letterSpacing: '4px',
              marginBottom: '16px'
            }}
          >
            SYSTEM INITIALIZING
          </motion.div>

          {/* Cinematic Title */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            style={{ 
              fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', 
              color: '#ffffff', letterSpacing: '4px', fontWeight: 800,
              textTransform: 'uppercase'
            }}
          >
            R<span style={{ color: '#63c5ff' }}>A</span>UHAN
          </motion.div>
          
          <div style={{ marginTop: '30px', width: '180px', height: '1px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
              style={{ width: '40%', height: '100%', background: '#63c5ff', boxShadow: '0 0 10px #63c5ff' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
