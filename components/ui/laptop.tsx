export function RealisticMacBook({ videoSrc }: { videoSrc?: string }) {
  return (
    <div className="realistic-macbook-container">
      <style jsx>{`
        .realistic-macbook-container {
          perspective: 2000px;
          width: 100%;
          max-width: 920px;
          margin: 40px auto;
        }

        .realistic-macbook {
          position: relative;
          width: 100%;
          transform-style: preserve-3d;
          transform: rotateX(12deg) rotateY(-8deg);
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .realistic-macbook:hover {
          transform: rotateX(8deg) rotateY(-4deg) scale(1.02);
        }

        /* ==================== SCREEN ==================== */
        .realistic-screen-wrapper {
          position: relative;
          border-radius: 16px 16px 4px 4px;
          overflow: hidden;
          background: #0a0a0a;
          border: 10px solid #161616;
          box-shadow: 
            inset 0 0 80px rgba(0, 0, 0, 0.95),
            0 25px 50px rgba(0, 0, 0, 0.7);
          aspect-ratio: 16 / 10;
        }

        .camera-notch {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 138px;
          height: 28px;
          background: #0f0f0f;
          border-radius: 0 0 18px 18px;
          z-index: 20;
          box-shadow: inset 0 6px 10px rgba(0,0,0,0.9);
        }

        .camera-notch::after {
          content: '';
          position: absolute;
          top: 9px;
          left: 50%;
          transform: translateX(-50%);
          width: 9px;
          height: 9px;
          background: #222;
          border-radius: 50%;
          border: 1px solid #444;
        }

        .realistic-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .screen-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.13) 0%,
            transparent 45%,
            transparent 75%,
            rgba(0,0,0,0.35) 100%
          );
          pointer-events: none;
          z-index: 5;
        }

        /* ==================== BASE / BODY ==================== */
        .realistic-base {
          position: relative;
          height: 94px;
          margin-top: -8px;
          background: linear-gradient(
            180deg,
            #2c2c2e 0%,
            #1f1f21 45%,
            #18181a 100%
          );
          border-radius: 4px 4px 24px 24px;
          box-shadow: 
            0 35px 70px rgba(0, 0, 0, 0.8),
            inset 0 10px 15px rgba(255,255,255,0.08),
            inset 0 -6px 12px rgba(0,0,0,0.7);
          transform: perspective(1800px) rotateX(68deg);
          transform-origin: top center;
          z-index: 10;
        }

        /* Metallic top edge */
        .realistic-base::before {
          content: "";
          position: absolute;
          top: -4px;
          left: 3.5%;
          right: 3.5%;
          height: 9px;
          background: linear-gradient(
            90deg,
            transparent 8%,
            rgba(255,255,255,0.22) 50%,
            transparent 92%
          );
          border-radius: 50%;
          z-index: 2;
        }

        /* Subtle side highlights */
        .realistic-base::after {
          content: "";
          position: absolute;
          top: 15px;
          left: 0;
          right: 0;
          height: 40px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.06),
            transparent 40%,
            transparent 60%,
            rgba(255,255,255,0.06)
          );
          z-index: 1;
          border-radius: 4px;
        }

        /* Hinge area */
        .hinge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          width: 172px;
          height: 20px;
          background: linear-gradient(#222, #111);
          border-radius: 10px 10px 2px 2px;
          box-shadow: 
            0 6px 12px rgba(0,0,0,0.7),
            inset 0 3px 6px rgba(255,255,255,0.1);
          z-index: 15;
        }

        /* Keyboard texture */
        .keyboard-pattern {
          position: absolute;
          inset: 20px 26px 18px;
          background: 
            linear-gradient(90deg, #4a4a4e 1px, transparent 1px),
            linear-gradient(#4a4a4e 1px, transparent 1px);
          background-size: 28px 24px;
          opacity: 0.13;
          border-radius: 6px;
          box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
        }

        /* Floating shadow */
        .realistic-macbook::after {
          content: "";
          position: absolute;
          bottom: -72px;
          left: 10%;
          width: 80%;
          height: 58px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, transparent 75%);
          filter: blur(28px);
          z-index: -1;
          border-radius: 50%;
        }
      `}</style>

      <div className="realistic-macbook">
        {/* Screen */}
        <div className="realistic-screen-wrapper">
          {videoSrc ? (
            <>
              <video
                className="realistic-video"
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="camera-notch" />
              <div className="screen-shine" />
            </>
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '15px',
              background: '#0f0f0f'
            }}>
              Video Coming Soon
            </div>
          )}
        </div>

        {/* Base */}
        <div className="realistic-base">
          <div className="hinge" />
          <div className="keyboard-pattern" />
        </div>
      </div>
    </div>
  )
}