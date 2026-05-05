'use client'

import { useEffect, useRef } from 'react'

const testimonialsData = [
  {
    initials: 'JV', name: 'Jaun Vivas', role: 'CEO', company: 'Juan Vivas',
    text: 'Rauhan is a rare talent, a true fullstack engineer who can navigate the complexities of both blockchain and traditional web development with equal expertise. His ability to deliver high quality work across the entire stack makes him an invaluable asset to any team.',
  },
  {
    initials: 'AM', name: 'Abdul Moiz', role: 'CTO', company: 'Analog Mutations',
    text: 'Rare to find someone who can debug a Solidity reentrancy bug in the morning and optimize a React bundle in the afternoon. Rauhan does both without breaking a sweat.',
  },
  {
    initials: 'DZ', name: 'Deniz', role: 'Founder', company: 'MRHB Network',
    text: 'We hired Rauhan to audit and re-architect our payment rails. He found 3 critical bugs in week one that would have cost us $300K+ and delivered the new system on time.',
  },
]

const clients = ['MRHB Network', 'Analog Mutations', 'ChainPay', 'Pixpel', 'DAOforge', 'ZKVault', 'ProvenanceChain']

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll<HTMLDivElement>('[data-t]')
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => { (entry.target as HTMLElement).style.opacity='1'; (entry.target as HTMLElement).style.transform='translateY(0)' }, i*80)
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
        .test-section { background: #060d14; padding: 120px 60px; overflow: hidden; }
        .test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .clients-wrapper {
          overflow: hidden; display: flex; gap: 48px;
          background: rgba(255,255,255,0.03); 
          border-top: 1px solid rgba(255,255,255,0.08); 
          border-bottom: 1px solid rgba(255,255,255,0.08); 
          margin-top: 48px; padding: 36px 0;
          position: relative;
        }
        .clients-track {
          display: flex; gap: 48px; align-items: center;
          flex-shrink: 0; min-width: max-content;
          animation: scroll 30s linear infinite;
        }
        .clients-wrapper:hover .clients-track { animation-play-state: paused; }
        
        .clients-wrapper::before, .clients-wrapper::after {
          content: ""; position: absolute; top: 0; bottom: 0; width: 100px;
          z-index: 2; pointer-events: none;
        }
        .clients-wrapper::before {
          left: 0; background: linear-gradient(to right, #060d14, transparent);
        }
        .clients-wrapper::after {
          right: 0; background: linear-gradient(to left, #060d14, transparent);
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 48px)); }
        }
        @media (max-width: 900px) {
          .test-section { padding: 80px 32px; }
          .test-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .test-section { padding: 60px 20px; }
          .test-grid { grid-template-columns: 1fr; }
          .clients-wrapper { padding: 24px 0; gap: 32px; }
          .clients-track { gap: 32px; animation: scrollMobile 25s linear infinite; }
        }
        @keyframes scrollMobile {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 32px)); }
        }
      `}</style>

      <section id="testimonials" className="test-section">
        <div className="section-label">SOCIAL PROOF</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,3.2rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '48px', color: '#e8f4ff' }}>What People Say</h2>

        <div ref={containerRef} className="test-grid">
          {testimonialsData.map(t => (
            <div
              key={t.name}
              data-t
              className="reveal-base"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '32px', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: '16px', right: '20px', fontFamily: "'Syne',sans-serif", fontSize: '5rem', color: 'rgba(255,255,255,0.06)', lineHeight: 1 }}>"</div>
              <p style={{ fontSize: '0.9rem', color: 'rgba(232,244,255,0.5)', lineHeight: 1.8, marginBottom: '24px', position: 'relative', zIndex: 1 }}>{t.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #63c5ff, #00ffa3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Mono',monospace", fontSize: '0.75rem', color: '#020408', fontWeight: 700, flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#e8f4ff' }}>{t.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(232,244,255,0.25)' }}>{t.role} <span style={{ color: '#63c5ff' }}>@ {t.company}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="clients-wrapper">
          <div className="clients-track">
            {[...clients, ...clients].map((c, i) => (
              <span key={`1-${c}-${i}`} style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.75rem', color: 'rgba(232,244,255,0.25)', letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'color 0.2s', cursor: 'default', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.color='#e8f4ff')} onMouseLeave={e => (e.currentTarget.style.color='rgba(232,244,255,0.25)')}>{c}</span>
            ))}
          </div>
          <div className="clients-track" aria-hidden="true">
            {[...clients, ...clients].map((c, i) => (
              <span key={`2-${c}-${i}`} style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.75rem', color: 'rgba(232,244,255,0.25)', letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'color 0.2s', cursor: 'default', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.color='#e8f4ff')} onMouseLeave={e => (e.currentTarget.style.color='rgba(232,244,255,0.25)')}>{c}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
