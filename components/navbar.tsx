'use client'

import { useState, useEffect } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 60px;
          border-bottom: 1px solid transparent;
          transition: all 0.3s;
        }
        .nav-root.scrolled {
          background: rgba(2,4,8,0.92);
          backdrop-filter: blur(20px);
          border-color: rgba(255,255,255,0.08);
          padding: 14px 60px;
        }
        .nav-logo {
          font-family: 'Space Mono', monospace;
          font-size: 1rem; color: #63c5ff;
          letter-spacing: 2px; text-decoration: none;
          flex-shrink: 0;
        }
        .nav-links {
          display: flex; gap: 36px; list-style: none; margin: 0; padding: 0;
        }
        .nav-links a {
          font-family: 'Space Mono', monospace; font-size: 0.72rem;
          color: rgba(232,244,255,0.5); text-decoration: none; letter-spacing: 1px; transition: color 0.2s;
        }
        .nav-links a:hover { color: #e8f4ff; }
        .nav-cta {
          font-family: 'Space Mono', monospace; font-size: 0.72rem;
          color: #020408; background: #63c5ff; border: none; padding: 10px 20px;
          letter-spacing: 1px; text-decoration: none; transition: all 0.2s; cursor: none; white-space: nowrap;
        }
        .nav-cta:hover { background: #00ffa3; box-shadow: 0 0 40px rgba(0,255,163,0.2); }
        .nav-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: none; padding: 4px;
        }
        .nav-hamburger span { width: 22px; height: 1.5px; background: #63c5ff; display: block; transition: all 0.2s; }
        .mobile-menu {
          display: none; flex-direction: column;
          background: rgba(2,4,8,0.97);
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 20px 24px;
          gap: 16px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-family: 'Space Mono', monospace; font-size: 0.8rem;
          color: rgba(232,244,255,0.6); text-decoration: none; letter-spacing: 1px; padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05); transition: color 0.2s;
        }
        .mobile-menu a:hover { color: #63c5ff; }
        .mobile-hire {
          font-family: 'Space Mono', monospace; font-size: 0.78rem;
          color: #020408; background: #63c5ff; border: none; padding: 12px;
          letter-spacing: 1px; text-decoration: none; text-align: center;
          transition: background 0.2s; margin-top: 4px;
        }
        @media (max-width: 900px) {
          .nav-root { padding: 16px 32px; }
          .nav-root.scrolled { padding: 12px 32px; }
          .nav-links { display: none; }
          .nav-hamburger { display: flex; }
        }
        @media (max-width: 480px) {
          .nav-root { padding: 14px 20px; }
          .nav-root.scrolled { padding: 10px 20px; }
        }
      `}</style>

      <nav className={`nav-root${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo">Rauhan<span style={{ color: '#00ffa3' }}>.</span></a>

        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.label}><a href={item.href}>{item.label}</a></li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="#contact" className="nav-cta">HIRE ME →</a>
          <button
            className="nav-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: open ? 'rotate(45deg) translateY(6px)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${open ? ' open' : ''}`} style={{ position: 'fixed', top: scrolled ? '52px' : '60px', left: 0, right: 0, zIndex: 999, backdropFilter: 'blur(20px)' }}>
        {navItems.map(item => (
          <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
        ))}
        <a href="#contact" className="mobile-hire" onClick={() => setOpen(false)}>HIRE ME →</a>
      </div>
    </>
  )
}
