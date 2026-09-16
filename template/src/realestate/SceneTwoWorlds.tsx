import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface EntityCard {
  name: string;
  sub: string;
  growth: string;
  positive: boolean;
}

interface SceneTwoWorldsProps {
  badgeTitle?: string;
  headline?: React.ReactNode;
  topEntity?: EntityCard;
  bottomEntity?: EntityCard;
  bottomNote?: React.ReactNode;
}

export const SceneTwoWorlds: React.FC<SceneTwoWorldsProps> = ({
  badgeTitle = 'THỊ TRƯỜNG PHÂN HOÁ TỘT CÙNG',
  headline = (
    <>
      MỘT THỊ TRƯỜNG<br />
      <span style={{ color: '#eab308', textShadow: '0 0 25px rgba(234, 179, 8, 0.6)' }}>HAI THẾ GIỚI!</span>
    </>
  ),
  topEntity = {
    name: 'VINHOMES (VHM)',
    sub: '40.000 → 148.000 (ĐỈNH 168.000)',
    growth: '+350% 🚀',
    positive: true,
  },
  bottomEntity = {
    name: 'NOVALAND (NVL)',
    sub: '85.000 → 10.000 (CÓ LÚC 7.000)',
    growth: '-85% 🩸',
    positive: false,
  },
  bottomNote = (
    <>
      Khang Điền (KDH), Nam Long (NLG), Đất Xanh (DXG)... <br />
      <span style={{ color: '#f4f4f5' }}>Đều trong trạng thái cầm cự ngột ngạt!</span>
    </>
  ),
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const vhmProgress = interpolate(frame, [10, 120], [40, 168], { extrapolateRight: 'clamp' });
  const nvlProgress = interpolate(frame, [15, 120], [85, 11], { extrapolateRight: 'clamp' });

  const sVhm = spring({ frame: frame - 5, fps, config: { damping: 12 } });
  const sNvl = spring({ frame: frame - 25, fps, config: { damping: 12 } });

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 40px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background contrast theme */}
      <CinematicBackground theme="contrast" overlayOpacity={0.65} blurAmount={10} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            backgroundColor: 'rgba(39, 39, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            borderRadius: 999,
            padding: '12px 36px',
            color: '#e4e4e7',
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 2,
            marginBottom: 30,
            border: '1px solid rgba(255,255,255,0.1)',
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
            margin: 0,
            marginBottom: 35,
            textShadow: '0 4px 20px rgba(0,0,0,0.95)',
          }}
        >
          {headline}
        </h2>

        {/* Top half: Vinhomes */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(17, 24, 39, 0.95) 100%)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '2px solid #22c55e',
            borderRadius: 24,
            padding: '28px 36px',
            marginBottom: 26,
            boxShadow: '0 0 35px rgba(34, 197, 94, 0.35)',
            transform: `scale(${Math.max(0, sVhm)})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#ffffff', fontSize: 44, fontWeight: 900 }}>{topEntity.name}</span>
              <div style={{ color: '#86efac', fontSize: 28, fontWeight: 700 }}>{topEntity.sub}</div>
            </div>
            <div style={{ color: '#4ade80', fontSize: 62, fontWeight: 1000, textShadow: '0 0 20px rgba(74, 222, 128, 0.7)' }}>
              {topEntity.growth}
            </div>
          </div>
          {/* Visual Growth bar */}
          <div style={{ height: 18, backgroundColor: 'rgba(30, 41, 59, 0.8)', borderRadius: 999, marginTop: 20, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${((vhmProgress - 40) / 128) * 100}%`,
                background: 'linear-gradient(90deg, #10b981 0%, #22c55e 100%)',
                boxShadow: '0 0 20px #22c55e',
              }}
            />
          </div>
        </div>

        {/* Bottom half: Novaland */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(17, 24, 39, 0.95) 100%)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '2px solid #ef4444',
            borderRadius: 24,
            padding: '28px 36px',
            marginBottom: 28,
            boxShadow: '0 0 35px rgba(239, 68, 68, 0.35)',
            transform: `scale(${Math.max(0, sNvl)})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#ffffff', fontSize: 44, fontWeight: 900 }}>{bottomEntity.name}</span>
              <div style={{ color: '#fca5a5', fontSize: 28, fontWeight: 700 }}>{bottomEntity.sub}</div>
            </div>
            <div style={{ color: '#f87171', fontSize: 62, fontWeight: 1000, textShadow: '0 0 20px rgba(248, 113, 113, 0.7)' }}>
              {bottomEntity.growth}
            </div>
          </div>
          {/* Visual Drop bar */}
          <div style={{ height: 18, backgroundColor: 'rgba(30, 41, 59, 0.8)', borderRadius: 999, marginTop: 20, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(nvlProgress / 85) * 100}%`,
                backgroundColor: '#ef4444',
                boxShadow: '0 0 20px #ef4444',
              }}
            />
          </div>
        </div>

        {/* Bottom ticker mentions */}
        <div
          style={{
            backgroundColor: 'rgba(24, 24, 27, 0.85)',
            backdropFilter: 'blur(14px)',
            borderRadius: 18,
            padding: '20px 32px',
            color: '#a1a1aa',
            fontSize: 28,
            fontWeight: 700,
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {bottomNote}
        </div>
      </div>
    </div>
  );
};
