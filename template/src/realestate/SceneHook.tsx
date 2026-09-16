import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface SceneHookProps {
  badgeText?: string;
  headline?: React.ReactNode;
  figure?: string;
  figureSub?: string;
  contextWarning?: string;
}

export const SceneHook: React.FC<SceneHookProps> = ({
  badgeText = '🚨 SỐC TOÀN NGÀNH BĐS',
  headline = (
    <>
      CẢ MẠNG THEO &quot;VUA QUẠT&quot;...<br />
      CÒN <span style={{ color: '#eab308', textShadow: '0 0 25px rgba(234, 179, 8, 0.6)' }}>ÔNG VUA NÀY</span> BỎ TÚI
    </>
  ),
  figure = '52.000 TỶ',
  figureSub = 'CHỈ TRONG 6 THÁNG ĐẦU NĂM',
  contextWarning = '⚠️ GIỮA LÚC TOÀN NGÀNH "THỞ OXY"',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const punchScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.8 },
  });

  const numberScale = spring({
    frame: frame - 18,
    fps,
    config: { damping: 10, stiffness: 260, mass: 0.7 },
  });

  const glowOpacity = interpolate(
    Math.sin(frame * 0.25),
    [-1, 1],
    [0.4, 0.95]
  );

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
      {/* Dynamic Animated Financial Real Estate Skyline & Depth */}
      <CinematicBackground theme="gold" overlayOpacity={0.65} blurAmount={8} />

      {/* Content wrapper with zIndex to stay crystal clear */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.25)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid #ef4444',
            borderRadius: 999,
            padding: '12px 36px',
            color: '#fca5a5',
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: 2,
            marginBottom: 40,
            boxShadow: '0 8px 30px rgba(239, 68, 68, 0.35)',
            transform: `scale(${Math.max(0, punchScale)})`,
          }}
        >
          {badgeText}
        </div>

        {/* Main Hook Header */}
        <h2
          style={{
            color: '#f8fafc',
            fontSize: 54,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.3,
            margin: 0,
            marginBottom: 30,
            maxWidth: 960,
            textShadow: '0 4px 25px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)',
          }}
        >
          {headline}
        </h2>

        {/* Massive Giant Numbers */}
        <div
          style={{
            transform: `scale(${Math.max(0, numberScale)})`,
            background: 'linear-gradient(135deg, #ffffff 0%, #fef08a 35%, #eab308 70%, #ca8a04 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: 114,
            fontWeight: 1000,
            textAlign: 'center',
            lineHeight: 1.05,
            letterSpacing: -2,
            filter: `drop-shadow(0 0 40px rgba(234, 179, 8, ${glowOpacity})) drop-shadow(0 8px 30px rgba(0,0,0,0.9))`,
            margin: '20px 0',
          }}
        >
          {figure}
        </div>

        {/* Tag bottom */}
        <div
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: 22,
            padding: '20px 45px',
            color: '#cbd5e1',
            fontSize: 38,
            fontWeight: 800,
            marginTop: 20,
            boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
          }}
        >
          {figureSub}
        </div>
      </div>

      {/* Sub Context Pill at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          zIndex: 10,
          color: '#f87171',
          fontSize: 34,
          fontWeight: 800,
          backgroundColor: 'rgba(12, 10, 15, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '16px 36px',
          borderRadius: 20,
          border: '1.5px solid rgba(239, 68, 68, 0.45)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
        }}
      >
        {contextWarning}
      </div>
    </div>
  );
};
