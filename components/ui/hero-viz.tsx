import { useEffect, useRef, useState } from "react"

export function PonderHeroViz({ videoSrc }: { videoSrc?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const rotatingWords = [
    "LENDING",
    "BORROWING",
    "EXCHANGES",
    "BRIDGES",
    "RESTAKING",
    "WALLETS",
    "NFT MARKETS",
    "AVS RETURNS",
    "ORDINALS",
    "FIAT RAMPS"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2200) // Change word every 2.2 seconds

    return () => clearInterval(interval)
  }, [])

  // Video autoplay
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.loop = true
      video.playsInline = true
      video.play().catch(() => {})
    }
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: '#4c1d95',
    }}>
      {/* Background Video */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      )}

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(75, 30, 150, 0.88), rgba(30, 10, 80, 0.78))',
        zIndex: 2,
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        padding: '48px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{
            width: 52, height: 52, background: 'white', borderRadius: '9999px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: 'bold', color: '#6b21a8'
          }}>P</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', color: '#ddd' }}>DON'T WONDER</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'white', lineHeight: 1 }}>PONDER</div>
          </div>
        </div>

        {/* Main Heading with Rotating Text */}
        <h1 style={{
          fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          color: 'white',
          marginBottom: '12px'
        }}>
          FIND THE BEST<br />
          <span style={{
            color: '#facc15',
            display: 'inline-block',
            minHeight: '1.1em',
            transition: 'opacity 0.4s ease'
          }}>
            {rotatingWords[currentIndex]}
          </span>
        </h1>

        <p style={{
          fontSize: '1.35rem',
          color: '#e0d4ff',
          marginBottom: '32px',
          fontWeight: 500
        }}>
          POWERED BY MACHINE LEARNING
        </p>

        {/* Button */}
        <a
          href="https://app.ponder.one/"
          target="_blank"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#6b21a8',
            color: 'white',
            padding: '16px 36px',
            borderRadius: '9999px',
            fontSize: '1.1rem',
            fontWeight: 600,
            textDecoration: 'none',
            width: 'fit-content',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#7c3aed'}
          onMouseLeave={e => e.currentTarget.style.background = '#6b21a8'}
        >
          Go to App
          <span style={{
            background: '#facc15',
            color: '#1e1b4b',
            fontSize: '0.85rem',
            padding: '4px 14px',
            borderRadius: '9999px',
            marginLeft: '12px',
            fontWeight: 700
          }}>Beta</span>
        </a>
      </div>
    </div>
  )
}