import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface SceneTwistProps {
  warningTag?: string;
  headline?: React.ReactNode;
  boxSubtitle?: string;
  boxHighlight?: string;
  boxContent?: string;
}

export const SceneTwist: React.FC<SceneTwistProps> = ({
  warningTag = 'NHƯNG KHOAN SƯỚNG VỘI!',
  headline = (
    <>
      MỌI TIN TỐT 3 QUÝ QUA<br />
      ĐÃ <span style={{ color: '#ef4444', textShadow: '0 0 25px rgba(239, 68, 68, 0.7)' }}>HIỂN THỊ HẾT VÀO GIÁ!</span>
    </>
  ),
  boxSubtitle = 'CON SỐ +350% VỪA LÀ THÀNH TÍCH...',
  boxHighlight = 'NHƯNG CŨNG LÀ "TRẦN KỲ VỌNG"!',
  boxContent = 'Dòng tiền thông minh bắt đầu tìm lối thoát. Đừng quá kỳ vọng để rồi đu đỉnh ở chu kỳ này!',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const warningPulse = Math.sin(frame * 0.2) > 0 ? 1 : 0.45;
  const alertScale = spring({ frame: frame - 10, fps, config: { damping: 12 } });

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background dark mysterious atmosphere */}
      <CinematicBackground theme="dark" overlayOpacity={0.65} blurAmount={12} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Warning symbol */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            backgroundColor: 'rgba(234, 179, 8, 0.2)',
            backdropFilter: 'blur(16px)',
            border: '3px solid #eab308',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 70,
            marginBottom: 35,
            opacity: warningPulse,
            boxShadow: '0 0 45px rgba(234, 179, 8, 0.5)',
          }}
        >
          ⚠️
        </div>

        <div
          style={{
            color: '#facc15',
            fontSize: 38,
            fontWeight: 900,
            letterSpacing: 4,
            marginBottom: 20,
            textShadow: '0 0 20px rgba(250, 204, 21, 0.6)',
          }}
        >
          {warningTag}
        </div>

        <h2
          style={{
            color: '#ffffff',
            fontSize: 56,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.3,
            margin: 0,
            marginBottom: 40,
            maxWidth: 920,
            textShadow: '0 4px 20px rgba(0,0,0,0.95)',
          }}
        >
          {headline}
        </h2>

        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(17, 24, 39, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(75, 85, 99, 0.6)',
            borderRadius: 24,
            padding: '36px 40px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.8)',
            transform: `scale(${Math.max(0, alertScale)})`,
          }}
        >
          <div style={{ color: '#cbd5e1', fontSize: 32, fontWeight: 700, marginBottom: 15 }}>
            {boxSubtitle}
          </div>
          <div style={{ color: '#f87171', fontSize: 44, fontWeight: 900, marginBottom: 20 }}>
            {boxHighlight}
          </div>
          <p style={{ color: '#e2e8f0', fontSize: 32, lineHeight: 1.5, margin: 0 }}>
            {boxContent}
          </p>
        </div>
      </div>
    </div>
  );
};
