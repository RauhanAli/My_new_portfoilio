'use client'

import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Linkedin, Github, Twitter, FileDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], ["80px", "0px"])

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setStatus('sending')
    
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          name: form.name,
          email: form.email,
          projectType: form.projectType,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      )
      setStatus('success')
      setForm({ name: '', email: '', projectType: '', message: '' })
      setTimeout(() => setStatus('idle'), 3500)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  const links = [
    { icon: <Mail size={18} strokeWidth={1.5} />, label: 'rauhanali2@gmail.com', href: 'mailto:rauhanali2@gmail.com', target: '_blank', rel: 'noopener noreferrer' },
    { icon: <Linkedin size={18} strokeWidth={1.5} />, label: 'linkedin.com/in/syed-rauhan-ali', href: 'https://www.linkedin.com/in/syed-rauhan-ali-056734178/', target: '_blank', rel: 'noopener noreferrer' },
    { icon: <Github size={18} strokeWidth={1.5} />, label: 'github.com/rauhanali', href: 'https://github.com/rauhanali', target: '_blank', rel: 'noopener noreferrer' },
    { icon: <Twitter size={18} strokeWidth={1.5} />, label: 'x.com/RauhanAli2', href: 'https://x.com/RauhanAli2', target: '_blank', rel: 'noopener noreferrer' },
    // { icon: <FileDown size={18} strokeWidth={1.5} />, label: 'Download Resume (PDF)', href: '/rauhan_blockchain.pdf', target: '_blank', rel: 'noopener noreferrer', download: "Rauhan_Resume.pdf" },
  ]

  return (
    <>
      <style>{`
        .contact-section { 
          background: #000204; 
          padding: 140px 60px; 
          position: relative; 
        }

        .contact-grid { 
          display: grid; 
          grid-template-columns: 1.1fr 0.9fr; 
          gap: 100px; 
          align-items: start; 
          max-width: 1400px;
          margin: 0 auto;
        }

        .contact-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          margin-bottom: 24px;
          color: #ffffff;
          letter-spacing: -2px;
        }

        .contact-desc {
          color: rgba(255,255,255,0.5);
          font-size: 1.15rem;
          line-height: 1.8;
          max-width: 500px;
          margin-bottom: 48px;
        }

        .contact-link {
          display: flex; 
          align-items: center; 
          gap: 16px;
          text-decoration: none; 
          color: rgba(255,255,255,0.6);
          font-family: 'Space Mono', monospace; 
          font-size: 0.85rem; 
          letter-spacing: 1px;
          padding: 16px 20px; 
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05); 
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 4px;
        }

        .contact-link:hover { 
          border-color: #63c5ff; 
          color: #ffffff; 
          background: rgba(99,197,255,0.1); 
          transform: translateX(10px);
          box-shadow: 0 10px 30px rgba(99,197,255,0.1);
        }

        .icon-wrap {
          color: #63c5ff;
        }
        
        .contact-link:hover .icon-wrap {
          color: #ffffff;
        }

        .contact-links { 
          display: flex; 
          flex-direction: column; 
          gap: 12px; 
        }

        .form-group {
          margin-bottom: 24px;
        }

        .contact-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          color: #00ffa3;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 12px;
        }

        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          padding: 12px 0;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .contact-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .contact-input:focus {
          border-bottom-color: #63c5ff;
          box-shadow: 0 10px 20px -10px rgba(99,197,255,0.2);
        }
        
        textarea.contact-input {
          min-height: 100px;
          resize: vertical;
        }

        .form-submit {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'Space Mono', monospace; 
          font-size: 0.85rem; 
          letter-spacing: 2px;
          padding: 20px 40px; 
          background: #ffffff; 
          color: #000000; 
          border: none;
          cursor: crosshair; 
          font-weight: 700; 
          transition: all 0.3s;
          border-radius: 4px;
          margin-top: 24px;
        }

        .form-submit:hover { 
          background: #00ffa3; 
          box-shadow: 0 0 40px rgba(0,255,163,0.3); 
          transform: translateY(-4px); 
        }

        .form-submit:disabled { 
          opacity: 0.5; 
          pointer-events: none; 
        }

        @media (max-width: 1024px) {
          .contact-section { padding: 100px 40px; }
          .contact-grid { grid-template-columns: 1fr; gap: 80px; }
        }

        @media (max-width: 480px) {
          .contact-section { padding: 80px 24px; }
          .contact-link { font-size: 0.75rem; padding: 14px 16px; }
        }
      `}</style>

      <section id="contact" ref={containerRef} className="contact-section">
        <motion.div className="contact-grid" style={{ opacity, y }}>
          
          {/* Left Side */}
          <div>
            <div className="section-label">CONTACT</div>
            <h2 className="contact-heading">
              Let&#39;s build something <br/><span style={{ color: '#00ffa3' }}>impactful.</span>
            </h2>
            <p className="contact-desc">
              Whether you&#39;re building a DeFi protocol, scaling a platform, or solving a problem nobody else can crack. I want to hear about it. I take on select freelance engagements and am open to lead roles.
            </p>
            
            <div className="contact-links">
              {links.map((l, i) => (
                <motion.a 
                  key={l.label} 
                  href={l.href} 
                  target={l.target} 
                  rel={l.rel} 
                  // download={l?.download} 
                  className="contact-link"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className="icon-wrap">{l.icon}</span>
                  {l.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.form 
            ref={formRef} 
            onSubmit={submit}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="form-group">
              <label className="contact-label">01 // YOUR NAME</label>
              <input name="name" value={form.name} onChange={handle} required placeholder="Sarah Chen" className="contact-input" />
            </div>
            
            <div className="form-group">
              <label className="contact-label">02 // EMAIL</label>
              <input type="email" name="email" value={form.email} onChange={handle} required placeholder="sarah@startup.io" className="contact-input" />
            </div>
            
            <div className="form-group">
              <label className="contact-label">03 // PROJECT TYPE</label>
              <input name="projectType" value={form.projectType} onChange={handle} required placeholder="DeFi Protocol / Web3 App / Audit" className="contact-input" />
            </div>
            
            <div className="form-group">
              <label className="contact-label">04 // THE DETAILS</label>
              <textarea name="message" value={form.message} onChange={handle} required placeholder="What are you building? What's the problem you're trying to solve?" className="contact-input" />
            </div>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: '16px', background: 'rgba(0,255,163,0.1)', border: '1px solid #00ffa3', color: '#00ffa3', fontFamily: "'Space Mono',monospace", fontSize: '0.85rem', borderRadius: '4px' }}
              >
                ✓ Message sent! I'll be in touch within 24 hours.
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: '16px', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#ef4444', fontFamily: "'Space Mono',monospace", fontSize: '0.85rem', borderRadius: '4px' }}
              >
                ✗ Error sending message. Please try emailing directly.
              </motion.div>
            )}

            <button type="submit" disabled={status==='sending'} className="form-submit">
              {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE →'}
            </button>
          </motion.form>
          
        </motion.div>
      </section>
    </>
  )
}
