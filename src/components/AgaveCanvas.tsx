import { useEffect, useRef } from "react";

// Pure black & white line-drawn agave rosette (stand-in for hero photography/video).
// Swap for <video>/<img> when real brand media is available.
export default function AgaveCanvas({ offsetY = 0 }: { offsetY?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, w = 0, h = 0;
    const stars = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.2, a: Math.random() * 0.7 + 0.2 }));
    const resize = () => {
      const d = Math.min(devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const draw = (t: number) => {
      ctx.fillStyle = "#000"; ctx.fillRect(0, 0, w, h);
      for (const s of stars) { ctx.fillStyle = `rgba(255,255,255,${s.a})`; ctx.fillRect(s.x * w, s.y * h, s.r, s.r); }
      const cx = w * 0.68, cy = h * (0.5 + offsetY), R = Math.min(w, h) * 0.62;
      ctx.lineWidth = 1;
      for (let ring = 0; ring < 5; ring++) {
        const n = 10 + ring * 4, len = R * (1 - ring * 0.17), rot = t * 0.00004 * (ring % 2 ? -1 : 1) + ring * 0.3;
        for (let i = 0; i < n; i++) {
          const a = rot + (i / n) * Math.PI * 2, wid = (Math.PI / n) * 0.9;
          const tip = [cx + Math.cos(a) * len, cy + Math.sin(a) * len * 0.62];
          const l = [cx + Math.cos(a - wid) * len * 0.45, cy + Math.sin(a - wid) * len * 0.45 * 0.62];
          const r = [cx + Math.cos(a + wid) * len * 0.45, cy + Math.sin(a + wid) * len * 0.45 * 0.62];
          ctx.strokeStyle = `rgba(255,255,255,${0.85 - ring * 0.14})`;
          ctx.beginPath(); ctx.moveTo(cx, cy);
          ctx.quadraticCurveTo(l[0], l[1], tip[0], tip[1]);
          ctx.quadraticCurveTo(r[0], r[1], cx, cy);
          ctx.stroke();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    if (reduce) draw(0);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, [offsetY]);
  return <canvas ref={ref} aria-hidden="true" />;
}
