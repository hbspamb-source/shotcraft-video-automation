import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from './CinematicBackground';

interface SceneBreakdownProps {
  badgeTitle?: string;
  headline?: React.ReactNode;
  coreRevenue?: string;
  financeRevenue?: string;
  quarterRevenue?: string;
  quarterNote?: string;
  takeawayLabel?: string;
  takeawayValue?: string;
}

export const SceneBreakdown: React.FC<SceneBreakdownProps> = ({
  badgeTitle = '🔎 BÍ MẬT DÒNG TIỀN',
  headline = (
    <>
      TIỀN Ở ĐÂU RA NHIỀU THẾ?<br />
      <span style={{ color: '#ef4444', textShadow: '0 0 25px rgba(239, 68, 68, 0.6)' }}>KHÔNG PHẢI BÁN NHÀ! ❌</span>
    </>
  ),
  coreRevenue = '116.565 TỶ',
  financeRevenue = '134.205 TỶ',
  quarterRevenue = '34.732 TỶ',
  quarterNote = '🔥 HƠN 1 TỶ USD CHỈ TRONG 1 QUÝ!',
  takeawayLabel = 'CỬA HÁI RA TIỀN LỚN NHẤT:',
  takeawayValue = 'HOẠT ĐỘNG TÀI CHÍNH',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardFlip = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const revealQ2 = spring({ frame: frame - 90, fps, config: { damping: 12, stiffness: 220 } });
  const highlightKey = spring({ frame: frame - 180, fps, config: { damping: 10 } });

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
      {/* Background financial blue tone */}
      <CinematicBackground theme="finance" overlayOpacity={0.65} blurAmount={10} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.25)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid #ef4444',
            padding: '10px 30px',
            borderRadius: 999,
            color: '#fca5a5',
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            marginBottom: 20,
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
            marginBottom: 35,
            textShadow: '0 4px 20px rgba(0,0,0,0.95)',
          }}
        >
          {headline}
        </h2>

        {/* Revenue Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(17, 24, 39, 0.88)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1.5px solid rgba(99, 102, 241, 0.35)',
            borderRadius: 24,
            padding: '32px 36px',
            marginBottom: 26,
            boxShadow: '0 10px 35px rgba(0,0,0,0.7)',
            transform: `scale(${Math.max(0, cardFlip)})`,
          }}
        >
          <div style={{ color: '#cbd5e1', fontSize: 30, fontWeight: 700, marginBottom: 12 }}>
            DOANH THU HỢP NHẤT 6 THÁNG
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ color: '#60a5fa', fontSize: 64, fontWeight: 900, textShadow: '0 0 20px rgba(96, 165, 250, 0.4)' }}>
              {coreRevenue}
            </span>
            <span style={{ color: '#94a3b8', fontSize: 26 }}>(Kinh doanh cốt lõi)</span>
          </div>
          <div
            style={{
              marginTop: 18,
              paddingTop: 18,
              borderTop: '1px dashed rgba(148, 163, 184, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#f1f5f9', fontSize: 32, fontWeight: 800 }}>+ Hoạt động tài chính:</span>
            <span style={{ color: '#34d399', fontSize: 48, fontWeight: 1000, textShadow: '0 0 20px rgba(52, 211, 153, 0.5)' }}>
              {financeRevenue}
            </span>
          </div>
        </div>

        {/* Q2 Record Box */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid #6366f1',
            borderRadius: 24,
            padding: '28px 36px',
            marginBottom: 26,
            transform: `scale(${Math.max(0, revealQ2)})`,
            boxShadow: '0 0 35px rgba(99, 102, 241, 0.4)',
          }}
        >
          <div style={{ color: '#a5b4fc', fontSize: 28, fontWeight: 800 }}>RIÊNG QUÝ 2 ĐẠT:</div>
          <div style={{ color: '#ffffff', fontSize: 68, fontWeight: 1000, margin: '8px 0', textShadow: '0 0 25px rgba(255,255,255,0.4)' }}>
            {quarterRevenue}
          </div>
          <div style={{ color: '#fbbf24', fontSize: 36, fontWeight: 900 }}>
            {quarterNote}
          </div>
        </div>

        {/* Bottom Key takeaway */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid #eab308',
            borderRadius: 20,
            padding: '22px 30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
            transform: `scale(${Math.max(0, highlightKey)})`,
          }}
        >
          <span style={{ color: '#fef08a', fontSize: 32, fontWeight: 800 }}>
            {takeawayLabel} <br />
            <span style={{ color: '#4ade80', fontSize: 40, fontWeight: 1000, textShadow: '0 0 20px rgba(74, 222, 128, 0.6)' }}>
              {takeawayValue}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
