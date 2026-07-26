import { useEffect, useRef } from 'react';
import styles from './Intro.module.css';

function initStars(canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let stars = [];
  let raf = null;

  const resize = () => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.4 + Math.random() * 1.6,
      baseAlpha: 0.22 + Math.random() * 0.55,
      speed: 0.002 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() < 0.08 ? 'rgba(168,85,247,1)' : Math.random() < 0.06 ? 'rgba(94,234,212,0.85)' : 'rgba(255,255,255,1)',
    }));
  };

  const draw = (time) => {
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      const alpha = Math.max(0.12, star.baseAlpha + Math.sin(time * star.speed + star.phase) * 0.32);
      ctx.beginPath();
      ctx.fillStyle = star.color.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/, (_, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  };

  resize();
  draw(0);

  window.addEventListener('resize', resize);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  };
}

export default function Intro() {
  const portalRef = useRef(null);
  const revealRef = useRef(null);
  const cueRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    return initStars(canvas);
  }, []);

  useEffect(() => {
    const portal = portalRef.current;
    const revealDisc = revealRef.current;
    const cue = cueRef.current;

    if (!portal || !revealDisc || !cue) return undefined;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const progress = Math.min(1, Math.max(0, y / (window.innerHeight * 0.95)));
        const portalScale = 1 + progress * 1.5;
        portal.style.transform = `scale(${portalScale})`;
        portal.style.opacity = `${Math.max(0, 1 - Math.max(0, progress - 0.6) / 0.4)}`;
        const discScale = 1 + progress * 10;
        revealDisc.style.transform = `scale(${discScale})`;
        revealDisc.style.opacity = `${Math.max(0, 1 - progress * 1.4)}`;
        cue.style.opacity = `${Math.max(0, 1 - y / 180)}`;
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <section className={styles.introSection}>
        <canvas ref={canvasRef} className={styles.starsCanvas} aria-hidden="true" />
        <div className={styles.nebula} aria-hidden="true" />
        <div className={styles.vignette} aria-hidden="true" />

        <div className={styles.portalWrap}>
          <div className={styles.portal} ref={portalRef}>
            <div className={styles.portalCore} />
            <div className={styles.portalRing} />
          </div>
        </div>

        <div className={styles.portalText}>
          <div className={styles.portalBadge}>
            <span className={styles.dot} />Entrando no portfólio
          </div>
          <h1 className={styles.portalTitle}>Amanda Inagaki</h1>
          <p className={styles.portalSub}>Role para atravessar</p>
        </div>

        <div className={styles.scrollCue} ref={cueRef}>
          <span>Role</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      <div className={styles.revealDisc} ref={revealRef} aria-hidden="true" />
    </>
  );
}
