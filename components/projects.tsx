'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { RealisticMacBook } from './ui/laptop'
const projectsData = [
  {
    num: '01',
    featured: true,
    type: 'WEB3 / AI AGGREGATOR',
    title: 'Ponder — Intelligent Web3 Opportunity Engine',
    desc: 'AI-powered intent-based aggregator that finds the best exchanges, bridges, restaking yields, lending rates, and more across EVM and non-EVM chains using machine learning.',
    problem: 'Liquidity is extremely fragmented across 20+ chains and hundreds of protocols. Users waste time and money comparing options manually.',
    result: 'Seamless comparison + execution • Powered by Llama3 + Mistral • Live on multiple chains • Beta app launched',
    stack: ['Next.js', 'TypeScript', 'AI/ML', 'Account Abstraction', 'Intent Framework', 'RUST', 'Solidity'],
    links: [
      { label: '↗ LIVE APP', href: 'https://ponder.one', target: '_blank', rel: 'noopener noreferrer' },
      { label: '▤ WHITEPAPER', href: 'https://docsend.com/view/c24hgpffu5pkp8m3', target: '_blank', rel: 'noopener noreferrer' }
    ],
    videoSrc: '/video/ponder.mp4',
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
    videoSrc: '/video/emplifai_1.mp4',
  },
  {
    num: '03',
    type: 'WEB3 / STAKING INFRASTRUCTURE',
    title: 'Ethical Node — Staking & Validator Platform',
    desc: 'Web3 staking interface and validator aggregation platform focused on PoS networks with an emphasis on ethical and compliance-aware investing principles.',
    problem: 'Fragmented staking ecosystem with limited transparency and lack of user-friendly access to validator performance.',
    result: 'Built modular UI for staking discovery, validator comparison, and user onboarding flows.',
    stack: ['Next.js', 'TypeScript', 'Web3 Integration', 'REST APIs', 'UI/UX Systems'],
    links: [
      { label: '↗ LIVE SITE', href: 'https://ethicalnode.com/', target: '_blank', rel: 'noopener noreferrer' },
    ],
    videoSrc: '/video/ethicalnode_1.mp4',
  },
  {
    num: '04',
    type: 'AI / WEB3 / SECURITY',
    title: 'AI Smart Contract Auditor',
    desc: 'AI assisted auditing platform for Solidity smart contracts that combines LLM-based analysis with static security checks.',
    problem: 'Smart contract audits are expensive and time intensive for most developers.',
    result: 'Developed an automated audit pipeline with structured security reports and optimization insights.',
    stack: ['Node.js', 'TypeScript', 'OpenAI API', 'Solidity', 'Slither', 'Next.js'],
    links: [
      { label: '↗ DEMO', href: 'https://contract-audit-agent-five.vercel.app/', target: '_blank', rel: 'noopener noreferrer' },
    ],
    videoSrc: 'video/smartAudit.mp4',
  },
  {
    num: '05',
    type: 'WEB3 / GAMEFI / INFRASTRUCTURE',
    title: 'Pixpel — Web3 Gaming & Digital Commerce Ecosystem',
    desc: 'Web3 gaming ecosystem and infrastructure platform enabling NFT based game economies and digital asset marketplaces.',
    problem: 'Fragmented infrastructure for Web3 game distribution and NFT asset management.',
    result: 'Built frontend modules for marketplace flows, merchant dashboards, and payment systems.',
    stack: ['Next.js', 'TypeScript', 'Web3 Integration', 'Smart Contracts', 'RUST'],
    links: [
      { label: '↗ LIVE APP', href: 'https://home.pixpel.io/', target: '_blank', rel: 'noopener noreferrer' },
      { label: '↗ DOCS', href: 'https://docs.pixpel.io/', target: '_blank', rel: 'noopener noreferrer' }
    ],
    videoSrc: '/video/pixpel.mp4',
  },
  {
    num: '06',
    type: 'WEB3 / AI / DEPIN INFRASTRUCTURE',
    title: 'DecentrAI — Decentralized AI Compute Network',
    desc: 'Decentralized AI compute infrastructure protocol enabling distributed execution of machine learning workloads.',
    problem: 'Centralized AI infrastructure limits scalability and creates dependency on few providers.',
    result: 'Designed system architecture for distributed AI job execution and node participation.',
    stack: ['TypeScript', 'Node.js', 'Distributed Systems', 'Web3', 'Machine Learning'],
    links: [
      { label: '↗ LIVE PLATFORM', href: 'https://fe.decentr.ai/', target: '_blank', rel: 'noopener noreferrer' },
      { label: '⌥ DOCS', href: 'https://white-paper.decentr.ai/', target: '_blank', rel: 'noopener noreferrer' }
    ],
    videoSrc: '/video/decentrai_1.mp4',
  },
  {
    num: '07',
    type: 'WEB3 / PAYMENTS / FINTECH',
    title: 'MawaridCard POS — Web3 Payment Acceptance',
    desc: 'Blockchain enabled POS payment system integrated with traditional and Web3 payment rails.',
    problem: 'Merchants lacked unified payment systems bridging traditional and Web3 rails.',
    result: 'Delivered integration layer for POS terminals with secure transaction flow.',
    stack: ['Next.js', 'TypeScript', 'Payment APIs', 'POS Integration'],
    links: [
      { label: '↗ DEMO', href: 'https://mawaridcard.pixpel.io/', target: '_blank', rel: 'noopener noreferrer' },
    ],
    videoSrc: '/video/mawarid.mp4',
  }
]

function ProjectVideo({ videoSrc }: { videoSrc?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoSrc) return

    video.load()
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch((e) => console.warn('Autoplay prevented:', e))
    }

    return () => video.pause()
  }, [videoSrc])

  if (!videoSrc) {
    return <div className="media-placeholder">Video Coming Soon</div>
  }

  return (
<RealisticMacBook videoSrc={videoSrc} />
  )
}

function ProjectScene({ project }: { project: typeof projectsData[0] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const yContent = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"])
  const yMedia = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.94])

  return (
    <motion.div
      ref={containerRef}
      className={`project-scene ${project.featured ? 'featured-scene' : ''}`}
      style={{ opacity, scale }}
    >
      <div className="scene-inner">
        {/* Left Content */}
        <motion.div className="scene-content" style={{ y: yContent }}>
          <div className="project-meta">
            <span className="project-num">{project.num}</span>
            <span className="project-type">{project.type}</span>
          </div>

          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.desc}</p>

          {project.problem && (
            <div className="project-problem">
              <strong>THE PROBLEM:</strong> {project.problem}
            </div>
          )}

          {project.result && (
            <div className="project-result">
              <div className="glow-line" />
              {project.result}
            </div>
          )}

          <div className="project-stack">
            {project.stack.map((s) => (
              <span key={s} className="stack-tag">{s}</span>
            ))}
          </div>

          <div className="project-links">
            {project.links.map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.target}
                rel={l.rel}
                className="project-link"
                whileHover={{ scale: 1.05, color: '#00ffa3' }}
                whileTap={{ scale: 0.96 }}
              >
                {l.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Media */}
        <motion.div className="scene-media-wrapper" style={{ y: yMedia }}>
          <ProjectVideo videoSrc={project.videoSrc} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <>
     <style jsx global>{`
  .projects-section {
    background: #020408;
    padding: 100px 0 160px;
    position: relative;
  }

  .projects-header {
    padding: 0 60px;
    margin-bottom: 100px;
  }

  .projects-wrapper {
    display: flex;
    flex-direction: column;
    gap: 140px;
    padding: 0 60px;
  }

  .project-scene {
    min-height: 88vh;
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.008);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 18px;
    padding: 70px 65px;
    overflow: hidden;
    position: relative;
  }

  .scene-inner {
    display: grid;
    grid-template-columns: 1fr;
    gap: 70px;
    width: 100%;
  }

  .featured-scene .scene-inner {
    grid-template-columns: 1.1fr 1fr;
  }

  .scene-content { 
    z-index: 2; 
  }

  .scene-media-wrapper { 
    position: relative;
    display: flex;
    justify-content: center;
  }

      
/* PLACEHOLDER */
.media-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.3);
  background: #111;
}
  /* Placeholder */
  .media-placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.3);
    font-family: 'Space Mono', monospace;
    font-size: 1rem;
    background: #1a1a1a;
    border: 1px dashed rgba(255,255,255,0.1);
  }

  /* Rest of your styling */
  .project-meta { 
    display: flex; 
    align-items: center; 
    gap: 16px; 
    margin-bottom: 20px; 
  }

  .project-num { 
    font-family: 'Space Mono', monospace; 
    font-size: 0.78rem; 
    color: rgba(255,255,255,0.35); 
    letter-spacing: 2px; 
  }

  .project-type { 
    font-family: 'Space Mono', monospace; 
    font-size: 0.68rem; 
    color: #00ffa3; 
    letter-spacing: 2px; 
    border: 1px solid rgba(0,255,163,0.3); 
    padding: 4px 14px; 
    border-radius: 30px; 
    background: rgba(0,255,163,0.06); 
  }

  .project-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.4rem, 4.5vw, 3.8rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -1.5px;
    color: white;
    margin-bottom: 24px;
  }

  .project-desc {
    color: rgba(255,255,255,0.65);
    font-size: 1.08rem;
    line-height: 1.75;
    margin-bottom: 32px;
    max-width: 680px;
  }

  .project-problem {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.45);
    margin-bottom: 28px;
    line-height: 1.65;
    border-left: 3px solid #ffb347;
    padding-left: 20px;
  }

  .project-result {
    background: rgba(0,255,163,0.06);
    border: 1px solid rgba(0,255,163,0.2);
    padding: 18px 22px;
    margin-bottom: 32px;
    color: #00ffa3;
    font-size: 0.9rem;
    border-radius: 6px;
    position: relative;
  }

  .glow-line {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: #00ffa3;
    box-shadow: 0 0 12px #00ffa3;
  }

  .project-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 40px;
  }

  .stack-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.73rem;
    padding: 6px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    border-radius: 30px;
  }

  .project-links {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
  }

  .project-link {
    color: #63c5ff;
    font-family: 'Space Mono', monospace;
    font-size: 0.82rem;
    letter-spacing: 1px;
    text-decoration: none;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .featured-scene .scene-inner { 
      grid-template-columns: 1fr; 
    }
    .projects-wrapper, .projects-header { 
      padding: 0 40px; 
    }
  }

  @media (max-width: 768px) {
    .project-scene { 
      padding: 40px 24px; 
      min-height: auto; 
    }
    .projects-wrapper { 
      gap: 100px; 
    }
    .macbook-frame {
      max-width: 100%;
    }
  }
`}</style>

      <section id="projects" className="projects-section">
        <div className="projects-header">
          <div className="section-label">WORK</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.05, color: '#ffffff' }}>
            Projects That Shipped
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '620px', fontSize: '1.1rem', marginTop: '28px' }}>
            Real products. Real users. Real impact.
          </p>
        </div>

        <div className="projects-wrapper">
          {projectsData.map((project) => (
            <ProjectScene key={project.num} project={project} />
          ))}
        </div>
      </section>
    </>
  )
}