import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface MetricRow {
  label: string;
  leftVal: string;
  rightVal: string;
}

interface ComparisonCardProps {
  title?: string;
  leftHeader: string;
  rightHeader: string;
  metrics: MetricRow[];
  conclusion?: string;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title = 'ĐỐI LẬP THỊ TRƯỜNG BẤT ĐỘNG SẢN',
  leftHeader = 'TOÀN NGÀNH',
  rightHeader = 'VINHOMES',
  metrics = [
    { label: 'LÃI SUẤT VAY', leftVal: '14 - 15%', rightVal: 'Ưu đãi lớn' },
    { label: 'THANH KHOẢN', leftVal: 'Đóng băng / Ép giá', rightVal: 'Bùng nổ giao dịch' },
    { label: 'LỢI NHUẬN RÒNG', leftVal: 'Âm / Giảm 60%', rightVal: '+52.000 TỶ' },
  ],
  conclusion = 'Sự phân hóa khốc liệt nhất trong lịch sử 10 năm qua',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '70px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        zIndex: 10,
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', opacity: entrance }}>
        <div style={{ fontSize: '20px', letterSpacing: '4px', color: '#ffbe0b', fontWeight: 800 }}>
          {title}
        </div>
      </div>

      {/* Comparison Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Column Headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 71, 111, 0.15)',
              border: '1px solid rgba(239, 71, 111, 0.4)',
              textAlign: 'center',
              fontWeight: 900,
              fontSize: '26px',
              color: '#ef476f',
            }}
          >
            {leftHeader}
          </div>
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(6, 214, 160, 0.15)',
              border: '1px solid rgba(6, 214, 160, 0.4)',
              textAlign: 'center',
              fontWeight: 900,
              fontSize: '26px',
              color: '#06d6a0',
            }}
          >
            {rightHeader}
          </div>
        </div>

        {/* Rows */}
        {metrics.map((m, idx) => {
          const rowSpring = spring({ frame: frame - (idx + 1) * 6, fps, config: { damping: 14 } });
          return (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '14px',
                padding: '18px 20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                opacity: rowSpring,
                transform: `translateY(${interpolate(rowSpring, [0, 1], [30, 0])}px)`,
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '10px',
                  textAlign: 'center',
                }}
              >
                {m.label}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#fca311', textAlign: 'center' }}>
                  {m.leftVal}
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#06d6a0', textAlign: 'center' }}>
                  {m.rightVal}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conclusion box */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderLeft: '5px solid #ffbe0b',
          fontSize: '24px',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.4,
          opacity: spring({ frame: frame - 25, fps }),
        }}
      >
        💡 {conclusion}
      </div>
    </div>
  );
};
