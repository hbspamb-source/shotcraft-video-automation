import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface CtaUrgentOutroProps {
  teaser: string;
  questions: string[];
  ctaText: string;
  ctaSub: string;
}

export const CtaUrgentOutro: React.FC<CtaUrgentOutroProps> = ({
  teaser,
  questions = [],
  ctaText,
  ctaSub,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entry
  const teaserOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // CTA Button pulse spring
  const buttonSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 8, mass: 0.8, stiffness: 200 },
  });

  // Pulse effect after entry
  const pulseScale = frame > 75 ? 1 + Math.sin(frame * 0.3) * 0.04 : 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#070509',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '70px 45px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* TẦNG 1 & 2: FOOTAGE NỀN TỐI HUNG BẠO + HIỆU ỨNG TINT ĐỎ */}
      <CinematicBackground
        imageSrc="images/news/scene1.jpg"
        scrimOpacity={0.68}
        tintColor="rgba(220, 38, 38, 0.28)"
        zoomDirection="out"
      />

      {/* Part 2 Teaser Header */}
      <div
        style={{
          opacity: teaserOpacity,
          color: '#f87171',
          fontSize: '36px',
          fontWeight: 950,
          letterSpacing: '4px',
          marginBottom: '40px',
          textTransform: 'uppercase',
          textAlign: 'center',
          textShadow: '0 0 20px rgba(220,38,38,0.6)',
        }}
      >
        {teaser}
      </div>

      {/* Three Burning Questions */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '60px' }}>
        {questions.map((q, idx) => {
          const qOpacity = interpolate(frame, [15 + idx * 15, 28 + idx * 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const qY = interpolate(frame, [15 + idx * 15, 28 + idx * 15], [20, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={idx}
              style={{
                opacity: qOpacity,
                transform: `translateY(${qY}px)`,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderLeft: '6px solid #dc2626',
                borderRadius: '16px',
                padding: '22px 26px',
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: 800,
                letterSpacing: '1px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              {q}
            </div>
          );
        })}
      </div>

      {/* Primary Follow Button */}
      <div
        style={{
          transform: `scale(${Math.max(0, buttonSpring) * pulseScale})`,
          backgroundColor: '#dc2626',
          color: '#ffffff',
          fontSize: '40px',
          fontWeight: 950,
          letterSpacing: '3px',
          padding: '24px 60px',
          borderRadius: '999px',
          textTransform: 'uppercase',
          boxShadow: '0 0 50px rgba(220, 38, 38, 0.95), 0 10px 30px rgba(0,0,0,0.6)',
          marginBottom: '30px',
          cursor: 'pointer',
        }}
      >
        {ctaText}
      </div>

      {/* Subtext info */}
      <div
        style={{
          opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          color: '#cbd5e1',
          fontSize: '24px',
          fontWeight: 800,
          letterSpacing: '2px',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        {ctaSub}
      </div>
    </div>
  );
};
