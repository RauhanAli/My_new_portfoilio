'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Cinematic scroll animations for background
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  
  // Content parallax & fading
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scaleContent = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  // Framer motion variants for entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2 
      } 
    }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      scale: 1,
      transition: { duration: 1.2, ease: 'easeOut' } 
    }
  }

  const subheadingVariants: any = {
    hidden: { opacity: 0, y: 20, filter: 'blur(15px)', scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      scale: 1,
      transition: { duration: 1.6, ease: 'easeOut' } 
    }
  }

  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          overflow: hidden;
          padding: 80px 24px 40px;
          background: #020408;
        }

        /* Cinematic Background Blobs */
        .glow-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          mix-blend-mode: screen;
          z-index: 1;
        }

        .blob-1 {
          width: 500px;
          height: 500px;
          background: #63c5ff;
          top: -10%;
          left: 10%;
          animation: float1 15s ease-in-out infinite alternate;
        }

        .blob-2 {
          width: 600px;
          height: 600px;
          background: #0077ff;
          bottom: -20%;
          right: 5%;
          animation: float2 20s ease-in-out infinite alternate;
        }

        .blob-3 {
          width: 400px;
          height: 400px;
          background: #00ffa3;
          top: 30%;
          right: 30%;
          opacity: 0.2;
          animation: float3 18s ease-in-out infinite alternate;
        }

        @keyframes float1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(100px, 50px) scale(1.2); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-80px, -60px) scale(1.1); }
        }
        @keyframes float3 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, -80px) scale(1.3); }
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 32px;
          color: #ffffff;
          text-shadow: 0 4px 24px rgba(0,0,0,0.5);
        }
        
        .hero-title .accent { 
          background: linear-gradient(135deg, #ffffff 0%, #63c5ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.6);
          max-width: 640px;
          margin-bottom: 56px;
          line-height: 1.8;
          font-weight: 400;
          border-left: 2px solid rgba(99,197,255,0.4);
          padding-left: 24px;
        }
        
        .hero-sub strong {
          color: #ffffff;
          font-weight: 500;
        }

        .hero-ctas {
          display: flex;
          justify-content: flex-start;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 72px;
        }

        .btn-primary-am {
          position: relative;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 1px;
          padding: 16px 32px;
          background: #ffffff;
          color: #020408;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          border-radius: 2px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-primary-am::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        
        .btn-primary-am:hover {
          background: #63c5ff;
          color: #ffffff;
          box-shadow: 0 0 40px rgba(99,197,255,0.4);
          transform: translateY(-2px);
        }

        .btn-primary-am:hover::before {
          transform: translateX(100%);
        }

        .btn-secondary-am {
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 1px;
          padding: 16px 32px;
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-secondary-am:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-2px);
        }

        .hero-stats {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: 40px 80px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.06);
          width: 100%;
        }

        .stat-num {
          font-family: 'Space Mono', monospace;
          font-size: 2rem;
          color: #ffffff;
          font-weight: 700;
          display: block;
          margin-bottom: 4px;
        }
        
        .stat-num span {
          color: #63c5ff;
        }

        .stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-section { padding: 100px 5vw 60px; }
        }
        @media (max-width: 768px) {
          .hero-section { padding: 120px 24px 60px; }
          .hero-title { font-size: clamp(2.2rem, 8vw, 3.5rem); letter-spacing: -1px; }
          .hero-sub { padding-left: 16px; font-size: 1.05rem; }
          .hero-ctas { gap: 12px; }
          .hero-stats { gap: 32px 40px; padding-top: 32px; }
          .stat-num { font-size: 1.6rem; }
          .btn-primary-am, .btn-secondary-am { padding: 14px 24px; font-size: 0.75rem; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 100px 20px 50px; }
          .hero-ctas { flex-direction: column; align-items: stretch; }
          .btn-primary-am, .btn-secondary-am { justify-content: center; }
          .hero-stats { gap: 24px; }
          .stat-num { font-size: 1.4rem; }
        }
      `}</style>

      <section ref={containerRef} className="hero-section">
        {/* Cinematic Background Layer */}
        <motion.div 
          className="background-wrapper"
          style={{ 
            position: 'absolute', 
            inset: 0, 
            y: yBg, 
            opacity: opacityBg,
            pointerEvents: 'none'
          }}
        >
          <div className="glow-blob blob-1" />
          <div className="glow-blob blob-2" />
          <div className="glow-blob blob-3" />
          <div className="noise-overlay" />
        </motion.div>

        {/* Content Layer */}
        <motion.div
          className="hero-content"
          style={{ y: yContent, opacity: opacityContent, scale: scaleContent }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <motion.h1 variants={itemVariants} className="hero-title">
            Fullstack<br/>
            <span className="accent">Engineer</span><br/>
            
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={subheadingVariants} className="hero-sub" style={{ borderLeft: 'none', paddingLeft: 0, margin: '0 auto 56px', maxWidth: '720px' }}>
            Senior Full Stack & Blockchain Engineer with <strong>4+ years</strong> building and scaling production grade systems across <strong>distributed systems, blockchain, and AI infrastructure</strong>, focused on performance, reliability, and scale.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="hero-ctas" style={{ justifyContent: 'center' }}>
            <a href="#projects" className="btn-primary-am">
              VIEW PROJECTS
              <motion.span 
                animate={{ y: [0, 5, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
              >↓</motion.span>
            </a>
            <a href="#contact" className="btn-secondary-am">
              HIRE ME →
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px', opacity: 0.4 }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '4px', fontFamily: "'Space Mono', monospace", marginBottom: '16px' }}>SCROLL</span>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, #ffffff, transparent)' }} />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
