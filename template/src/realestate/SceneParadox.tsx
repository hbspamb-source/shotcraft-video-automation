import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface StepCard {
  label: string;
  sub: string;
  value: string;
}

interface SceneParadoxProps {
  bannerTitle?: string;
  bannerContext?: React.ReactNode;
  bannerSub?: string;
  sectionTitle?: string;
  steps?: [StepCard, StepCard, StepCard];
}

export const SceneParadox: React.FC<SceneParadoxProps> = ({
  bannerTitle = 'BỐI CẢNH NGHỊCH LÝ THỊ TRƯỜNG',
  bannerContext = (
    <>
      Huy động 9% • Cho vay <span style={{ color: '#f87171' }}>14–15%</span>
    </>
  ),
  bannerSub = 'Doanh nghiệp ngắc ngoải, thanh khoản đóng băng',
  sectionTitle = '💥 THẾ NHƯNG VINHOMES (VHM):',
  steps = [
    { label: '3 QUÝ LIÊN TIẾP', sub: 'VƯỢT NGƯỠNG', value: '> 30.000 TỶ' },
    { label: '2 QUÝ GẦN NHẤT', sub: 'DUY TRÌ ĐỈNH CAO', value: '~ 40.000 TỶ' },
    { label: 'NỬA ĐẦU 2026', sub: 'KỶ LỤC LỊCH SỬ', value: '52.000 TỶ' },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1 = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const s2 = spring({ frame: frame - 95, fps, config: { damping: 12 } });
  const s3 = spring({ frame: frame - 165, fps, config: { damping: 10, stiffness: 240 } });

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
      {/* Background with danger/red financial tone */}
      <CinematicBackground theme="danger" overlayOpacity={0.65} blurAmount={10} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* Top alert banner */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(30, 10, 15, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(239, 68, 68, 0.65)',
            borderRadius: 24,
            padding: '26px 32px',
            marginBottom: 45,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 12px 35px rgba(239, 68, 68, 0.25)',
          }}
        >
          <span style={{ color: '#ef4444', fontSize: 32, fontWeight: 900, letterSpacing: 1.5 }}>
            {bannerTitle}
          </span>
          <span style={{ color: '#f8fafc', fontSize: 42, fontWeight: 900, textAlign: 'center' }}>
            {bannerContext}
          </span>
          <span style={{ color: '#cbd5e1', fontSize: 30, fontWeight: 600 }}>
            {bannerSub}
          </span>
        </div>

        <h3
          style={{
            color: '#38bdf8',
            fontSize: 42,
            fontWeight: 900,
            marginBottom: 35,
            textAlign: 'center',
            textTransform: 'uppercase',
            textShadow: '0 4px 15px rgba(0,0,0,0.9)',
          }}
        >
          {sectionTitle}
        </h3>

        {/* 3 Step Cards */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Step 1 */}
          <div
            style={{
              transform: `scale(${Math.max(0, s1)})`,
              backgroundColor: 'rgba(22, 27, 34, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(148, 163, 184, 0.25)',
              borderRadius: 22,
              padding: '26px 36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
            }}
          >
            <div>
              <div style={{ color: '#94a3b8', fontSize: 28, fontWeight: 700 }}>{steps[0].label}</div>
              <div style={{ color: '#f0f6fc', fontSize: 36, fontWeight: 800 }}>{steps[0].sub}</div>
            </div>
            <div style={{ color: '#facc15', fontSize: 56, fontWeight: 900, textShadow: '0 0 15px rgba(250, 204, 21, 0.4)' }}>
              {steps[0].value}
            </div>
          </div>

          {/* Step 2 */}
          <div
            style={{
              transform: `scale(${Math.max(0, s2)})`,
              backgroundColor: 'rgba(22, 27, 34, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(148, 163, 184, 0.25)',
              borderRadius: 22,
              padding: '26px 36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
            }}
          >
            <div>
              <div style={{ color: '#94a3b8', fontSize: 28, fontWeight: 700 }}>{steps[1].label}</div>
              <div style={{ color: '#f0f6fc', fontSize: 36, fontWeight: 800 }}>{steps[1].sub}</div>
            </div>
            <div style={{ color: '#fbbf24', fontSize: 56, fontWeight: 900, textShadow: '0 0 15px rgba(251, 191, 36, 0.4)' }}>
              {steps[1].value}
            </div>
          </div>

          {/* Step 3 - Highlight */}
          <div
            style={{
              transform: `scale(${Math.max(0, s3)})`,
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.35) 0%, rgba(15, 23, 42, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2.5px solid #eab308',
              borderRadius: 24,
              padding: '30px 36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 0 45px rgba(234, 179, 8, 0.45), 0 10px 30px rgba(0,0,0,0.8)',
            }}
          >
            <div>
              <div style={{ color: '#fde047', fontSize: 30, fontWeight: 900 }}>{steps[2].label}</div>
              <div style={{ color: '#ffffff', fontSize: 38, fontWeight: 900 }}>{steps[2].sub}</div>
            </div>
            <div style={{ color: '#fef08a', fontSize: 68, fontWeight: 1000, textShadow: '0 0 30px rgba(234, 179, 8, 0.9)' }}>
              {steps[2].value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
