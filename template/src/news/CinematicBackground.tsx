import React from 'react';
import { useCurrentFrame, interpolate, staticFile, Img } from 'remotion';

interface CinematicBackgroundProps {
  imageSrc: string;
  scrimOpacity?: number; // Độ tối của lớp phủ đen để nổi chữ (mặc định 0.5)
  zoomDirection?: 'in' | 'out';
  tintColor?: string; // Tông màu phủ thêm (vd: đỏ quân sự, xanh navy)
  tintOpacity?: number;
  showVignette?: boolean;
  showScanlines?: boolean;
  showNoise?: boolean;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
  imageSrc,
  scrimOpacity = 0.52,
  zoomDirection = 'in',
  tintColor = 'rgba(220, 38, 38, 0.15)',
  tintOpacity = 0.25,
  showVignette = true,
  showScanlines = true,
  showNoise = true,
}) => {
  const frame = useCurrentFrame();

  // Hiệu ứng Ken Burns 2.5D: Camera zoom chậm mượt mà
  const scale =
    zoomDirection === 'in'
      ? interpolate(frame, [0, 450], [1.0, 1.14], { extrapolateRight: 'clamp' })
      : interpolate(frame, [0, 450], [1.14, 1.0], { extrapolateRight: 'clamp' });

  const translateY =
    zoomDirection === 'in'
      ? interpolate(frame, [0, 450], [0, -18], { extrapolateRight: 'clamp' })
      : interpolate(frame, [0, 450], [-18, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: '#000000',
        zIndex: 0,
      }}
    >
      {/* TẦNG 1: B-Roll Image with Ken Burns Effect */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: 'center center',
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* TẦNG 1.5: Scrim tối để tôn chữ (Tránh chữ bị chìm vào ảnh) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: `rgba(5, 5, 8, ${scrimOpacity})`,
        }}
      />

      {/* TẦNG 2: MÀU TINT ĐIỆN ẢNH (Red/Orange/Navy Alert Tint) */}
      {tintColor && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: tintColor,
            opacity: tintOpacity,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* TẦNG 2: VIGNETTE ĐỎ / ĐEN ĐẬM CHẤT THỜI SỰ */}
      {showVignette && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 50%, transparent 40%, rgba(5,5,8,0.85) 90%, #000000 100%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* TẦNG 2: MILITARY SCANLINES (Vạch quét màn hình chỉ huy) */}
      {showScanlines && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)',
            backgroundSize: '100% 4px',
            opacity: 0.45,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* TẦNG 2: FILM GRAIN / NOISE (Nhiễu điện ảnh chân thực) */}
      {showNoise && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 0)`,
            backgroundSize: '12px 12px',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
