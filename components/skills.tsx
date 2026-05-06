'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const skillsData = [
  {
    icon: '⛓',
    title: 'Blockchain',
    color: '#63c5ff',
    items: ['Solidity / Vyper', 'Rust', 'EVM Architecture', 'DeFi Protocol Design', 'zk-SNARKs', 'Hardhat / Foundry', 'OpenZeppelin', 'Chainlink Oracles', 'The Graph', 'Layer 2 / Rollups', 'Wagmi / ethers.js'],
  },
  {
    icon: '⚙',
    title: 'Backend',
    color: '#00ffa3',
    items: ['Node.js / TypeScript', 'Rust', 'GraphQL / REST / gRPC', 'PostgreSQL / MySQL', 'Redis', 'Kafka', 'Microservices', 'Event-Driven Design', 'Python / FastAPI'],
  },
  {
    icon: '◈',
    title: 'Frontend',
    color: '#ffb347',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Web3 / Wagmi', 'Framer Motion', 'Performance Optimization', 'Figma to Code', 'PWA / Mobile-first'],
  },
  {
    icon: '☁',
    title: 'DevOps',
    color: '#b366ff',
    items: ['AWS / GCP', 'Kubernetes', 'Docker', 'GitHub Actions / CI/CD', 'Prometheus / Grafana', 'IPFS', 'Nginx / Cloudflare', 'Observability & Monitoring'],
  },
  {
    icon: '🧠',
    title: 'AI / Applied Intelligence',
    color: '#ff66aa',
    items: [
      'OpenAI API Integration',
      'LLM-based System Design',
      'AI powered Code Analysis',
      'Smart Contract Vulnerability Detection',
      'Intent based Execution Systems',
      'Pattern Recognition',
    ],
  }
]

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "0px"])

  return (
    <>
      <style>{`
        .skills-section { 
          background: #020408; 
          padding: 120px 60px; 
          position: relative; 
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .skills-ambient-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(99,197,255,0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .skills-container {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .category-block {
          margin-bottom: 64px;
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }

        .category-icon {
          font-size: 1.8rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .category-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .skill-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.85rem;
          padding: 12px 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.6);
          border-radius: 40px;
          cursor: crosshair;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .skills-section { padding: 80px 24px; }
          .category-title { font-size: 1.4rem; }
          .skill-tag { font-size: 0.75rem; padding: 10px 18px; }
          .category-block { margin-bottom: 48px; }
        }
      `}</style>

      <section id="skills" ref={containerRef} className="skills-section">
        <div className="skills-ambient-bg" />
        
        <div className="skills-container">
          <motion.div style={{ opacity, y }}>
            <div className="section-label">SKILLS</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', color: '#ffffff' }}>
              The Full Stack
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', lineHeight: 1.8, marginBottom: '80px', fontSize: '1.05rem' }}>
              Breadth to architect, depth to implement. I own every layer from smart contract to the edge CDN.
            </p>
          </motion.div>

          <div>
            {skillsData.map((cat, i) => (
              <motion.div 
                key={cat.title} 
                className="category-block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="category-header">
                  <motion.div 
                    className="category-icon"
                    whileHover={{ scale: 1.1, rotate: 5, borderColor: cat.color }}
                  >
                    {cat.icon}
                  </motion.div>
                  <h3 className="category-title" style={{ color: '#fff' }}>
                    {cat.title}
                  </h3>
                </div>
                
                <div className="tags-wrapper">
                  {cat.items.map((item, j) => (
                    <motion.div
                      key={item}
                      className="skill-tag"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: j * 0.05 }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        backgroundColor: `${cat.color}15`,
                        borderColor: `${cat.color}50`,
                        color: cat.color,
                        boxShadow: `0 10px 30px ${cat.color}20`
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
