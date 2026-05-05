'use client'

import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Linkedin, Github, Twitter, FileDown } from 'lucide-react'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setStatus('sending')
    
    try {
      // Replace these placeholders with your actual EmailJS credentials
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

  const inp: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    color: '#e8f4ff', padding: '13px 16px', fontFamily: "'Inter',sans-serif",
    fontSize: '0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }
  const lbl: React.CSSProperties = { fontFamily: "'Space Mono',monospace", fontSize: '0.68rem', color: 'rgba(232,244,255,0.25)', letterSpacing: '2px', display: 'block', marginBottom: '7px' }
  const foc = (e: React.FocusEvent<any>) => (e.target.style.borderColor = '#63c5ff')
  const blr = (e: React.FocusEvent<any>) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')

  const links = [
    { icon: <Mail size={18} strokeWidth={1.5} />, label: 'rauhanali2@gmail.com', href: 'mailto:rauhanali2@gmail.com', target: '_blank', rel: 'noopener noreferrer' },
    { icon: <Linkedin size={18} strokeWidth={1.5} />, label: 'linkedin.com/in/syed-rauhan-ali', href: 'https://www.linkedin.com/in/syed-rauhan-ali-056734178/', target: '_blank', rel: 'noopener noreferrer' },
    { icon: <Github size={18} strokeWidth={1.5} />, label: 'github.com/rauhanali', href: 'https://github.com/rauhanali', target: '_blank', rel: 'noopener noreferrer' },
    { icon: <Twitter size={18} strokeWidth={1.5} />, label: 'x.com/RauhanAli2', href: 'https://x.com/RauhanAli2', target: '_blank', rel: 'noopener noreferrer' },
    { icon: <FileDown size={18} strokeWidth={1.5} />, label: 'Download Resume (PDF)', href: '/rauhan_blockchain.pdf', target: '_blank', rel: 'noopener noreferrer', download: "Rauhan_Resume.pdf" },
  ]

  return (
    <>
      <style>{`
        .contact-section { background: #020408; padding: 120px 60px; overflow: hidden; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .contact-link {
          display: flex; align-items: center; gap: 14px;
          text-decoration: none; color: rgba(232,244,255,0.5);
          font-family: 'Space Mono', monospace; font-size: 0.82rem; letter-spacing: 1px;
          padding: 14px 18px; border: 1px solid rgba(255,255,255,0.08); transition: all 0.2s;
          word-break: break-all;
        }
        .contact-link:hover { border-color: #63c5ff; color: #63c5ff; background: rgba(99,197,255,0.1); }
        .contact-links { display: flex; flex-direction: column; gap: 10px; }
        .form-submit {
          font-family: 'Space Mono',monospace; font-size: 0.78rem; letter-spacing: 1px;
          padding: 14px 28px; background: #63c5ff; color: #020408; border: none;
          cursor: none; font-weight: 700; transition: all 0.2s;
        }
        .form-submit:hover { background: #00ffa3; box-shadow: 0 0 40px rgba(0,255,163,0.2); transform: translateY(-2px); }
        .form-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        @media (max-width: 900px) {
          .contact-section { padding: 80px 32px; }
          .contact-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 480px) {
          .contact-section { padding: 60px 20px; }
          .contact-link { font-size: 0.74rem; padding: 12px 14px; }
        }
      `}</style>

      <section id="contact" className="contact-section">
        <div className="contact-grid">
          {/* Left */}
          <div>
            <div className="section-label">CONTACT</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '18px', color: '#e8f4ff' }}>
              Let&#39;s Build Something <span style={{ color: '#63c5ff' }}>Great.</span>
            </h2>
            <p style={{ color: 'rgba(232,244,255,0.5)', lineHeight: 1.8, marginBottom: '36px', fontSize: '0.92rem' }}>
              Whether you&#39;re building a DeFi protocol, scaling a platform, or solving a problem nobody else can crack. I want to hear about it. I take on select freelance engagements and am open to founding engineer / lead roles at the right company.
            </p>
            <div className="contact-links">
              {links.map(l => <a key={l.label} href={l.href} target={l.target} rel={l.rel} download={l?.download} className="contact-link"><span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{l.icon}</span>{l.label}</a>)}
            </div>
          </div>

          {/* Right: Form */}
          <form ref={formRef} onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div><label style={lbl}>YOUR NAME</label><input name="name" value={form.name} onChange={handle} required placeholder="Sarah Chen" style={inp} onFocus={foc} onBlur={blr} /></div>
            <div><label style={lbl}>EMAIL</label><input type="email" name="email" value={form.email} onChange={handle} required placeholder="sarah@startup.io" style={inp} onFocus={foc} onBlur={blr} /></div>
            <div><label style={lbl}>PROJECT TYPE</label><input name="projectType" value={form.projectType} onChange={handle} required placeholder="DeFi Protocol / Full Stack / Audit" style={inp} onFocus={foc} onBlur={blr} /></div>
            <div><label style={lbl}>TELL ME MORE</label>
              <textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder="What are you building? What's the problem you're solving?" style={{ ...inp, resize: 'vertical', minHeight: '130px' }} onFocus={foc} onBlur={blr} />
            </div>

            {status === 'success' && <div style={{ padding: '10px 14px', background: 'rgba(0,255,163,0.1)', border: '1px solid rgba(0,255,163,0.2)', color: '#00ffa3', fontFamily: "'Space Mono',monospace", fontSize: '0.78rem' }}>✓ Message sent! I&apos;ll be in touch soon.</div>}
            {status === 'error' && <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', fontFamily: "'Space Mono',monospace", fontSize: '0.78rem' }}>✗ Something went wrong. Please try again.</div>}

            <button type="submit" disabled={status==='sending'} className="form-submit">
              {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE →'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
