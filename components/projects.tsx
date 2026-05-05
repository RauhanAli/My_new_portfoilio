'use client'

import { useEffect, useRef } from 'react'
import { PonderHeroViz } from './ui/hero-viz';

const projectsData = [
  {
    num: '01 — FEATURED',
    featured: true,
    type: 'WEB3 / AI AGGREGATOR',
    title: 'Ponder — Intelligent Web3 Opportunity Engine',
    desc: 'AI-powered intent-based aggregator that finds the best exchanges, bridges, restaking yields, lending rates, and more across EVM and non-EVM chains using machine learning.',
    problem: 'Liquidity is extremely fragmented across 20+ chains and hundreds of protocols. Users waste time and money comparing options manually.',
    result: 'Seamless comparison + execution • Powered by Llama3 + Mistral • Live on multiple chains • Beta app launched',
    stack: ['Next.js', 'TypeScript', 'AI/ML (Llama3/Mistral)', 'Account Abstraction', 'Intent Framework', 'Multi-chain', 'RUST', 'Solidity'],
    links: [
      { label: '↗ LIVE APP', href: 'https://ponder.one', target: '_blank', rel: 'noopener noreferrer' },
      { label: '▤ WHITEPAPER', href: 'https://docsend.com/view/c24hgpffu5pkp8m3', target: '_blank', rel: 'noopener noreferrer'  }
    ],
    hasViz: true,
    videoSrc: 'https://ponder.one/video/hero.mp4',
    showFullHero: true
  },
  {
  num: '02',
  type: 'FULL STACK / WEB3 / DEFI',
  title: 'EmplifAI',
  desc: 'DeFi liquidity management and yield optimization platform built for Shariah-compliant investing. Enables users to deploy crypto assets into automated strategies that generate returns through fee-based mechanisms and profit-sharing models.',
  problem: 'Lack of transparent, Shariah-aligned DeFi products with automated yield strategies and user-friendly access.',
  result: 'Built scalable backend services for strategy execution, vault management, and real-time portfolio tracking across multiple DeFi protocols.',
  stack: ['Node.js', 'PostgreSQL', 'Redis', 'Next.js', 'Web3.js', 'Smart Contracts', 'Docker'],
  links: [
    { label: '↗ LIVE APP', href: 'https://emplifai.mrhb.network/', target: '_blank', rel: 'noopener noreferrer' },
    { label: '⌥ DOCS', href: 'https://docs-emplifai.mrhb.network/', target: '_blank', rel: 'noopener noreferrer' }
  ],
},

{
  num: '03',
  type: 'WEB3 / STAKING INFRASTRUCTURE',
  title: 'Ethical Node — Staking & Validator Platform',
  desc: 'Web3 staking interface and validator aggregation platform focused on PoS networks with an emphasis on ethical and compliance-aware investing principles. Provides users with access to staking opportunities and educational insights around yield generation in decentralized networks.',
  problem: 'Fragmented staking ecosystem with limited transparency and lack of user-friendly access to validator performance and ethical investment considerations.',
  result: 'Built modular UI for staking discovery, validator comparison, and user onboarding flows for proof-of-stake participation across multiple networks.',
  stack: ['Next.js', 'TypeScript', 'Web3 Integration', 'REST APIs', 'UI/UX Systems'],
  links: [
    { label: '↗ LIVE SITE', href: 'https://ethicalnode.com/', target: '_blank', rel: 'noopener noreferrer' },
  ],
},
{
  num: '04',
  type: 'AI / WEB3 / SECURITY',
  title: 'AI Smart Contract Auditor — Automated Security Analysis Tool',
  desc: 'AI assisted auditing platform for Solidity smart contracts that combines LLMcbased analysis with static security checks to identify vulnerabilities, suggest gas optimizations, and improve overall code quality.',
  problem: 'Smart contract audits are expensive, time intensive, and require deep expertise, leaving many developers without accessible security tooling and increasing risk of critical vulnerabilities.',
  result: 'Developed an automated audit pipeline that generates structured security reports with severity classification, risk scoring, optimization insights, and human-readable explanations for faster contract review.',
  stack: ['Node.js', 'TypeScript', 'OpenAI API', 'Solidity', 'Slither', 'Next.js', 'PDF Generation'],
  links: [
    { label: '↗ DEMO', href: 'https://contract-audit-agent-five.vercel.app/', target: '_blank', rel: 'noopener noreferrer' },
    ],
},

  {
  num: '05',
  type: 'WEB3 / GAMEFI / INFRASTRUCTURE',
  title: 'Pixpel — Web3 Gaming & Digital Commerce Ecosystem',
  desc: 'Web3 gaming ecosystem and infrastructure platform enabling NFT based game economies, digital asset marketplaces, and merchant integrations through API-driven services. Supports game onboarding, asset trading, and payment/commerce layers within a unified ecosystem.',
  problem: 'Web3 gaming ecosystems were fragmented, lacking unified infrastructure for game distribution, NFT asset management, and real-world payment integration.',
  result: 'Built and integrated frontend modules for ecosystem services including marketplace flows, merchant dashboards, and external payment system integrations such as POS and wallet-based transactions.',
  stack: ['Next.js', 'TypeScript', 'Web3 Integration', 'API Architecture', 'Marketplace Systems', 'Wallet Integration', 'Smart Contracts', 'RUST', 'LLM'],
  links: [
    { label: '↗ LIVE APP', href: 'https://home.pixpel.io/', target: '_blank', rel: 'noopener noreferrer' },
    { label: '↗ DOCS', href: 'https://docs.pixpel.io/', target: '_blank', rel: 'noopener noreferrer' }
  ],
},
{
  num: '06',
  type: 'WEB3 / AI / DEPIN INFRASTRUCTURE',
  title: 'DecentrAI — Decentralized AI Compute Network',
  desc: 'Decentralized AI compute infrastructure protocol enabling distributed execution of machine learning workloads across a node-based network. Designed to allocate, process, and validate AI tasks in a trust-minimized environment using incentivized participation.',
  problem: 'Centralized AI infrastructure limits scalability, increases cost, and creates dependency on a small number of cloud providers for compute-heavy workloads.',
  result: 'Designed system architecture for distributed AI job execution, including task allocation flow, node participation model, and result validation logic for scalable compute orchestration.',
  stack: ['TypeScript', 'Node.js', 'Distributed Systems Design', 'Web3', 'API Layer', 'System Architecture', 'Machine Learning'],
  links: [
    { label: '↗ LIVE PLATFORM', href: 'https://fe.decentr.ai/', target: '_blank', rel: 'noopener noreferrer' },
    { label: '⌥ DOCS', href: 'https://white-paper.decentr.ai/', target: '_blank', rel: 'noopener noreferrer' }
  ],
},
  {
  num: '07',
  type: 'WEB3 / PAYMENTS / FINTECH',
  title: 'MawaridCard POS — Web3 Payment Acceptance System',
  desc: 'Blockchain enabled POS payment system integrated with Mawarid’s digital payment infrastructure, allowing merchants to accept card and digital wallet payments with settlement layer abstraction for traditional and Web3 rails.',
  problem: 'Merchants lacked a unified payment system bridging traditional card payments and emerging digital/Web3 payment rails with fast, secure settlement.',
  result: 'Delivered integration layer for POS terminals supporting seamless checkout, encrypted transaction flow, and compatibility with card networks and digital wallets.',
  stack: ['Next.js', 'TypeScript', 'Payment APIs', 'POS Integration', 'REST APIs', 'Secure Transaction Layer'],
  links: [
    { label: '↗ DEMO', href: 'https://mawaridcard.pixpel.io/', target: '_blank', rel: 'noopener noreferrer' },
  ],
}
]



function CardBody({ project }: { project: typeof projectsData[0] }) {
  return (
    <>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.62rem', color: 'rgba(232,244,255,0.25)', letterSpacing: '2px', marginBottom: '10px' }}>{project.num}</div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.62rem', color: '#00ffa3', letterSpacing: '2px', marginBottom: '14px', border: '1px solid rgba(0,255,163,0.2)', display: 'inline-block', padding: '3px 10px' }}>{project.type}</div>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 700, marginBottom: '10px', lineHeight: 1.25, color: '#e8f4ff' }}>{project.title}</h3>
      <p style={{ color: 'rgba(232,244,255,0.5)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '14px' }}>{project.desc}</p>
      {project.problem && <p style={{ fontSize: '0.82rem', color: 'rgba(232,244,255,0.25)', marginBottom: '12px' }}><strong style={{ color: '#ffb347', fontWeight: 400 }}>PROBLEM: </strong>{project.problem}</p>}
      {project.result && <div style={{ background: 'rgba(0,255,163,0.1)', border: '1px solid rgba(0,255,163,0.15)', padding: '10px 14px', marginBottom: '16px', fontSize: '0.82rem', color: '#00ffa3', fontFamily: "'Space Mono',monospace" }}>{project.result}</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
        {project.stack.map(s => <span key={s} style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.62rem', padding: '3px 8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(232,244,255,0.5)' }}>{s}</span>)}
      </div>
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        {project.links.map(l => (
          <a key={l.label} href={l.href} target={l.target} rel={l.rel} style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.68rem', color: '#63c5ff', textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00ffa3')} onMouseLeave={e => (e.currentTarget.style.color = '#63c5ff')}>{l.label}</a>
        ))}
      </div>
    </>
  )
}

function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { setTimeout(() => { el.style.opacity='1'; el.style.transform='translateY(0)' }, index*80); obs.unobserve(el) } })
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  const base: React.CSSProperties = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }

  if (project.featured) return (
    <div ref={ref} className="featured-card reveal-base" style={{ ...base, gridColumn: 'span 2' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(99,197,255,0.3)')} onMouseLeave={e => (e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
      <div className="featured-inner">
        <div style={{ padding: '48px' }}><CardBody project={project} /></div>
        <div style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '1px solid rgba(255,255,255,0.06)', minHeight: '260px' }}><PonderHeroViz videoSrc={project.videoSrc} /></div>
      </div>
    </div>
  )

  return (
    <div ref={ref} className="reveal-base" style={{ ...base, padding: '36px', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(99,197,255,0.3)')} onMouseLeave={e => (e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
      <CardBody project={project} />
    </div>
  )
}

export function Projects() {
  return (
    <>
      <style>{`
        .projects-section { background: #020408; padding: 120px 60px; }
        .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
        .featured-inner { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 1024px) {
          .projects-section { padding: 80px 32px; }
        }
        @media (max-width: 860px) {
          .projects-grid { grid-template-columns: 1fr; }
          .featured-card { grid-column: span 1 !important; }
          .featured-inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .projects-section { padding: 60px 20px; }
          .featured-inner > div:first-child { padding: 28px !important; }
        }
      `}</style>

      <section id="projects" className="projects-section">
        <div className="section-label">WORK</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,3.2rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', color: '#e8f4ff' }}>Projects That Shipped</h2>
        <p style={{ color: 'rgba(232,244,255,0.5)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '48px', fontSize: '0.92rem' }}>
          Not side projects. Production systems handling real money, real users, real consequences. Each one taught me something new about building at scale.
        </p>
        <div className="projects-grid">
          {projectsData.map((p, i) => <ProjectCard key={p.num} project={p} index={i} />)}
        </div>
      </section>
    </>
  )
}
