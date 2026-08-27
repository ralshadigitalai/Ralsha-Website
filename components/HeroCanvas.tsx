'use client';

import React, { useEffect, useRef } from 'react';

interface CanvasNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: 'orange' | 'cyan';
  pulse: number;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;
    let nodes: CanvasNode[] = [];
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.width = canvas.offsetWidth * dpr;
      H = canvas.height = canvas.offsetHeight * dpr;
    };

    const initNodes = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const count = Math.min(40, Math.max(24, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 28000)));
      nodes = Array.from({ length: count }).map(() => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2 * dpr,
        vy: (Math.random() - 0.5) * 0.2 * dpr,
        r: (Math.random() * 1.5 + 1) * dpr,
        hue: Math.random() > 0.78 ? 'orange' : 'cyan',
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const step = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, W, H);
      const linkDist = 135 * dpr;
      const linkDistSq = linkDist * linkDist;

      // 1. Move nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReduced) {
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += 0.02;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
        }
      }

      // 2. Draw connections
      ctx.lineWidth = dpr * 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < linkDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / linkDist) * 0.25;
            ctx.strokeStyle = `rgba(90,180,220,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const glow = 0.6 + Math.sin(n.pulse) * 0.4;
        ctx.beginPath();
        ctx.fillStyle =
          n.hue === 'orange'
            ? `rgba(245,135,31,${0.5 * glow + 0.18})`
            : `rgba(31,209,232,${0.5 * glow + 0.18})`;
        ctx.arc(n.x, n.y, n.r * (1 + glow * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(step);
    };

    const boot = () => {
      resize();
      initNodes();
    };

    window.addEventListener('resize', boot);
    boot();
    animId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', boot);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} />;
};
