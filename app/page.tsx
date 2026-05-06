'use client'

import { useEffect, useRef } from 'react'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
// import { Experience } from '@/components/experience'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Preloader } from '@/components/preloader'

function CursorAndNoise() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    let rafId = 0
    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(animRing)
    }
    animRing()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9990,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />
      <div
        ref={cursorRef}
        style={{
          width: '12px', height: '12px',
          background: '#63c5ff', borderRadius: '50%',
          position: 'fixed', pointerEvents: 'none', zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px #63c5ff',
          mixBlendMode: 'screen',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          width: '36px', height: '36px',
          border: '1px solid rgba(99,197,255,0.4)', borderRadius: '50%',
          position: 'fixed', pointerEvents: 'none', zIndex: 9998,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#020408' }}>
      <Preloader />
      <CursorAndNoise />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      {/* <Experience /> */}
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
