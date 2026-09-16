import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface StatItem {
  value: number;
  unit: string;
  label: string;
  sublabel: string;
}

interface StatRevealPanelProps {
  badgeTitle: string;
  stats: StatItem[];
  warningLine: string;
}

export const StatRevealPanel: React.FC<StatRevealPanelProps> = ({
  badgeTitle,
  stats = [],
  warningLine,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#070505',
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
      {/* TẦNG 1 & 2: FOOTAGE NỀN SIÊU TÀU CHỞ DẦU HORMUZ + TINT CAM RỰC LỬA */}
      <CinematicBackground
        imageSrc="images/news/scene5.jpg"
        scrimOpacity={0.58}
        tintColor="rgba(234, 88, 12, 0.22)"
        zoomDirection="in"
      />

      {/* Header Tag */}
      <div
        style={{
          backgroundColor: 'rgba(234, 88, 12, 0.2)',
          border: '1px solid rgba(234, 88, 12, 0.6)',
          color: '#fb923c',
          fontSize: '22px',
          fontWeight: 800,
          letterSpacing: '3px',
          padding: '10px 28px',
          borderRadius: '999px',
          marginBottom: '40px',
          textTransform: 'uppercase',
        }}
      >
        {badgeTitle}
      </div>

      {/* Two Metric Cards */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '40px' }}>
        {stats.map((item, idx) => {
          const delay = 15 + idx * 35;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 180 },
          });

          // Number counter roll interpolation
          const countProgress = interpolate(frame, [delay, delay + 45], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const displayNum = Math.round(countProgress * item.value);

          return (
            <div
              key={idx}
              style={{
                transform: `scale(${Math.max(0, cardSpring)})`,
                backgroundColor: 'rgba(23, 17, 13, 0.85)',
                border: '2px solid rgba(249, 115, 22, 0.35)',
                borderLeft: '8px solid #f97316',
                borderRadius: '20px',
                padding: '28px 30px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '72px', fontWeight: 950, color: '#ffedd5', lineHeight: 1 }}>
                  {displayNum}
                </span>
                <span style={{ fontSize: '36px', fontWeight: 900, color: '#f97316' }}>
                  {item.unit}
                </span>
              </div>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', letterSpacing: '1px', marginBottom: '6px' }}>
                {item.label}
              </span>
              <span style={{ fontSize: '18px', color: '#9ca3af', fontWeight: 500 }}>
                {item.sublabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* Warning Footer */}
      <div
        style={{
          opacity: interpolate(frame, [80, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          color: '#f87171',
          fontSize: '26px',
          fontWeight: 800,
          letterSpacing: '2px',
          textAlign: 'center',
          backgroundColor: 'rgba(220, 38, 38, 0.15)',
          border: '1px dashed rgba(239, 68, 68, 0.5)',
          padding: '16px 28px',
          borderRadius: '16px',
          width: '100%',
        }}
      >
        {warningLine}
      </div>
    </div>
  );
};
