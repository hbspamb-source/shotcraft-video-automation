import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SwissStatHeroProps {
  category?: string;
  heroStat: string;
  statLabel: string;
  description?: string;
  accentColor?: string;
}

export const SwissStatHero: React.FC<SwissStatHeroProps> = ({
  category = 'TĂNG TRƯỞNG & DÒNG TIỀN',
  heroStat = '134.205 TỶ',
  statLabel = 'TỔNG DOANH THU & HOẠT ĐỘNG TÀI CHÍNH',
  description = 'Trong đó doanh thu hợp nhất 6 tháng đạt 116.565 tỷ, riêng quý 2 đóng góp 34.732 tỷ đồng.',
  accentColor = '#00f5d4',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 15 } });
  const statGrow = spring({ frame: frame - 4, fps, config: { damping: 13, mass: 0.7 } });

  // Floating ambient background anchor
  const anchorX = interpolate(frame, [0, 90], [0, 20]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '70px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* Background oversized anchor text bleed */}
      <div
        style={{
          position: 'absolute',
          right: '-40px',
          top: '30%',
          fontSize: '320px',
          fontWeight: 950,
          color: 'rgba(255,255,255,0.03)',
          letterSpacing: '-10px',
          userSelect: 'none',
          pointerEvents: 'none',
          transform: `translateX(${anchorX}px)`,
        }}
      >
        VHM
      </div>

      {/* Header Tag */}
      <div style={{ opacity: entrance }}>
        <span
          style={{
            display: 'inline-block',
            padding: '8px 18px',
            backgroundColor: 'rgba(0, 245, 212, 0.12)',
            border: `1px solid ${accentColor}`,
            borderRadius: '40px',
            color: accentColor,
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '2px',
          }}
        >
          {category}
        </span>
      </div>

      {/* Central Hero Stats */}
      <div style={{ zIndex: 2 }}>
        <div
          style={{
            fontSize: '100px',
            fontWeight: 950,
            lineHeight: 1,
            color: '#ffffff',
            letterSpacing: '-2px',
            transform: `scale(${Math.max(0, statGrow)})`,
            transformOrigin: 'left bottom',
            textShadow: `0 0 40px ${accentColor}66`,
          }}
        >
          {heroStat}
        </div>

        <div
          style={{
            marginTop: '16px',
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '3px',
            color: accentColor,
            textTransform: 'uppercase',
            opacity: entrance,
          }}
        >
          {statLabel}
        </div>

        {description && (
          <div
            style={{
              marginTop: '28px',
              fontSize: '28px',
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '90%',
              opacity: spring({ frame: frame - 10, fps }),
            }}
          >
            {description}
          </div>
        )}
      </div>

      {/* Data bar progression graphic */}
      <div style={{ zIndex: 2, opacity: entrance }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Tỷ trọng hoàn thành</span>
          <span style={{ fontSize: '18px', color: accentColor, fontWeight: 800 }}>88.4%</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${Math.min(100, frame * 2.5)}%`,
              height: '100%',
              backgroundColor: accentColor,
              boxShadow: `0 0 12px ${accentColor}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
