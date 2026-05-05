'use client'

import { useEffect, useRef } from 'react'

export function About() {
  const cardRef = useRef<HTMLDivElement>(null)

  const techs = [
    { name: 'Node.js / TypeScript', pct: 0.98, label: '98%' },
    { name: 'System Design', pct: 0.96, label: '96%'},
    { name: 'React / Next.js', pct: 0.90, label: '90%' },
    { name: 'PostgreSQL / Redis', pct: 0.92, label: '92%' },
    { name: 'Solidity / EVM', pct: 0.95, label: '95%' },
    { name: 'Rust / Systems', pct: 0.89, label: '89%' },
    { name: 'AWS / Kubernetes', pct: 0.88, label: '88%' },
    { name: 'AI & Machine Learning', pct: 0.85, label: '85%'},
    { name: 'Zero-Knowledge / ZK', pct: 0.80, label: '80%' },
    { name: 'Java', pct: 0.80, label: '80%'},
    { name: 'Python', pct: 0.78, label: '78%'},
    
  ]

  useEffect(() => {
    if (!cardRef.current) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLDivElement>('[data-pct]').forEach(bar => {
            bar.style.transform = `scaleX(${bar.dataset.pct})`
          })
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })
    obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [])

  const tags = [
    'Systems Architecture', 'Backend Engineering', 'Fintech Systems', 'LangChain','DeFi Protocols', 'Smart Contracts', 'Distributed Systems',
    'Zero-Knowledge Proofs', 'API Design', 'DevOps', 'AI & Machine Learning', 'Web3 Infrastructure', 'Large Language Models (LLMs)'
  ]

  return (
    <>
      <style>{`
        .about-section {
          background: #060d14;
          padding: 120px 60px;
          position: relative;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
          margin-top: 32px;
        }
        @media (max-width: 900px) {
          .about-section { padding: 80px 32px; }
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 480px) {
          .about-section { padding: 60px 20px; }
          .about-grid { gap: 36px; }
        }
      `}</style>

      <section id="about" className="about-section">
        <div className="section-label">WHO I AM</div>

        <div className="about-grid">
          {/* Left: Text */}
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', color: '#e8f4ff' }}>
              Engineering Scalable Systems Across Backend, AI, FinTech & Blockchain
            </h2>

            {[
            <>
  I don&apos;t just write code — I architect systems that move capital, secure assets, and handle millions of transactions without breaking a sweat. My work sits at the intersection of <strong style={{ color: '#e8f4ff' }}>deep computer science</strong> and <strong style={{ color: '#e8f4ff' }}>real world financial infrastructure</strong>.
</>,

<>
  I started as a backend engineer at a Series B fintech, working on production systems where reliability actually mattered. In 2019, I pivoted into blockchain when it became clear decentralized infrastructure wasn&apos;t a trend, it was a new execution layer for the internet.
</>,

<>
  Since then, I&apos;ve been building production financial systems across DeFi protocols, including smart contracts securing <strong style={{ color: '#e8f4ff' }}>$50M+ in TVL</strong>, built Layer 2 bridges, and shipped full-stack dApps used by tens of thousands of users. I&apos;ve also worked on event driven backend systems, high throughput APIs, and distributed architectures using Node.js, TypeScript, and PostgreSQL.
</>,

<>
  More recently, I&apos;ve been building AI powered backend systems, integrating LLM APIs, automation pipelines, and intelligent services that enhance developer workflows and product capabilities.
</>,

<>
  My superpower is <strong style={{ color: '#e8f4ff' }}>seeing the whole system</strong>: from smart contract design and gas optimization to backend architecture, frontend UX, and infrastructure orchestration. I optimize for correctness first, performance second, and developer experience always.
</>
            ].map((p, i) => (
              <p key={i} style={{ color: 'rgba(232,244,255,0.5)', lineHeight: 1.8, marginBottom: '16px', fontSize: '0.92rem' }}>
                {p}
              </p>
            ))}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '28px' }}>
              {tags.map(tag => (
                <span
                  key={tag}
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', padding: '5px 12px', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(232,244,255,0.5)', letterSpacing: '1px', transition: 'all 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#63c5ff'; e.currentTarget.style.color = '#63c5ff'; e.currentTarget.style.background = 'rgba(99,197,255,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(232,244,255,0.5)'; e.currentTarget.style.background = 'transparent' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Proficiency card */}
          <div ref={cardRef} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '28px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #63c5ff, transparent)' }} />
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: '#63c5ff', letterSpacing: '2px', marginBottom: '20px' }}>
              // PROFICIENCY MATRIX
            </div>
            {techs.map((tech, idx) => (
              <div
                key={tech.name}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: idx < techs.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              >
                <span style={{ fontSize: '0.85rem', color: '#e8f4ff', flex: 1 }}>{tech.name}</span>
                <div style={{ width: '100px', height: '3px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden', flexShrink: 0, margin: '0 12px' }}>
                  <div data-pct={tech.pct} style={{ height: '100%', background: 'linear-gradient(90deg, #63c5ff, #00ffa3)', transformOrigin: 'left', transform: 'scaleX(0)', transition: 'transform 1s ease' }} />
                </div>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: '#63c5ff', width: '32px', textAlign: 'right', flexShrink: 0 }}>{tech.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
