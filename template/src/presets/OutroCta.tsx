import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface OutroCtaProps {
  channelName?: string;
  ctaText?: string;
  subtext?: string;
  accentColor?: string;
}

export const OutroCta: React.FC<OutroCtaProps> = ({
  channelName = 'TÀI CHÍNH & ĐẦU TƯ',
  ctaText = 'BẤM THEO DÕI ĐỂ KHÔNG BỎ LỠ',
  subtext = 'Phân tích số liệu & cơ hội BĐS mỗi ngày',
  accentColor = '#e63946',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  const pulse = Math.sin(frame / 6) * 0.05 + 1;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '70px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50px',
          backgroundColor: accentColor,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '44px',
          marginBottom: '30px',
          boxShadow: `0 0 40px ${accentColor}88`,
          transform: `scale(${entrance * pulse})`,
        }}
      >
        🔔
      </div>

      <div
        style={{
          fontSize: '34px',
          fontWeight: 900,
          letterSpacing: '2px',
          color: '#ffffff',
          marginBottom: '16px',
          opacity: entrance,
        }}
      >
        {ctaText}
      </div>

      <div
        style={{
          fontSize: '52px',
          fontWeight: 950,
          color: accentColor,
          letterSpacing: '-1px',
          marginBottom: '20px',
          transform: `scale(${Math.max(0, entrance)})`,
        }}
      >
        {channelName}
      </div>

      <div
        style={{
          fontSize: '24px',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '80%',
          lineHeight: 1.4,
          opacity: spring({ frame: frame - 10, fps }),
        }}
      >
        {subtext}
      </div>
    </div>
  );
};
