'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const experienceData = [
  {
    period: '2024 — PRESENT',
    role: 'Senior Fullstack Engineer',
    company: 'Pixpel.io',
    location: 'Dubai / Web3 & FinTech Systems',
    achievements: [
      'Designed and developed full-stack decentralized applications using Next.js, Node.js, and TypeScript, covering frontend interfaces, backend APIs, and off-chain services.',
      'Built scalable backend systems including REST APIs, event-driven workflows, and microservices architecture to support production-grade Web3 applications.',
      'Developed off-chain indexing and aggregation layers to optimize data access and reduce on-chain computation load across multi-chain workflows.',
      'Designed and implemented internal admin and operations dashboards with RBAC, MFA (JWT-based auth), and audit logging for secure system monitoring and operational control.',
      'Contributed to system architecture decisions across frontend, backend, and blockchain integrations, focusing on scalability, reliability, and maintainability.',
    ],
  },
  {
    period: '2023 — 2024',
    role: 'Fullstack Blockchain Engineer',
    company: 'Analog Mutations',
    location: 'Karachi / Systems & Web3 Infrastructure',
    achievements: [
      'Built backend systems and smart contract integrations for multi-protocol DeFi applications using Solidity, Rust, and Node.js.',
      'Designed scalable database architectures for real-time and historical blockchain data processing and analytics.',
      'Developed event-driven backend pipelines for data ingestion, batching, and cross-system synchronization.',
      'Worked on AI-adjacent systems including experimental AI-assisted smart contract analysis and intent-based execution flows.',
      'Contributed to distributed system design across backend services and on-chain/off-chain coordination layers.',
    ],
  },
  {
    period: '2022 — 2023',
    role: 'Fullstack Developer',
    company: 'BrandH2O',
    location: 'Karachi / Web Applications & Web3',
    achievements: [
      'Built full-stack NFT marketplace using React, Node.js, Solidity, and Ethers.js.',
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Dynamic timeline line height driven by scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <>
      <style>{`
        .exp-section { 
          background: #020408; 
          padding: 120px 60px; 
          position: relative; 
          overflow: hidden;
        }

        .exp-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .exp-timeline { 
          position: relative; 
          padding-left: 60px; 
          margin-top: 64px;
        }

        .timeline-line-bg {
          position: absolute;
          left: 14px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255,255,255,0.05);
        }

        .timeline-line-active {
          position: absolute;
          left: -1px;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #63c5ff 0%, #00ffa3 100%);
          transform-origin: top;
          box-shadow: 0 0 15px #63c5ff, 0 0 30px #00ffa3;
          border-radius: 4px;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 80px;
        }

        .timeline-dot {
          position: absolute;
          left: -65px;
          top: 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #020408;
          border: 2px solid #63c5ff;
          box-shadow: 0 0 10px #63c5ff;
          z-index: 2;
        }

        .exp-period {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          color: #63c5ff;
          letter-spacing: 2px;
          margin-bottom: 12px;
          display: inline-block;
          background: rgba(99,197,255,0.1);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .exp-role {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .exp-company {
          font-size: 1rem;
          color: rgba(255,255,255,0.6);
          margin-bottom: 24px;
        }

        .exp-company span {
          color: #00ffa3;
        }

        .achievement-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .achievement-item {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          position: relative;
          padding-left: 20px;
        }

        .achievement-item::before {
          content: '▹';
          position: absolute;
          left: 0;
          top: 0;
          color: #00ffa3;
        }

        @media (max-width: 768px) {
          .exp-section { padding: 80px 24px; }
          .exp-timeline { padding-left: 32px; }
          .timeline-line-bg { left: 4px; }
          .timeline-dot { left: -32.5px; width: 10px; height: 10px; }
          .exp-role { font-size: 1.4rem; }
          .achievement-item { font-size: 0.85rem; }
        }
      `}</style>

      <section id="experience" className="exp-section">
        <div className="exp-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label">EXPERIENCE</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', color: '#ffffff' }}>
              4+ Years. Real Stakes.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', lineHeight: 1.8, fontSize: '1.05rem', marginTop: '24px' }}>
              Every role was chosen to learn something new. Every project moved the needle.
            </p>
          </motion.div>

          <div ref={containerRef} className="exp-timeline">
            {/* Scroll-driven timeline line */}
            <div className="timeline-line-bg">
              <motion.div className="timeline-line-active" style={{ scaleY }} />
            </div>

            {experienceData.map((exp, i) => (
              <motion.div
                key={exp.period}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                <div className="timeline-dot" />
                <div className="exp-period">{exp.period}</div>
                <div className="exp-role">{exp.role}</div>
                <div className="exp-company">
                  {exp.company} <span>· {exp.location}</span>
                </div>
                
                <ul className="achievement-list">
                  {exp.achievements.map((item, j) => (
                    <motion.li 
                      key={j} 
                      className="achievement-item"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + (j * 0.1) }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
