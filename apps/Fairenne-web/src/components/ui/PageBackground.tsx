import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const randInt = (min: number, max: number) => Math.floor(rand(min, max));

// ─── Particle shapes as SVG strings ────────────────────────────────────────

const SKIN_PARTICLES = [
  // serum drop
  `<svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,-0.9 C0.7,-0.3 0.7,0.45 0,0.9 C-0.7,0.45 -0.7,-0.3 0,-0.9Z" fill="currentColor"/>
    <ellipse cx="-0.18" cy="-0.38" rx="0.14" ry="0.22" fill="rgba(255,255,255,0.38)"/>
  </svg>`,
  // leaf
  `<svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,-0.9 Q0.85,0 0,0.9 Q-0.85,0 0,-0.9Z" fill="currentColor"/>
    <line x1="0" y1="-0.75" x2="0" y2="0.75" stroke="rgba(255,255,255,0.35)" stroke-width="0.07"/>
  </svg>`,
  // petal flower
  `<svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="0" cy="-0.55" rx="0.25" ry="0.5" fill="currentColor" transform="rotate(0)"/>
    <ellipse cx="0" cy="-0.55" rx="0.25" ry="0.5" fill="currentColor" transform="rotate(72)"/>
    <ellipse cx="0" cy="-0.55" rx="0.25" ry="0.5" fill="currentColor" transform="rotate(144)"/>
    <ellipse cx="0" cy="-0.55" rx="0.25" ry="0.5" fill="currentColor" transform="rotate(216)"/>
    <ellipse cx="0" cy="-0.55" rx="0.25" ry="0.5" fill="currentColor" transform="rotate(288)"/>
    <circle cx="0" cy="0" r="0.22" fill="#ffde85"/>
  </svg>`,
  // bubble
  `<svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="0.85" fill="currentColor"/>
    <ellipse cx="-0.28" cy="-0.28" rx="0.22" ry="0.32" fill="rgba(255,255,255,0.4)"/>
  </svg>`,
];

const GLAM_PARTICLES = [
  // 4-point star
  `<svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,-1 L0.22,-0.22 L1,0 L0.22,0.22 L0,1 L-0.22,0.22 L-1,0 L-0.22,-0.22 Z" fill="currentColor"/>
  </svg>`,
  // sparkle cross
  `<svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="-1" x2="0" y2="1" stroke="currentColor" stroke-width="0.12" stroke-linecap="round"/>
    <line x1="-1" y1="0" x2="1" y2="0" stroke="currentColor" stroke-width="0.12" stroke-linecap="round"/>
    <line x1="-0.6" y1="-0.6" x2="0.6" y2="0.6" stroke="currentColor" stroke-width="0.07" stroke-linecap="round"/>
    <line x1="0.6" y1="-0.6" x2="-0.6" y2="0.6" stroke="currentColor" stroke-width="0.07" stroke-linecap="round"/>
  </svg>`,
  // wand + star
  `<svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
    <line x1="-0.85" y1="0.85" x2="0.65" y2="-0.65" stroke="currentColor" stroke-width="0.13" stroke-linecap="round"/>
    <path d="M0.65,-0.65 L0.78,-0.95 L0.88,-0.65 L1.0,-0.52 L0.72,-0.52 Z" fill="currentColor"/>
    <circle cx="-0.25" cy="0.25" r="0.08" fill="currentColor" opacity="0.7"/>
    <circle cx="-0.55" cy="0.55" r="0.05" fill="currentColor" opacity="0.5"/>
  </svg>`,
  // 6-petal bloom
  `<svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="0" cy="-0.55" rx="0.2" ry="0.48" fill="currentColor" transform="rotate(0)"/>
    <ellipse cx="0" cy="-0.55" rx="0.2" ry="0.48" fill="currentColor" transform="rotate(60)"/>
    <ellipse cx="0" cy="-0.55" rx="0.2" ry="0.48" fill="currentColor" transform="rotate(120)"/>
    <ellipse cx="0" cy="-0.55" rx="0.2" ry="0.48" fill="currentColor" transform="rotate(180)"/>
    <ellipse cx="0" cy="-0.55" rx="0.2" ry="0.48" fill="currentColor" transform="rotate(240)"/>
    <ellipse cx="0" cy="-0.55" rx="0.2" ry="0.48" fill="currentColor" transform="rotate(300)"/>
    <circle cx="0" cy="0" r="0.25" fill="#fff8d4"/>
  </svg>`,
];

const SKIN_COLORS = [
  '#ff9aa8','#ffb7c5','#ffc8a2','#ffe0b2',
  '#a8d8b9','#b5e48c','#ffde85','#f9c6c9','#c9f0e4',
];
const GLAM_COLORS = [
  '#f7e0a3','#e8c97a','#f5c0cb','#d4a1d8',
  '#c8a2c8','#f9d0b4','#ffd700','#ffb6c1','#e0c8ff',
];

interface Particle {
  id: number;
  svgIndex: number;
  color: string;
  x: number;       // vw %
  size: number;    // px
  opacity: number;
  duration: number; // animation seconds
  delay: number;
  rotation: number;
  rotationEnd: number;
}

let idCounter = 0;

function makeParticle(isGlam: boolean): Particle {
  const colors = isGlam ? GLAM_COLORS : SKIN_COLORS;
  const count = isGlam ? GLAM_PARTICLES.length : SKIN_PARTICLES.length;
  return {
    id: idCounter++,
    svgIndex: randInt(0, count),
    color: colors[randInt(0, colors.length)],
    x: rand(0, 100),
    size: rand(12, 36),
    opacity: rand(0.08, 0.28),
    duration: rand(8, 22),
    delay: rand(0, 15),
    rotation: rand(-180, 180),
    rotationEnd: rand(-360, 360),
  };
}

const TOTAL = 55;

export const PageBackground: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const particles: Particle[] = Array.from({ length: TOTAL }, (_, i) => {
    // seed with index for stable key, but randomise properties
    const p = makeParticle(isGlam);
    p.id = i;
    return p;
  });

  const svgList = isGlam ? GLAM_PARTICLES : SKIN_PARTICLES;

  return (
    <>
      <style>{`
        @keyframes floatDown {
          0%   { transform: translateY(-80px) rotate(var(--rot-start)); opacity: 0; }
          8%   { opacity: var(--op); }
          92%  { opacity: var(--op); }
          100% { transform: translateY(105vh) rotate(var(--rot-end)); opacity: 0; }
        }
        @keyframes floatUp {
          0%   { transform: translateY(80px) rotate(var(--rot-start)); opacity: 0; }
          8%   { opacity: var(--op); }
          92%  { opacity: var(--op); }
          100% { transform: translateY(-105vh) rotate(var(--rot-end)); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: var(--op); transform: scale(1) rotate(var(--rot-start)); }
          50%       { opacity: calc(var(--op) * 0.3); transform: scale(0.7) rotate(var(--rot-end)); }
        }
        .bg-particle {
          position: fixed;
          pointer-events: none;
          z-index: 1;
          will-change: transform, opacity;
        }
        .bg-particle svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>

      {particles.map((p) => {
        const animName = isGlam
          ? (p.svgIndex === 1 ? 'twinkle' : 'floatUp')
          : 'floatDown';

        return (
          <div
            key={`${mode}-${p.id}`}
            className="bg-particle"
            style={{
              left: `${p.x}vw`,
              top: isGlam ? `${rand(0, 90)}vh` : '-80px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              color: p.color,
              animation: `${animName} ${p.duration}s ${p.delay}s infinite linear`,
              // CSS custom properties used inside @keyframes
              ['--rot-start' as string]: `${p.rotation}deg`,
              ['--rot-end' as string]: `${p.rotationEnd}deg`,
              ['--op' as string]: String(p.opacity),
            }}
            dangerouslySetInnerHTML={{ __html: svgList[p.svgIndex] }}
          />
        );
      })}
    </>
  );
};
