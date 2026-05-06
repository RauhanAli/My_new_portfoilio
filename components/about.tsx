'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

function ScrollWord({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) {
  const color = useTransform(progress, range, ['rgba(255,255,255,0.25)', '#ffffff'])
  const y = useTransform(progress, range, [25, 0])
  const opacity = useTransform(progress, range, [0.4, 1])

  return (
    <motion.span 
      style={{ color, display: 'inline-block', y, opacity }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  )
}

function ScrollText({ children }: { children: string }) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 80%", "start 30%"]
  })

  const words = children.split(' ')
 
  return (
    <p ref={textRef} className="story-p">
      {words.map((word, i) => {
        const start = Math.max(0, (i - 2) / words.length)
        const end = Math.min(1, (i + 5) / words.length)
        return (
          <span key={i} className="word-wrapper">
            <ScrollWord progress={scrollYProgress} range={[start, end]}>
              {word}
            </ScrollWord>
          </span>
        )
      })}
    </p>
  )
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6])
  const sectionY = useTransform(scrollYProgress, [0, 0.2], [80, 0])
  const paragraphs = [
    "I don't just write code, I architect systems that move capital, secure assets, and handle heavy workloads without breaking a sweat. My work sits at the intersection of deep engineering, AI, and financial infrastructure.",
    "I started as a backend engineer working on production fintech systems where reliability mattered. I pivoted into blockchain environments managing high TVL DeFi protocols, building Layer 2 bridges, and delivering resilient execution layers.",
    "Today, my focus extends into AI powered backends integrating intelligent services, intent based execution frameworks, and deep system workflows that fundamentally change how users interact with protocols.",
    "My superpower is seeing the whole system: from smart contract optimization to the backend infrastructure and edge. I optimize for correctness first, performance second, and developer experience always."
  ]
  const tags = [
    'Systems Architecture', 'Backend Engineering', 'Fintech Systems', 'LangChain', 'DeFi Protocols', 
    'Smart Contracts', 'Distributed Systems', 'Zero-Knowledge Proofs', 'API Design', 'DevOps', 
    'AI & Machine Learning', 'Web3 Infrastructure', 'Large Language Models'
  ]

  return (
    <>
      <style jsx global>{`
        .about-section {
          background: transparent;
          padding: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          z-index: 5;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18vh 5vw 22vh;
          width: 100%;
        }

        .story-p {
          line-height: 1.9;
          margin-bottom: 32px;
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          font-weight: 380;
          font-family: 'Inter', system-ui, sans-serif;
          color: rgba(255,255,255,0.88);
        }

        .word-wrapper {
          display: inline-block;
          margin-right: 0.4em;
        }

        .tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          padding: 12px 22px;
          color: rgba(255,255,255,0.7);
          letter-spacing: 1.2px;
          border-radius: 6px;
          background: rgba(10, 12, 20, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(99, 197, 255, 0.2);
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .tag::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(99, 197, 255, 0.15) 50%,
            transparent 100%);
          transform: translateX(-150%);
          transition: transform 0.7s ease;
        }

        .tag:hover::before {
          transform: translateX(300%);
        }
      `}</style>

      <motion.section
        id="about"
        ref={containerRef}
        className="about-section"
        style={{ opacity: sectionOpacity, y: sectionY }}
      >
        {/* Cinematic Background Glows */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 20%, rgba(99,197,255,0.08) 0%, transparent 50%)',
          }}
        />
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 80% 70%, rgba(0,255,163,0.06) 0%, transparent 55%)',
          }}
        />

        <div className="content-wrapper">
          <div className="section-label mb-16">01 / INTRO</div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.21, 0.92, 0.3, 1] }}
            className="font-bold text-white tracking-[-2px] leading-[1.05] mb-16"
            style={{ 
              fontFamily: "'Syne', system-ui, sans-serif", 
              fontSize: 'clamp(2.6rem, 6vw, 4.2rem)' 
            }}
          >
            Engineering Scalable Systems <br/>
            Across Backend, AI, FinTech &amp; Blockchain
          </motion.h2>

          <div className="max-w-3xl">
            {paragraphs.map((p, i) => (
              <ScrollText key={i}>{p}</ScrollText>
            ))}
          </div>

          {/* Cinematic Tags */}
          <motion.div 
            className="flex flex-wrap gap-3 mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.035, delayChildren: 0.4 }
              }
            }}
          >
            {tags.map((tag) => (
              <motion.span
                key={tag}
                className="tag"
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 40, 
                    scale: 0.85,
                    filter: "blur(10px)"
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    filter: "blur(0px)",
                    transition: { 
                      type: "spring", 
                      stiffness: 110, 
                      damping: 16,
                      mass: 0.7
                    }
                  }
                }}
                whileHover={{
                  scale: 1.08,
                  y: -6,
                  color: "#ffffff",
                  borderColor: "#63c5ff",
                  boxShadow: "0 20px 40px -15px rgba(99, 197, 255, 0.35)"
                }}
                whileTap={{ scale: 0.96 }}
                // Magnetic hover effect
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = (e.clientX - rect.left - rect.width / 2) * 0.15
                  const y = (e.clientY - rect.top - rect.height / 2) * 0.15
                  e.currentTarget.style.transform = `translate(${x}px, ${y}px) scale(1.08)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `translate(0px, 0px) scale(1)`
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}