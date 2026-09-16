import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface OneSideCardProps {
  flag: string;
  entityName: string;
  verdict: string;
  verdictColor: string;
  bulletPoints: string[];
  sideLabel: string;
}

export const OneSideCard: React.FC<OneSideCardProps> = ({
  flag,
  entityName,
  verdict,
  verdictColor = '#2563eb',
  bulletPoints = [],
  sideLabel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const cardSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 13, stiffness: 170 },
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#05070d',
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
      {/* TẦNG 1 & 2: FOOTAGE NỀN TÀU CHIẾN ĐỐI ĐẦU + TINT THEO PHÍA (USA XANH / IRAN XANH LÁ) */}
      <CinematicBackground
        imageSrc="images/news/scene4.jpg"
        scrimOpacity={0.62}
        tintColor={`${verdictColor}33`}
        zoomDirection={flag === '🇺🇸' ? 'in' : 'out'}
      />

      {/* Top Label Tag */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#94a3b8',
          fontSize: '20px',
          fontWeight: 800,
          letterSpacing: '4px',
          padding: '8px 24px',
          borderRadius: '999px',
          marginBottom: '35px',
          textTransform: 'uppercase',
        }}
      >
        {sideLabel}
      </div>

      {/* Main Analysis Card Container */}
      <div
        style={{
          transform: `scale(${Math.max(0, cardSpring)})`,
          width: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: `2px solid ${verdictColor}66`,
          borderRadius: '24px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: `0 20px 50px rgba(0,0,0,0.7), 0 0 30px ${verdictColor}33`,
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Flag Badge + Entity Name */}
        <div
          style={{
            backgroundColor: `${verdictColor}33`,
            border: `2px solid ${verdictColor}`,
            color: '#ffffff',
            fontSize: '32px',
            fontWeight: 900,
            padding: '10px 28px',
            borderRadius: '16px',
            marginBottom: '15px',
            letterSpacing: '2px',
          }}
        >
          {flag === '🇺🇸' ? '🇺🇸 USA' : '🇮🇷 IRAN'}
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: '52px',
            fontWeight: 950,
            letterSpacing: '3px',
            marginBottom: '25px',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          {entityName}
        </div>

        {/* Verdict Banner */}
        <div
          style={{
            backgroundColor: verdictColor,
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 900,
            letterSpacing: '2px',
            padding: '12px 28px',
            borderRadius: '12px',
            textTransform: 'uppercase',
            marginBottom: '35px',
            textAlign: 'center',
            boxShadow: `0 0 20px ${verdictColor}88`,
          }}
        >
          {verdict}
        </div>

        {/* Bullet Points */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {bulletPoints.map((pt, idx) => {
            const ptOpacity = interpolate(frame, [20 + idx * 18, 35 + idx * 18], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const ptX = interpolate(frame, [20 + idx * 18, 35 + idx * 18], [-30, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={idx}
                style={{
                  opacity: ptOpacity,
                  transform: `translateX(${ptX}px)`,
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  borderLeft: `4px solid ${verdictColor}`,
                  borderRadius: '8px',
                  padding: '14px 18px',
                  color: '#e2e8f0',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                }}
              >
                {pt}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
