import React from 'react';
import { interpolate, useCurrentFrame, staticFile, Video, OffthreadVideo } from 'remotion';

export type BackgroundTheme = 'gold' | 'danger' | 'finance' | 'contrast' | 'dark';

export interface BackgroundProps {
  theme?: BackgroundTheme;
  videoSrc?: string; // Optional real footage (mp4) under public/
  overlayOpacity?: number; // default 0.65 - 0.75 to ensure text readability
  blurAmount?: number; // blur in px, default 10px
  vignette?: boolean;
}

export const CinematicBackground: React.FC<BackgroundProps> = ({
  theme = 'finance',
  videoSrc,
  overlayOpacity = 0.45,
  blurAmount = 4,
  vignette = true,
}) => {
  const frame = useCurrentFrame();

  // Slow organic motion for background camera / atmosphere
  const moveX = Math.sin(frame * 0.015) * 35;
  const moveY = Math.cos(frame * 0.018) * 25;
  const scale = 1.08 + Math.sin(frame * 0.01) * 0.04;
  const scanlineY = (frame * 3.5) % 1920;

  // Grid / chart drift
  const gridPanY = (frame * 1.2) % 80;

  // Color schemes based on scene mood
  const themeColors = {
    gold: {
      accent: 'rgba(234, 179, 8, 0.28)',
      highlight: 'rgba(250, 204, 21, 0.15)',
      base: '#080a0f',
      grid: 'rgba(234, 179, 8, 0.06)',
    },
    danger: {
      accent: 'rgba(239, 68, 68, 0.32)',
      highlight: 'rgba(248, 113, 113, 0.18)',
      base: '#0c0708',
      grid: 'rgba(239, 68, 68, 0.06)',
    },
    finance: {
      accent: 'rgba(56, 189, 248, 0.22)',
      highlight: 'rgba(34, 197, 94, 0.16)',
      base: '#060a12',
      grid: 'rgba(56, 189, 248, 0.05)',
    },
    contrast: {
      accent: 'rgba(34, 197, 94, 0.25)',
      highlight: 'rgba(239, 68, 68, 0.25)',
      base: '#090a0f',
      grid: 'rgba(255, 255, 255, 0.04)',
    },
    dark: {
      accent: 'rgba(148, 163, 184, 0.15)',
      highlight: 'rgba(234, 179, 8, 0.12)',
      base: '#05070a',
      grid: 'rgba(148, 163, 184, 0.04)',
    },
  }[theme];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: themeColors.base,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* 1. Underlying Video footage layer if provided */}
      {videoSrc ? (
        <div
          style={{
            position: 'absolute',
            inset: -40,
            filter: `blur(${blurAmount}px) saturate(1.2)`,
            transform: `translate(${moveX}px, ${moveY}px) scale(${scale})`,
          }}
        >
          <OffthreadVideo
            src={staticFile(videoSrc)}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ) : (
        /* Dynamic SVG Procedural Financial Skyline & Candlestick B-roll when no external video */
        <div
          style={{
            position: 'absolute',
            inset: -60,
            transform: `translate(${moveX * 0.8}px, ${moveY * 0.6}px) scale(${scale})`,
            filter: `blur(${blurAmount * 0.5}px)`,
            opacity: 0.95,
          }}
        >
          {/* Stylized Modern Real Estate Towers / Skyscraper silhouettes */}
          <svg width="1200" height="2040" viewBox="0 0 1200 2040" fill="none" style={{ position: 'absolute', bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="towerGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#475569" stopOpacity="1" />
                <stop offset="50%" stopColor="#1e293b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0a0e17" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="towerGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748b" stopOpacity="1" />
                <stop offset="50%" stopColor="#334155" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="glowLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={themeColors.accent} stopOpacity="0" />
                <stop offset="50%" stopColor={themeColors.accent} stopOpacity="1" />
                <stop offset="100%" stopColor={themeColors.accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Background towers */}
            <rect x="40" y="550" width="220" height="1490" fill="url(#towerGrad1)" rx="10" stroke="rgba(255,255,255,0.12)" />
            <rect x="280" y="380" width="260" height="1660" fill="url(#towerGrad2)" rx="12" stroke="rgba(255,255,255,0.14)" />
            <rect x="560" y="240" width="290" height="1800" fill="url(#towerGrad1)" rx="14" stroke="rgba(255,255,255,0.18)" />
            <rect x="870" y="480" width="240" height="1560" fill="url(#towerGrad2)" rx="10" stroke="rgba(255,255,255,0.12)" />

            {/* Glowing architectural spines / edge highlights */}
            <line x1="560" y1="240" x2="560" y2="2040" stroke="url(#glowLine)" strokeWidth="6" />
            <line x1="850" y1="240" x2="850" y2="2040" stroke="url(#glowLine)" strokeWidth="5" />
            <line x1="280" y1="380" x2="280" y2="2040" stroke="url(#glowLine)" strokeWidth="5" />

            {/* Matrix of window grids glowing */}
            {Array.from({ length: 22 }).map((_, i) => (
              <line
                key={i}
                x1="580"
                y1={320 + i * 75}
                x2="830"
                y2={320 + i * 75}
                stroke={i % 3 === 0 ? "rgba(250, 204, 21, 0.45)" : "rgba(255, 255, 255, 0.28)"}
                strokeDasharray="16 20"
                strokeWidth="7"
              />
            ))}
            {Array.from({ length: 18 }).map((_, i) => (
              <line
                key={'w' + i}
                x1="300"
                y1={460 + i * 80}
                x2="520"
                y2={460 + i * 80}
                stroke={i % 2 === 0 ? "rgba(56, 189, 248, 0.4)" : "rgba(255, 255, 255, 0.22)"}
                strokeDasharray="14 18"
                strokeWidth="6"
              />
            ))}
          </svg>

          {/* Glowing Financial Candlestick / Stock trend lines in midground */}
          <svg width="1200" height="1920" style={{ position: 'absolute', top: 300, left: 0 }}>
            <path
              d={`M 0 ${900 + Math.sin(frame * 0.03) * 60} Q 300 ${750 - Math.cos(frame * 0.04) * 80}, 600 ${820 + Math.sin(frame * 0.02) * 50} T 1200 ${650}`}
              fill="none"
              stroke={themeColors.accent}
              strokeWidth="6"
              strokeOpacity="0.7"
              filter="drop-shadow(0 0 15px rgba(234, 179, 8, 0.5))"
            />
          </svg>
        </div>
      )}

      {/* 2. Moving Tech / Real-Estate Floor Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to bottom, ${themeColors.grid} 1px, transparent 1px), linear-gradient(to right, ${themeColors.grid} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          backgroundPosition: `0px ${gridPanY}px`,
          opacity: 0.6,
        }}
      />

      {/* 3. Floating Light Orbs (Glow atmosphere) */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${themeColors.accent} 0%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(70px)',
          transform: `translate(${moveX * 1.5}px, ${moveY * 1.2}px)`,
          opacity: 0.85,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${themeColors.highlight} 0%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(80px)',
          transform: `translate(${-moveX * 1.2}px, ${-moveY * 1.5}px)`,
          opacity: 0.75,
        }}
      />

      {/* 4. Scanning Light Ray / Sweep (Financial radar feeling) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: scanlineY,
          height: 3,
          background: 'linear-gradient(90deg, transparent 0%, rgba(250, 204, 21, 0.6) 50%, transparent 100%)',
          boxShadow: '0 0 25px rgba(250, 204, 21, 0.8)',
          pointerEvents: 'none',
        }}
      />

      {/* 5. Center Focused Dark Scrim - Only darkens the text reading zone in the middle, leaving towers glowing at sides/bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 48%, rgba(8, 11, 18, 0.82) 0%, rgba(8, 11, 18, 0.5) 60%, rgba(8, 11, 18, 0.3) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 6. Cinematic Vignette (Góc tối điện ảnh để tập trung ánh nhìn vào giữa) */}
      {vignette && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.8) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
