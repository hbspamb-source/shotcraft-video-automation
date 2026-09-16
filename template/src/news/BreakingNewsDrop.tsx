import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface BreakingNewsDropProps {
  dropWord: string;
  dropSub: string;
  alertText: string;
  closingLine: string;
}

export const BreakingNewsDrop: React.FC<BreakingNewsDropProps> = ({
  dropWord,
  dropSub,
  alertText,
  closingLine,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dramatic Blackout for first 25 frames (0.8s)
  const isBlackout = frame < 25;

  // Drop animation triggers at frame 28
  const dropSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 9, mass: 1.2, stiffness: 220 },
  });

  // Shockwave ring
  const ringScale = interpolate(frame, [28, 55], [0.1, 3.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ringOpacity = interpolate(frame, [28, 40, 55], [1, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Subtitle entry
  const subOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const closeOpacity = interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  if (isBlackout) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ color: '#ef4444', fontSize: '24px', fontWeight: 900, letterSpacing: '4px', opacity: 0.6 }}>
          ⚡ BÁO ĐỘNG KHẨN CẤP...
        </div>
      </div>
    );
  }

  // Beat Drop Screen Shake: Rung chấn động cực mạnh tại frame 28 (sau blackout 1s)
  const dropElapsed = frame - 28;
  const dropShake =
    dropElapsed >= 0 && dropElapsed <= 16
      ? Math.sin(dropElapsed * 1.8) * Math.exp(-dropElapsed * 0.24) * 16
      : 0;

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
        padding: '60px 40px',
        position: 'relative',
        overflow: 'hidden',
        transform: `translate(${dropShake}px, ${dropShake * 0.5}px)`,
      }}
    >
      {/* TẦNG 1 & 2: FOOTAGE NỀN TÀU BỐC CHÁY + TINT ĐỎ CUỒN CUỘN */}
      <CinematicBackground
        imageSrc="images/news/scene3.jpg"
        scrimOpacity={0.55}
        tintColor="rgba(220, 38, 38, 0.3)"
        zoomDirection="in"
      />

      {/* Massive Shockwave */}
      {frame >= 28 && frame <= 60 && (
        <div
          style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            border: '8px solid rgba(239, 68, 68, 0.9)',
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Giant Drop Headline */}
      <div
        style={{
          transform: `scale(${Math.max(0, dropSpring)})`,
          color: '#ffffff',
          fontSize: '92px',
          fontWeight: 950,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          textAlign: 'center',
          textShadow: '0 0 50px rgba(220, 38, 38, 0.95), 0 4px 25px #000',
          marginBottom: '25px',
          zIndex: 2,
        }}
      >
        {dropWord}
      </div>

      {/* Drop Subtitle */}
      <div
        style={{
          transform: `scale(${Math.max(0, dropSpring)})`,
          backgroundColor: '#dc2626',
          color: '#ffffff',
          fontSize: '38px',
          fontWeight: 950,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '4px',
          padding: '16px 42px',
          borderRadius: '16px',
          textTransform: 'uppercase',
          boxShadow: '0 0 40px rgba(220, 38, 38, 0.85)',
          marginBottom: '50px',
          zIndex: 2,
        }}
      >
        {dropSub}
      </div>

      {/* Alert Tag Card */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${interpolate(subOpacity, [0, 1], [30, 0])}px)`,
          backgroundColor: 'rgba(220, 38, 38, 0.22)',
          border: '2px solid rgba(239, 68, 68, 0.8)',
          borderRadius: '16px',
          padding: '20px 36px',
          color: '#ffffff',
          fontSize: '30px',
          fontWeight: 900,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '2px',
          marginBottom: '35px',
          backdropFilter: 'blur(12px)',
          zIndex: 2,
        }}
      >
        {alertText}
      </div>

      {/* Closing Line */}
      <div
        style={{
          opacity: closeOpacity,
          color: '#cbd5e1',
          fontSize: '28px',
          fontWeight: 700,
          letterSpacing: '2px',
          textAlign: 'center',
          maxWidth: '85%',
          lineHeight: 1.4,
          zIndex: 2,
        }}
      >
        🔥 {closingLine}
      </div>
    </div>
  );
};
