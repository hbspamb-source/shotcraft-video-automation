import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface HudLine {
  label: string;
  value: string;
}

interface HUDRadarScreenProps {
  scanTitle: string;
  hudLines: HudLine[];
  accentColor: string;
}

export const HUDRadarScreen: React.FC<HUDRadarScreenProps> = ({
  scanTitle,
  hudLines,
  accentColor = '#ef4444',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Radar sweep angle
  const sweepAngle = (frame * 5) % 360;

  // Header spring
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#04070c',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 45px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* TẦNG 1 & 2: BẢN ĐỒ VỆ TINH EO BIỂN HORMUZ + MILITARY OVERLAY */}
      <CinematicBackground
        imageSrc="images/news/scene2.jpg"
        scrimOpacity={0.65}
        tintColor="rgba(14, 165, 233, 0.2)"
        zoomDirection="out"
      />

      {/* Military Reticle Corners */}
      <div style={{ position: 'absolute', top: 30, left: 30, width: 35, height: 35, borderTop: `4px solid ${accentColor}`, borderLeft: `4px solid ${accentColor}` }} />
      <div style={{ position: 'absolute', top: 30, right: 30, width: 35, height: 35, borderTop: `4px solid ${accentColor}`, borderRight: `4px solid ${accentColor}` }} />
      <div style={{ position: 'absolute', bottom: 30, left: 30, width: 35, height: 35, borderBottom: `4px solid ${accentColor}`, borderLeft: `4px solid ${accentColor}` }} />
      <div style={{ position: 'absolute', bottom: 30, right: 30, width: 35, height: 35, borderBottom: `4px solid ${accentColor}`, borderRight: `4px solid ${accentColor}` }} />

      {/* Radar Target Graphic */}
      <div
        style={{
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          border: `2px dashed rgba(239, 68, 68, 0.4)`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '50px',
          marginTop: '20px',
        }}
      >
        <div style={{ width: '180px', height: '180px', borderRadius: '50%', border: '1px solid rgba(239, 68, 68, 0.3)' }} />
        <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: 'rgba(239, 68, 68, 0.3)' }} />
        <div style={{ position: 'absolute', height: '100%', width: '1px', backgroundColor: 'rgba(239, 68, 68, 0.3)' }} />

        {/* Sweep line */}
        <div
          style={{
            position: 'absolute',
            width: '50%',
            height: '2px',
            top: '50%',
            left: '50%',
            transformOrigin: '0% 0%',
            transform: `rotate(${sweepAngle}deg)`,
            background: `linear-gradient(to right, ${accentColor}, transparent)`,
            boxShadow: `0 0 15px ${accentColor}`,
          }}
        />

        {/* Target blips */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '60%',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            boxShadow: '0 0 12px #ef4444',
            animation: 'pulse 1s infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '42%',
            left: '68%',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            boxShadow: '0 0 12px #ef4444',
          }}
        />
      </div>

      {/* Header title */}
      <div
        style={{
          opacity: headerOpacity,
          color: accentColor,
          fontSize: '28px',
          fontWeight: 800,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: `2px solid rgba(239, 68, 68, 0.3)`,
          paddingBottom: '12px',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {scanTitle}
      </div>

      {/* HUD Data Cards (Staggered Entrance) */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {hudLines.map((line, idx) => {
          const delay = 15 + idx * 25;
          const lineSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 180 },
          });

          return (
            <div
              key={idx}
              style={{
                transform: `translateX(${interpolate(lineSpring, [0, 1], [-80, 0])}px)`,
                opacity: interpolate(lineSpring, [0, 1], [0, 1]),
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderLeft: `6px solid ${accentColor}`,
                borderRadius: '12px',
                padding: '18px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 700, letterSpacing: '2px' }}>
                {line.label}
              </span>
              <span style={{ fontSize: '30px', color: '#ffffff', fontWeight: 900, letterSpacing: '1px' }}>
                {line.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
