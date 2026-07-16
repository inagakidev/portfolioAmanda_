import { useEffect, useRef } from 'react';
import styles from './Background.module.css';

const LAYERS = [
  { count: 90, speed: 0.03, size: [0.5, 1.1], color: 'rgba(255,255,255,0.55)' },
  { count: 55, speed: 0.07, size: [0.9, 1.7], color: 'rgba(0,240,255,0.6)' },
  { count: 25, speed: 0.13, size: [1.4, 2.4], color: 'rgba(255,255,255,0.9)' },
];

const shouldReduceBackgroundMotion = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  const { matchMedia } = window;
  const isMobile = matchMedia('(max-width: 768px)').matches || matchMedia('(pointer: coarse)').matches;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowCpu = typeof navigator !== 'undefined' && typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

  return reducedMotion || isMobile || lowCpu;
};

export default function Background() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const stars = useRef([]);
  const shootingStars = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    if (shouldReduceBackgroundMotion()) {
      canvas.style.display = 'none';
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    let width, height, dpr, raf;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars.current = LAYERS.map((layer) =>
        Array.from({ length: layer.count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
          twinkle: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.2,
        }))
      );
    };

    const handleMouse = (e) => {
      target.current.x = (e.clientX / width - 0.5) * 2;
      target.current.y = (e.clientY / height - 0.5) * 2;
    };

    const spawnShootingStar = () => {
      shootingStars.current.push({
        x: Math.random() * width * 0.6,
        y: Math.random() * height * 0.3,
        len: 60 + Math.random() * 60,
        speed: 6 + Math.random() * 4,
        angle: Math.PI / 5,
        life: 1,
      });
    };

    const render = () => {
      mouse.current.x += (target.current.x - mouse.current.x) * 0.06;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      LAYERS.forEach((layer, i) => {
        const offsetX = -mouse.current.x * layer.speed * 100;
        const offsetY = -mouse.current.y * layer.speed * 100;

        stars.current[i].forEach((star) => {
          star.twinkle += 0.015 * star.speed;
          const alpha = Math.max(0.35 + Math.sin(star.twinkle) * 0.45, 0.1);

          ctx.beginPath();
          ctx.fillStyle = layer.color;
          ctx.globalAlpha = alpha;
          ctx.arc(star.x + offsetX, star.y + offsetY, star.r, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      if (Math.random() < 0.01) spawnShootingStar();

      shootingStars.current = shootingStars.current.filter((s) => s.life > 0);
      shootingStars.current.forEach((s) => {
        const dx = Math.cos(s.angle) * s.speed;
        const dy = Math.sin(s.angle) * s.speed;
        s.x += dx;
        s.y += dy;
        s.life -= 0.02;

        const grad = ctx.createLinearGradient(
          s.x, s.y,
          s.x - dx * (s.len / s.speed), s.y - dy * (s.len / s.speed)
        );
        grad.addColorStop(0, `rgba(255,255,255,${s.life})`);
        grad.addColorStop(1, 'rgba(0,240,255,0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - dx * (s.len / s.speed), s.y - dy * (s.len / s.speed));
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div className={styles.background} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.stars} />
      <div className={styles.nebula} />
      <div className={styles.grid} />
      <span className={`${styles.corner} ${styles.cornerTopRight}`} />
      <span className={`${styles.corner} ${styles.cornerBottomLeft}`} />
    </div>
  );
}