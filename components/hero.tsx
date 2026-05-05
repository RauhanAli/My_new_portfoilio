'use client'

import { useEffect, useRef, useState } from 'react'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Small delay to ensure fonts + layout are ready
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  // ─── Three.js blockchain network ───────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return

    const initThree = () => {
      const THREE = (window as any).THREE
      if (!THREE) { setTimeout(initThree, 200); return }

      const canvas = canvasRef.current!
      const W = window.innerWidth, H = window.innerHeight
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W, H)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
      camera.position.set(0, 0, 28)

      const nodeCount = 60
      const COLOR_A = 0x63c5ff, COLOR_B = 0x00ffa3, COLOR_DIM = 0x1a3a52
      const STATES = { A: 0, B: 1 }

      const nodeMeshes: any[] = []
      const nodePositions: any[] = []
      const geo = new THREE.SphereGeometry(0.18, 8, 8)

      for (let i = 0; i < nodeCount; i++) {
        const θ = Math.random() * Math.PI * 2
        const φ = Math.acos(2 * Math.random() - 1)
        const r = 8 + Math.random() * 10
        const x = r * Math.sin(φ) * Math.cos(θ)
        const y = r * Math.sin(φ) * Math.sin(θ) * 0.5
        const z = r * Math.cos(φ) * 0.4
        nodePositions.push(new THREE.Vector3(x, y, z))
        const mat = new THREE.MeshBasicMaterial({ color: COLOR_DIM })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(x, y, z)
        mesh.userData = { baseX: x, baseY: y, speed: 0.3 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2, state: Math.random() > 0.5 ? STATES.A : STATES.B }
        scene.add(mesh)
        nodeMeshes.push(mesh)
      }

      const updateColor = (m: any) => m.material.color.set(m.userData.state === STATES.A ? COLOR_A : COLOR_B)
      nodeMeshes.forEach(updateColor)

      const edges: any[] = []
      const graph = new Map<number, number[]>()
      for (let i = 0; i < nodeCount; i++) graph.set(i, [])

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodePositions[i].distanceTo(nodePositions[j])
          if (dist < 5.5 && Math.random() > 0.45) {
            const lg = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]])
            const line = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: COLOR_A, transparent: true, opacity: 0.15 }))
            scene.add(line)
            edges.push({ line, i, j })
            graph.get(i)!.push(j); graph.get(j)!.push(i)
          }
        }
      }

      let propagations: any[] = []
      const flowParticles: any[] = []
      const spawnFlow = (i: number, j: number) => flowParticles.push({ i, j, t: 0, mesh: null })
      const startProp = (start: number, state: number) =>
        propagations.push({ frontier: [start], visited: new Set([start]), state })

      let tX = 0, tY = 0, cX = 0, cY = 0, scrollY = 0
      const mm = (e: MouseEvent) => { tX = (e.clientX / window.innerWidth - 0.5) * 6; tY = -(e.clientY / window.innerHeight - 0.5) * 4 }
      const ms = () => { scrollY = window.scrollY }
      document.addEventListener('mousemove', mm)
      window.addEventListener('scroll', ms)

      let t = 0, animId = 0
      const animate = () => {
        animId = requestAnimationFrame(animate)
        t += 0.008
        cX += (tX - cX) * 0.04; cY += (tY - cY) * 0.04
        scene.rotation.y = cX * 0.06; scene.rotation.x = cY * 0.04
        camera.position.y = -scrollY * 0.012
        camera.position.z = 28 - scrollY * 0.018

        nodeMeshes.forEach(m => {
          m.position.x = m.userData.baseX + Math.sin(t * m.userData.speed + m.userData.phase) * 0.25
          m.position.y = m.userData.baseY + Math.cos(t * m.userData.speed * 0.7 + m.userData.phase) * 0.18
        })
        edges.forEach(({ line, i, j }) => line.geometry.setFromPoints([nodeMeshes[i].position, nodeMeshes[j].position]))

        if (Math.random() < 0.01) startProp(Math.floor(Math.random() * nodeCount), Math.random() > 0.5 ? STATES.A : STATES.B)

        propagations = propagations.filter(p => {
          const next: number[] = []
          p.frontier.forEach((ni: number) => {
            const m = nodeMeshes[ni]
            if (m.userData.state !== p.state) { m.userData.state = p.state; updateColor(m); m.scale.set(1.5, 1.5, 1.5) }
            graph.get(ni)!.forEach(nb => { if (!p.visited.has(nb)) { p.visited.add(nb); next.push(nb); spawnFlow(ni, nb) } })
          })
          p.frontier = next; return next.length > 0
        })

        for (let fi = flowParticles.length - 1; fi >= 0; fi--) {
          const f = flowParticles[fi]; f.t += 0.03
          if (!f.mesh) { f.mesh = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), new THREE.MeshBasicMaterial({ color: 0xffffff })); scene.add(f.mesh) }
          f.mesh.position.lerpVectors(nodeMeshes[f.i].position, nodeMeshes[f.j].position, f.t)
          if (f.t >= 1) { scene.remove(f.mesh); flowParticles.splice(fi, 1) }
        }

        nodeMeshes.forEach(m => m.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1))
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        const w = window.innerWidth, h = window.innerHeight
        camera.aspect = w / h; camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize);
      (canvas as any)._cleanup = () => {
        cancelAnimationFrame(animId)
        document.removeEventListener('mousemove', mm)
        window.removeEventListener('scroll', ms)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
      }
    }
    initThree()
    return () => { const c = canvasRef.current as any; if (c?._cleanup) c._cleanup() }
  }, [])

  // ─── Counter animation ──────────────────────────────────────────────────────
  const statsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.querySelectorAll<HTMLElement>('[data-count]').forEach(span => {
          const target = parseInt(span.dataset.count!)
          const suffix = span.dataset.suffix ?? '+'
          let cur = 0, inc = target / 50
          const timer = setInterval(() => {
            cur += inc
            if (cur >= target) { cur = target; clearInterval(timer) }
            span.textContent = Math.floor(cur) + suffix
          }, 28)
        })
        obs.disconnect()
      })
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Responsive hero CSS */}
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          padding: 100px 60px 60px;
        }
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 820px;
        }
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4.5vw, 4.2rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1px;
          margin-bottom: 24px;
          color: #e8f4ff;
          word-break: normal;
          overflow-wrap: break-word;
          hyphens: none;
        }
        .hero-title .accent { color: #63c5ff; }
        .hero-sub {
          font-size: 1rem;
          color: rgba(232,244,255,0.5);
          max-width: 520px;
          margin-bottom: 36px;
          line-height: 1.75;
        }
        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 36px 52px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .stat-num {
          font-family: 'Space Mono', monospace;
          font-size: 1.7rem;
          color: #63c5ff;
          font-weight: 700;
          display: block;
        }
        .stat-label {
          font-size: 0.72rem;
          color: rgba(232,244,255,0.25);
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .hero-scroll {
          position: absolute;
          bottom: 36px;
          right: 60px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: rgba(232,244,255,0.2);
          letter-spacing: 2px;
        }
        .badge-dot {
          width: 6px; height: 6px;
          background: #00ffa3;
          border-radius: 50%;
          display: inline-block;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(0,255,163,0.4)}
          50%{opacity:.6;box-shadow:0 0 0 6px rgba(0,255,163,0)}
        }
        .scroll-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, transparent, #63c5ff);
          animation: scrollLine 2s infinite;
        }
        @keyframes scrollLine {
          0%{transform:scaleY(0);transform-origin:top}
          50%{transform:scaleY(1);transform-origin:top}
          51%{transform:scaleY(1);transform-origin:bottom}
          100%{transform:scaleY(0);transform-origin:bottom}
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-section { padding: 100px 40px 60px; }
          .hero-scroll { right: 40px; }
        }
        @media (max-width: 768px) {
          .hero-section { padding: 100px 24px 60px; }
          .hero-title { font-size: clamp(2rem, 8vw, 3.2rem); letter-spacing: -0.5px; }
          .hero-ctas { gap: 10px; }
          .hero-stats { gap: 24px 40px; padding-top: 24px; }
          .stat-num { font-size: 1.4rem; }
          .hero-scroll { display: none; }
          .btn-primary-am, .btn-secondary-am { font-size: 0.72rem !important; padding: 12px 22px !important; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 90px 20px 50px; }
          .hero-title { font-size: clamp(1.8rem, 9vw, 2.6rem); }
          .hero-sub { font-size: 0.9rem; }
          .hero-ctas { flex-direction: column; align-items: flex-start; }
          .hero-stats { gap: 20px 32px; }
          .stat-num { font-size: 1.25rem; }
        }
      `}</style>

      <section className="hero-section">
        {/* Three.js canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
        />

        <div
          className="hero-content"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Space Mono', monospace", fontSize: '0.68rem',
              color: '#00ffa3', letterSpacing: '2px',
              border: '1px solid rgba(0,255,163,0.2)', padding: '6px 14px',
              marginBottom: '28px', background: 'rgba(0,255,163,0.05)',
            }}
          >
            <span className="badge-dot" />
            AVAILABLE FOR HIRE
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Fullstack Engineer building<span className="accent"> Scalable Systems</span>
            {' '}across Backend, Blockchain, and AI
          </h1>

          {/* Subtitle */}
          <p className="hero-sub">
            Senior Full Stack & Blockchain Engineer with{' '}
            <strong style={{ color: '#e8f4ff', fontWeight: 500 }}>4+ years</strong>{' '}
          building and scaling production grade systems across backend engineering, distributed systems, 
          blockchain, and AI infrastructure, with a focus on performance, reliability, and scale.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <a
              href="#projects"
              className="btn-primary-am"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', letterSpacing: '1px', padding: '13px 28px', background: '#63c5ff', color: '#020408', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, transition: 'all 0.2s', cursor: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 0 60px rgba(99,197,255,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#63c5ff'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
            >
              VIEW PROJECTS ↓
            </a>
            <a
              href="#contact"
              className="btn-secondary-am"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', letterSpacing: '1px', padding: '13px 28px', background: 'transparent', color: '#63c5ff', border: '1px solid rgba(99,197,255,0.25)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', cursor: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,197,255,0.15)'; e.currentTarget.style.borderColor = '#63c5ff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(99,197,255,0.25)'; e.currentTarget.style.transform = 'none' }}
            >
              HIRE ME →
            </a>
          </div>

          {/* Stats — inline, below CTAs */}
          <div ref={statsRef} className="hero-stats">
            {[
              { count: '4', suffix: '+', label: 'Years Exp' },
              { count: '40', suffix: '+', label: 'Projects' },
              { count: '3', suffix: '+', label: 'DeFi Protocols' },
              { count: '50', suffix: 'M+', label: 'TVL Secured' },
            ].map(stat => (
              <div key={stat.label}>
                <span className="stat-num" data-count={stat.count} data-suffix={stat.suffix}>0{stat.suffix}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll">
          <div className="scroll-line" />
          SCROLL
        </div>
      </section>
    </>
  )
}
