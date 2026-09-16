import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { SceneHook } from './SceneHook';
import { SceneParadox } from './SceneParadox';
import { SceneBreakdown } from './SceneBreakdown';
import { SceneTwoWorlds } from './SceneTwoWorlds';
import { SceneTwist } from './SceneTwist';
import { SceneCTA } from './SceneCTA';

// 60 seconds total = 1800 frames @ 30fps
export const SHORT_TOTAL = 1800;

export const RealEstateShortMain: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: '#000', position: 'relative' }}>
      {/* ================= BACKGROUND MUSIC (BGM) ================= */}
      {/* 0s - 40s: Hip-hop / Financial Trap Beat (Volume 0.22) */}
      <Sequence from={0} durationInFrames={1200}>
        <Audio src={staticFile('audio/bgm-hiphop.mp3')} volume={0.22} />
      </Sequence>

      {/* 40s - 40.5s: Nhạc DỪNG ĐỘT NGỘT 0.5s ở SceneTwist để tạo kịch tính */}
      {/* 40.5s - 60s: Nhạc quay trở lại nhẹ nhàng hơn (Volume 0.18) */}
      <Sequence from={1215} durationInFrames={585}>
        <Audio src={staticFile('audio/bgm-hiphop.mp3')} startFrom={1215} volume={0.18} />
      </Sequence>

      {/* ================= VIETNAMESE VOICEOVERS ================= */}
      {/* Voice 1: Hook (0s) */}
      <Sequence from={5} durationInFrames={85}>
        <Audio src={staticFile('audio/voice_01_hook.mp3')} volume={1.0} />
      </Sequence>

      {/* Voice 2: Paradox (3s = f90) */}
      <Sequence from={95} durationInFrames={265}>
        <Audio src={staticFile('audio/voice_02_paradox.mp3')} volume={1.0} />
      </Sequence>

      {/* Voice 3: Breakdown (12s = f360) */}
      <Sequence from={365} durationInFrames={385}>
        <Audio src={staticFile('audio/voice_03_breakdown.mp3')} volume={1.0} />
      </Sequence>

      {/* Voice 4: Two Worlds (25s = f750) */}
      <Sequence from={755} durationInFrames={445}>
        <Audio src={staticFile('audio/voice_04_twoworlds.mp3')} volume={1.0} />
      </Sequence>

      {/* Voice 5: Twist (40s = f1200) */}
      <Sequence from={1215} durationInFrames={345}>
        <Audio src={staticFile('audio/voice_05_twist.mp3')} volume={1.0} />
      </Sequence>

      {/* Voice 6: CTA + Loop (52s = f1560) */}
      <Sequence from={1565} durationInFrames={235}>
        <Audio src={staticFile('audio/voice_06_cta.mp3')} volume={1.0} />
      </Sequence>

      {/* ================= SOUND EFFECTS (SFX) ================= */}
      {/* S1: Hook punch & whoosh */}
      <Sequence from={3} durationInFrames={60}>
        <Audio src={staticFile('audio/sfx-whoosh.mp3')} volume={0.65} />
      </Sequence>
      <Sequence from={20} durationInFrames={60}>
        <Audio src={staticFile('audio/sfx-impact-epic.mp3')} volume={0.7} />
      </Sequence>

      {/* S2: Paradox milestones (30k, 40k, 52k) */}
      <Sequence from={105} durationInFrames={50}>
        <Audio src={staticFile('audio/sfx-bass-hit.mp3')} volume={0.6} />
      </Sequence>
      <Sequence from={185} durationInFrames={50}>
        <Audio src={staticFile('audio/sfx-bass-hit.mp3')} volume={0.7} />
      </Sequence>
      <Sequence from={255} durationInFrames={60}>
        <Audio src={staticFile('audio/sfx-impact-epic.mp3')} volume={0.8} />
      </Sequence>

      {/* S3: Breakdown (1 tỷ USD reveal) */}
      <Sequence from={365} durationInFrames={50}>
        <Audio src={staticFile('audio/sfx-warp.mp3')} volume={0.7} />
      </Sequence>
      <Sequence from={450} durationInFrames={60}>
        <Audio src={staticFile('audio/sfx-ding.mp3')} volume={0.85} />
      </Sequence>

      {/* S4: Two worlds split */}
      <Sequence from={755} durationInFrames={60}>
        <Audio src={staticFile('audio/sfx-whoosh.mp3')} volume={0.75} />
      </Sequence>
      <Sequence from={775} durationInFrames={60}>
        <Audio src={staticFile('audio/sfx-impact-epic.mp3')} volume={0.75} />
      </Sequence>

      {/* S5: Twist alert drop */}
      <Sequence from={1200} durationInFrames={50}>
        <Audio src={staticFile('audio/sfx-warp.mp3')} volume={0.8} />
      </Sequence>

      {/* S6: CTA button pop */}
      <Sequence from={1575} durationInFrames={50}>
        <Audio src={staticFile('audio/sfx-ding.mp3')} volume={0.9} />
      </Sequence>

      {/* ================= VISUAL SCENES ================= */}
      {/* 0:00 - 0:03 (0 - 90 frames) */}
      <Sequence from={0} durationInFrames={90}>
        <SceneHook />
      </Sequence>

      {/* 0:03 - 0:12 (90 - 360 frames) -> 270 frames */}
      <Sequence from={90} durationInFrames={270}>
        <SceneParadox />
      </Sequence>

      {/* 0:12 - 0:25 (360 - 750 frames) -> 390 frames */}
      <Sequence from={360} durationInFrames={390}>
        <SceneBreakdown />
      </Sequence>

      {/* 0:25 - 0:40 (750 - 1200 frames) -> 450 frames */}
      <Sequence from={750} durationInFrames={450}>
        <SceneTwoWorlds />
      </Sequence>

      {/* 0:40 - 0:52 (1200 - 1560 frames) -> 360 frames */}
      <Sequence from={1200} durationInFrames={360}>
        <SceneTwist />
      </Sequence>

      {/* 0:52 - 1:00 (1560 - 1800 frames) -> 240 frames */}
      <Sequence from={1560} durationInFrames={240}>
        <SceneCTA />
      </Sequence>
    </div>
  );
};
