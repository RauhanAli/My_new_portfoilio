export function RealisticMacBook({ videoSrc }: { videoSrc?: string }) {
  return (
    <div className="realistic-macbook-container">
    <style jsx>{`
  .realistic-macbook-container {
    perspective: 1600px;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }

  /* MAIN BODY */
  .realistic-macbook {
    width: 100%;
    border-radius: 18px;
    background: #1a1a1a;
    padding: 10px;
    transform-style: preserve-3d;

    box-shadow:
      0 60px 140px rgba(0, 0, 0, 0.85),
      0 0 1px rgba(255, 255, 255, 0.08) inset;

    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .realistic-macbook:hover {
    transform: rotateX(8deg) rotateY(-6deg) scale(1.03);
  }

  /* SCREEN */
  .realistic-screen-wrapper {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    aspect-ratio: 16 / 10;
  }

  .camera-notch {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 24px;
    background: #0a0a0a;
    border-radius: 0 0 20px 20px;
    z-index: 10;
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.8);
  }

  .camera-notch::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #1a1a1a;
    border-radius: 50%;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.9);
  }

  .realistic-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: #000;
  }

  .screen-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08) 0%,
      transparent 15%,
      transparent 85%,
      rgba(0, 0, 0, 0.25) 100%
    );
    pointer-events: none;
  }

  /* KEY FIX: REAL 3D BASE */
  .realistic-base {
    position: relative;
    height: 85px;
    margin-top: -4px;

    background: linear-gradient(180deg, #2e2e2e, #1a1a1a);
    border-radius: 0 0 16px 16px;

    /* real depth illusion */
    transform: perspective(1600px) rotateX(70deg);
    transform-origin: top;

    box-shadow:
      0 40px 60px rgba(0, 0, 0, 0.7),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  /* metal edge highlight */
  .realistic-base::before {
    content: "";
    position: absolute;
    top: -2px;
    left: 6%;
    width: 88%;
    height: 6px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.12),
      transparent
    );
    border-radius: 50%;
  }

  /* keyboard illusion */
  .keyboard-pattern {
    position: absolute;
    inset: 12px;
    opacity: 0.12;

    background:
      linear-gradient(90deg, #777 1px, transparent 1px),
      linear-gradient(#777 1px, transparent 1px);

    background-size: 20px 20px;
  }

  /* HINGE */
  .hinge-line {
    position: absolute;
    width: 100%;
    height: 2px;
    top: 0;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.12),
      transparent
    );
  }

  /* optional floating shadow under laptop */
  .realistic-macbook::after {
    content: "";
    position: absolute;
    bottom: -50px;
    left: 10%;
    width: 80%;
    height: 70px;
    background: radial-gradient(rgba(0,0,0,0.55), transparent 70%);
    filter: blur(18px);
    z-index: -1;
  }
`}</style>
 
      <div className="realistic-macbook">
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
                preload="metadata"
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
              color: 'rgba(255,255,255,0.2)',
              fontSize: '14px'
            }}>
              Video Coming Soon
            </div>
          )}
        </div>
 
        <div className="realistic-base">
          <div className="hinge-line" />
          <div className="keyboard-pattern" />
        </div>
        <div className="realistic-stand" />
      </div>
    </div>
  )
}