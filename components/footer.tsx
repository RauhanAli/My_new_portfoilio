'use client'

export function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          padding: 28px 60px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: space-between;
          background: #060d14; flex-wrap: wrap; gap: 16px;
        }
        .footer-copy { font-family: 'Space Mono',monospace; font-size: 0.68rem; color: rgba(232,244,255,0.25); letter-spacing: 1px; }
        .footer-status { display: flex; align-items: center; gap: 8px; font-family: 'Space Mono',monospace; font-size: 0.68rem; color: rgba(232,244,255,0.25); }
        .avail-dot { width: 6px; height: 6px; background: #00ffa3; border-radius: 50%; animation: pulse-dot 2s infinite; }
        @media (max-width: 600px) {
          .footer-root { padding: 24px 20px; flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="footer-root">
        <span className="footer-copy">© {new Date().getFullYear()} Syed Rauhan Ali · Senior Full Stack Engineer</span>
        <div className="footer-status">
          <div className="avail-dot" />
          AVAILABLE FOR NEW PROJECTS
        </div>
      </footer>
    </>
  )
}
