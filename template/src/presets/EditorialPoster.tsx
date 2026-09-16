import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface EditorialPosterProps {
  kicker?: string;
  figure?: string;
  headline: string[];
  subtext?: string;
  footerLeft?: string;
  footerRight?: string;
  accentColor?: string;
}

export const EditorialPoster: React.FC<EditorialPosterProps> = ({
  kicker = 'BẢN TIN KINH DOANH',
  figure = '52.000 TỶ',
  headline = ['CẢ NGÀNH THỞ OXY', 'RIÊNG VUA BĐS', 'BỎ TÚI KỶ LỤC'],
  subtext = 'Huy động 9%, vay 14-15%, doanh nghiệp chật vật trong khi kỷ lục vẫn được thiết lập.',
  footerLeft = 'THÔNG TIN BẤT ĐỘNG SẢN',
  footerRight = 'VIETNAM FINANCIAL INSIGHT',
  accentColor = '#e63946',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 15, mass: 0.8 } });
  const numScale = spring({ frame: frame - 6, fps, config: { damping: 12, mass: 0.6 } });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '60px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        zIndex: 10,
      }}
    >
      {/* Header kicker */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid rgba(255,255,255,0.15)',
          paddingBottom: '20px',
          opacity: entrance,
        }}
      >
        <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '4px', color: accentColor }}>
          {kicker}
        </span>
        <span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
          SPECIAL REPORT
        </span>
      </div>

      {/* Main Poster Body */}
      <div style={{ margin: 'auto 0' }}>
        {/* Giant Number / Figure */}
        {figure && (
          <div
            style={{
              fontSize: '110px',
              fontWeight: 950,
              lineHeight: 0.9,
              letterSpacing: '-2px',
              color: accentColor,
              transform: `scale(${Math.max(0, numScale)})`,
              transformOrigin: 'left center',
              textShadow: '0 0 35px rgba(230, 57, 70, 0.4)',
              marginBottom: '28px',
            }}
          >
            {figure}
          </div>
        )}

        {/* 3-line Headline with tilt styling */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {headline.map((line, idx) => {
            const lineSpring = spring({ frame: frame - idx * 4, fps, config: { damping: 16 } });
            const isHighlight = idx === 1;
            return (
              <div
                key={idx}
                style={{
                  fontSize: isHighlight ? '58px' : '48px',
                  fontWeight: 900,
                  color: isHighlight ? '#ffffff' : 'rgba(255,255,255,0.85)',
                  backgroundColor: isHighlight ? accentColor : 'transparent',
                  padding: isHighlight ? '6px 20px' : '0',
                  borderRadius: '8px',
                  width: 'fit-content',
                  transform: `translateX(${interpolate(lineSpring, [0, 1], [-50, 0])}px)`,
                  opacity: lineSpring,
                  letterSpacing: '-1px',
                }}
              >
                {line}
              </div>
            );
          })}
        </div>

        {/* Standfirst / Subtext */}
        {subtext && (
          <div
            style={{
              marginTop: '36px',
              fontSize: '28px',
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.8)',
              borderLeft: `4px solid ${accentColor}`,
              paddingLeft: '20px',
              maxWidth: '92%',
              opacity: spring({ frame: frame - 14, fps }),
            }}
          >
            {subtext}
          </div>
        )}
      </div>

      {/* Footer Meta */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '2px solid rgba(255,255,255,0.15)',
          paddingTop: '20px',
          fontSize: '22px',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.5)',
          opacity: entrance,
        }}
      >
        <span>{footerLeft}</span>
        <span style={{ color: accentColor }}>{footerRight}</span>
      </div>
    </div>
  );
};
