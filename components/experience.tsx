'use client'

import { useEffect, useRef } from 'react'

const experienceData = [
  {
    period: '2024 — PRESENT',
    role: 'Senior Fullstack Engineer',
    company: 'Pixpel.io',
    location: 'Dubai / Web3 & FinTech Systems',
    achievements: [
      <>Designed and developed full-stack decentralized applications using <strong style={{ color: '#e8f4ff', fontWeight: 500 }}>Next.js, Node.js, and TypeScript</strong>, covering frontend interfaces, backend APIs, and off-chain services.</>,

      <>Built scalable backend systems including REST APIs, event-driven workflows, and microservices architecture to support production-grade Web3 applications.</>,

      <>Developed off-chain indexing and aggregation layers to optimize data access and reduce on-chain computation load across multi-chain workflows.</>,

      <>Designed and implemented internal admin and operations dashboards with <strong style={{ color: '#e8f4ff', fontWeight: 500 }}>RBAC, MFA (JWT-based auth), and audit logging</strong> for secure system monitoring and operational control.</>,

      <>Contributed to system architecture decisions across frontend, backend, and blockchain integrations, focusing on scalability, reliability, and maintainability.</>,
    ],
  },

  {
    period: '2023 — 2024',
    role: 'Fullstack Blockchain Engineer',
    company: 'Analog Mutations',
    location: 'Karachi / Systems & Web3 Infrastructure',
    achievements: [
      <>Built backend systems and smart contract integrations for multi-protocol DeFi applications using <strong style={{ color: '#e8f4ff', fontWeight: 500 }}>Solidity, Rust, and Node.js</strong>.</>,

      <>Designed scalable database architectures for real-time and historical blockchain data processing and analytics.</>,

      <>Developed event-driven backend pipelines for data ingestion, batching, and cross-system synchronization.</>,

      <>Worked on AI-adjacent systems including experimental AI-assisted smart contract analysis and intent-based execution flows (Haiku-related architecture work).</>,

      <>Contributed to distributed system design across backend services and on-chain/off-chain coordination layers.</>,
    ],
  },

  {
    period: '2022 — 2023',
    role: 'Fullstack Developer',
    company: 'BrandH2O',
    location: 'Karachi / Web Applications & Web3',
    achievements: [
      <>Built full-stack NFT marketplace using <strong style={{ color: '#e8f4ff', fontWeight: 500 }}>React, Node.js, Solidity, and Ethers.js</strong>.</>,

      'Implemented wallet authentication and smart contract interaction layer for NFT minting and trading workflows.',

      'Developed backend APIs and state management systems for marketplace operations and transactional flows.',
    ],
  },

  {
    period: '2022',
    role: 'Blockchain Engineer',
    company: 'Visech Technologies',
    location: 'Karachi / Web3 Applications',
    achievements: [
      'Developed NFT marketplace supporting minting, listing, and resale with on-chain ownership verification.',

      'Built backend infrastructure for NFT launchpad systems including project onboarding and token deployment workflows.',

      'Designed transactional backend systems connecting blockchain events with off-chain application state.',
    ],
  },
]

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const items = containerRef.current.querySelectorAll<HTMLDivElement>('[data-tl]')
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => { (entry.target as HTMLElement).style.opacity='1'; (entry.target as HTMLElement).style.transform='translateY(0)' }, i*100)
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.05 })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .exp-section { background: #020408; padding: 120px 60px; }
        .exp-timeline { position: relative; padding-left: 36px; }
        .exp-timeline::before { content: ''; position: absolute; left: 0; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(to bottom, #63c5ff, #00ffa3, transparent); }
        @media (max-width: 1024px) { .exp-section { padding: 80px 32px; } }
        @media (max-width: 600px) {
          .exp-section { padding: 60px 20px; }
          .exp-timeline { padding-left: 24px; }
        }
      `}</style>

      <section id="experience" className="exp-section">
        <div className="section-label">EXPERIENCE</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,3.2rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', color: '#e8f4ff' }}>4+ Years. Real Stakes.</h2>
        <p style={{ color: 'rgba(232,244,255,0.5)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '48px', fontSize: '0.92rem' }}>
          Every role was chosen to learn something new. Every project moved the needle.
        </p>

        <div ref={containerRef} className="exp-timeline">
          {experienceData.map(exp => (
            <div
              key={exp.period}
              data-tl
              className="reveal-base"
              style={{ position: 'relative', marginBottom: '52px' }}
            >
              <div style={{ position: 'absolute', left: '-40px', top: '8px', width: '9px', height: '9px', background: '#63c5ff', borderRadius: '50%', boxShadow: '0 0 14px #63c5ff' }} />
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.68rem', color: '#63c5ff', letterSpacing: '2px', marginBottom: '6px' }}>{exp.period}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.1rem,2.2vw,1.4rem)', fontWeight: 700, marginBottom: '4px', color: '#e8f4ff' }}>{exp.role}</div>
              <div style={{ fontSize: '0.88rem', color: 'rgba(232,244,255,0.5)', marginBottom: '14px' }}>
                {exp.company} <span style={{ color: '#00ffa3' }}>· {exp.location}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {exp.achievements.map((item, i) => (
                  <li key={i} style={{ fontSize: '0.88rem', color: 'rgba(232,244,255,0.5)', display: 'flex', gap: '10px', lineHeight: 1.65 }}>
                    <span style={{ color: '#63c5ff', flexShrink: 0, marginTop: '2px', fontSize: '0.78rem' }}>▸</span>
                    <span>{item}</span>
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
