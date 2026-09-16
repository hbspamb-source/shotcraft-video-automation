import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface SceneCTAProps {
  badgeTitle?: string;
  headline?: React.ReactNode;
  buttonText?: string;
  bannerNote?: string;
  loopText?: string;
}

export const SceneCTA: React.FC<SceneCTAProps> = ({
  badgeTitle = '🤫 TIẾT LỘ NẰM Ở PHẦN 2',
  headline = (
    <>
      CÓ 1 NHÓM ĐANG ÂM THẦM<br />
      <span style={{ color: '#eab308', textShadow: '0 0 25px rgba(234, 179, 8, 0.6)' }}>GOM HÀNG KHỦNG</span><br />
      MÀ CẢ LÀNG CHƯA NHẬN RA!
    </>
  ),
  buttonText = '👉 BẤM FOLLOW NGAY!',
  bannerNote = '⏰ ĐÚNG 8H TỐI MAI TÔI BÓC TRẦN!',
  loopText = '🔄 (Loop: Nối thẳng câu mở đầu "Trong khi cả mạng...")',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buttonPop = spring({ frame: frame - 15, fps, config: { damping: 10, stiffness: 220 } });
  const pulseScale = interpolate(Math.sin(frame * 0.2), [-1, 1], [1, 1.05]);

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
      {/* Background with gold & blue mystery theme */}
      <CinematicBackground theme="gold" overlayOpacity={0.65} blurAmount={10} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            backgroundColor: 'rgba(14, 165, 233, 0.2)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid #38bdf8',
            padding: '10px 30px',
            borderRadius: 999,
            color: '#7dd3fc',
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: 2,
            marginBottom: 25,
          }}
        >
          {badgeTitle}
        </div>

        <h2
          style={{
            color: '#ffffff',
            fontSize: 54,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.3,
            margin: 0,
            marginBottom: 40,
            textShadow: '0 4px 25px rgba(0,0,0,0.95)',
          }}
        >
          {headline}
        </h2>

        {/* Follow Button */}
        <div
          style={{
            transform: `scale(${Math.max(0, buttonPop) * pulseScale})`,
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            borderRadius: 999,
            padding: '24px 72px',
            color: '#ffffff',
            fontSize: 48,
            fontWeight: 1000,
            letterSpacing: 2,
            boxShadow: '0 0 50px rgba(239, 68, 68, 0.75)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 40,
          }}
        >
          {buttonText}
        </div>

        <div
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(234, 179, 8, 0.6)',
            borderRadius: 20,
            padding: '20px 40px',
            color: '#facc15',
            fontSize: 34,
            fontWeight: 800,
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          }}
        >
          {bannerNote}
        </div>
      </div>

      {/* Loop connector tag */}
      <div
        style={{
          position: 'absolute',
          bottom: 75,
          zIndex: 10,
          color: '#94a3b8',
          fontSize: 26,
          fontWeight: 600,
        }}
      >
        {loopText}
      </div>
    </div>
  );
};
