import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface NewsHookBannerProps {
  badgeText: string;
  headline: string;
  subline: string;
  tagAlert: string;
}

export const NewsHookBanner: React.FC<NewsHookBannerProps> = ({
  badgeText,
  headline,
  subline,
  tagAlert,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame 0-10: Riser sound, Badge flies in
  const badgeScale = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 220 },
  });

  // Frame 15 (0.5s): Exactly at impact-cine-big SFX -> Slam entrance for main title!
  const titleSlam = spring({
    frame: frame - 15,
    fps,
    config: { damping: 9, mass: 0.9, stiffness: 240 },
  });

  // Shockwave ring expansion precisely at frame 15 (0.5s)
  const ringScale = interpolate(frame, [15, 36], [0.1, 2.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ringOpacity = interpolate(frame, [15, 24, 36], [1, 0.7, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Frame 24 (0.8s): Voice starts "Mỹ xối tên lửa..." -> Subline and tagAlert reveal!
  const sublineOpacity = interpolate(frame, [24, 34], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sublineY = interpolate(frame, [24, 34], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const alertOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const alertY = interpolate(frame, [30, 42], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Camera subtle zoom-in
  const cameraScale = interpolate(frame, [0, 240], [1, 1.05], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Military Slam Screen Shake: Rung chấn động tại frame 15 (0.5s) khi tên lửa nổ
  const shakeElapsed = frame - 15;
  const shakeOffset =
    shakeElapsed >= 0 && shakeElapsed <= 14
      ? Math.sin(shakeElapsed * 1.7) * Math.exp(-shakeElapsed * 0.28) * 14
      : 0;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#050507',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        position: 'relative',
        overflow: 'hidden',
        transform: `scale(${cameraScale}) translate(${shakeOffset}px, ${shakeOffset * 0.6}px)`,
      }}
    >
      {/* TẦNG 1 & 2: FOOTAGE NỀN TÊN LỬA + HIỆU ỨNG ĐIỆN ẢNH */}
      <CinematicBackground
        imageSrc="images/news/scene1.jpg"
        scrimOpacity={0.48}
        tintColor="rgba(220, 38, 38, 0.25)"
        zoomDirection="in"
      />

      {/* Shockwave circle */}
      {frame >= 15 && frame <= 40 && (
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            border: '6px solid rgba(239, 68, 68, 0.8)',
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 1. Breaking Badge */}
      <div
        style={{
          transform: `scale(${Math.max(0, badgeScale)})`,
          backgroundColor: '#dc2626',
          color: '#ffffff',
          fontWeight: 900,
          fontSize: '28px',
          letterSpacing: '4px',
          padding: '12px 32px',
          borderRadius: '999px',
          boxShadow: '0 0 30px rgba(220, 38, 38, 0.8)',
          marginBottom: '40px',
          textTransform: 'uppercase',
          zIndex: 2,
        }}
      >
        {badgeText}
      </div>

      {/* 2. Main Title (Slam Entrance) */}
      <div
        style={{
          transform: `scale(${Math.max(0, titleSlam)})`,
          color: '#ffffff',
          fontSize: '78px',
          fontWeight: 950,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1.15,
          textAlign: 'center',
          textTransform: 'uppercase',
          textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 50px rgba(220,38,38,0.7)',
          whiteSpace: 'pre-line',
          marginBottom: '35px',
          zIndex: 2,
        }}
      >
        {headline}
      </div>

      {/* 3. Subline Location */}
      <div
        style={{
          opacity: sublineOpacity,
          transform: `translateY(${sublineY}px)`,
          color: '#ffffff',
          fontSize: '28px',
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '3px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '12px 30px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          marginBottom: '30px',
          zIndex: 2,
        }}
      >
        {subline}
      </div>

      {/* 4. Tag Alert Warning */}
      <div
        style={{
          opacity: alertOpacity,
          transform: `translateY(${alertY}px)`,
          backgroundColor: 'rgba(220, 38, 38, 0.25)',
          border: '2px solid rgba(239, 68, 68, 0.8)',
          color: '#ffffff',
          fontSize: '30px',
          fontWeight: 900,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '14px 28px',
          borderRadius: '16px',
          letterSpacing: '2px',
          boxShadow: '0 0 25px rgba(220,38,38,0.3)',
          zIndex: 2,
        }}
      >
        ⚠️ {tagAlert}
      </div>
    </div>
  );
};
