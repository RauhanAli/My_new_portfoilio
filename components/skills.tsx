'use client'

import { useEffect, useRef } from 'react'

const skillsData = [
  {
    icon: '⛓',
    title: 'Blockchain',
    items: ['Solidity / Vyper', 'Rust', 'EVM Architecture', 'DeFi Protocol Design', 'zk-SNARKs', 'Hardhat / Foundry', 'OpenZeppelin', 'Chainlink Oracles', 'The Graph', 'Layer 2 / Rollups', 'Wagmi / ethers.js'],
  },
  {
    icon: '⚙',
    title: 'Backend',
    items: ['Node.js / TypeScript', 'Rust', 'GraphQL / REST / gRPC', 'PostgreSQL / MySQL', 'Redis', 'Kafka', 'Microservices', 'Event-Driven Design', 'Python / FastAPI'],
  },
  {
    icon: '◈',
    title: 'Frontend',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Web3 / Wagmi', 'Framer Motion', 'Performance Optimization', 'Figma to Code', 'PWA / Mobile-first'],
  },
  {
    icon: '☁',
    title: 'DevOps',
    items: ['AWS / GCP', 'Kubernetes', 'Docker', 'GitHub Actions / CI/CD', 'Prometheus / Grafana', 'IPFS', 'Nginx / Cloudflare', 'Observability & Monitoring'],
  },
  {
  icon: '🧠',
  title: 'AI / Applied Intelligence',
  items: [
    'OpenAI API Integration',
    'LLM-based System Design',
    'AI powered Code Analysis',
    'Smart Contract Vulnerability Detection',
    'Intent based Execution Systems',
    'Pattern Recognition (Rule based + LLM hybrid)',
  ],
}
]

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll<HTMLDivElement>('[data-skill-card]')
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)'
          }, i * 80)
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.05 })
    cards.forEach(c => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .skills-section { background: #060d14; padding: 120px 60px; position: relative; }
        .skills-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; }
        @media (max-width: 1024px) {
          .skills-section { padding: 80px 32px; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .skills-section { padding: 60px 20px; }
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="skills" className="skills-section">
        <div className="section-label">SKILLS</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', color: '#e8f4ff' }}>
          The Full Stack
        </h2>
        <p style={{ color: 'rgba(232,244,255,0.5)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '48px', fontSize: '0.92rem' }}>
          Breadth to architect, depth to implement. I own every layer from smart contract to CDN.
        </p>

        <div ref={containerRef} className="skills-grid">
          {skillsData.map(cat => (
            <div
              key={cat.title}
              data-skill-card
              className="reveal-base"
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                padding: '28px', position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(99,197,255,0.25)'
                const line = e.currentTarget.querySelector<HTMLDivElement>('[data-bl]')
                if (line) line.style.transform = 'scaleX(1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                const line = e.currentTarget.querySelector<HTMLDivElement>('[data-bl]')
                if (line) line.style.transform = 'scaleX(0)'
              }}
            >
              <div data-bl style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #63c5ff, #00ffa3)', transform: 'scaleX(0)', transition: 'transform 0.3s', transformOrigin: 'left' }} />
              <div style={{ fontSize: '1.4rem', marginBottom: '14px' }}>{cat.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.05rem', fontWeight: 700, marginBottom: '18px', color: '#e8f4ff' }}>{cat.title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {cat.items.map(item => (
                  <li key={item} style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: 'rgba(232,244,255,0.5)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#63c5ff', fontSize: '0.65rem' }}>→</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
