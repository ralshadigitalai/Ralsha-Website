'use client';

import { useEffect, useRef } from 'react';

interface NodeItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: 'orange' | 'cyan';
  pulse: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let width = 0;
    let height = 0;
    let nodes: NodeItem[] = [];

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * dpr;
      height = canvas.height = rect.height * dpr;

      const count = Math.max(
        25,
        Math.floor((rect.width * rect.height) / 26000)
      );

      nodes = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22 * dpr,
        vy: (Math.random() - 0.5) * 0.22 * dpr,
        r: (Math.random() * 1.6 + 1) * dpr,
        hue: Math.random() > 0.78 ? 'orange' : 'cyan',
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const renderStep = () => {
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, width, height);

      const linkDist = 140 * dpr;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += 0.015;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.28;
            ctx.strokeStyle = `rgba(90,180,220,${alpha})`;
            ctx.lineWidth = dpr;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const glow = prefersReducedMotion ? 0.6 : 0.6 + Math.sin(n.pulse) * 0.4;
        ctx.beginPath();
        ctx.fillStyle =
          n.hue === 'orange'
            ? `rgba(245,135,31,${0.45 * glow + 0.18})`
            : `rgba(31,209,232,${0.45 * glow + 0.18})`;
        ctx.arc(n.x, n.y, n.r * (1 + glow * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animFrameId = requestAnimationFrame(renderStep);
      }
    };

    resize();
    renderStep();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        if (prefersReducedMotion) {
          renderStep();
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true" />;
}
