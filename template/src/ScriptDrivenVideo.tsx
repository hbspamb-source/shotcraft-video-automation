import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { SceneHook } from './realestate/SceneHook';
import { SceneParadox } from './realestate/SceneParadox';
import { SceneBreakdown } from './realestate/SceneBreakdown';
import { SceneTwoWorlds } from './realestate/SceneTwoWorlds';
import { SceneTwist } from './realestate/SceneTwist';
import { SceneCTA } from './realestate/SceneCTA';
import { resolveSceneSfx } from './utils/sfx-engine';
import scriptData from './sample-script.json';

const FPS = 30;

export const ScriptDrivenVideo: React.FC = () => {
  let accumulatedFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      {/* Background Music: Nhạc nền Hip-hop thông minh */}
      <Sequence from={0} durationInFrames={1200}>
        <Audio src={staticFile('audio/bgm-hiphop.mp3')} volume={scriptData.audio.bgmVolume || 0.22} />
      </Sequence>
      {/* Khoảng lặng ngắt nhạc kịch tính ở SceneTwist (f1200 -> f1215), sau đó nhạc vào lại nhẹ nhàng */}
      <Sequence from={1215} durationInFrames={585}>
        <Audio src={staticFile('audio/bgm-hiphop.mp3')} startFrom={1215} volume={0.18} />
      </Sequence>

      {/* Render 6 Shotcraft Motion Scenes Dynamically from Script JSON */}
      {scriptData.scenes.map((scene, idx) => {
        const sceneDurationFrames = (scene.durationSec || 5) * FPS;
        const startFrom = accumulatedFrame;
        accumulatedFrame += sceneDurationFrames;

        const resolvedSfx = resolveSceneSfx(scene.role, scene.voiceText);

        return (
          <Sequence key={scene.id} from={startFrom} durationInFrames={sceneDurationFrames}>
            {/* Vietnamese Voiceover Narration per Scene */}
            {scene.voiceFile && (
              <Audio src={staticFile(scene.voiceFile)} volume={1.0} />
            )}

            {/* Smart Auto SFX synchronization */}
            <Audio src={staticFile(resolvedSfx.name)} volume={resolvedSfx.volume} />

            {/* Render True Shotcraft High-End Motion Scenes */}
            {idx === 0 && <SceneHook {...(scene.props as any)} />}
            {idx === 1 && <SceneParadox {...(scene.props as any)} />}
            {idx === 2 && <SceneBreakdown {...(scene.props as any)} />}
            {idx === 3 && <SceneTwoWorlds {...(scene.props as any)} />}
            {idx === 4 && <SceneTwist {...(scene.props as any)} />}
            {idx === 5 && <SceneCTA {...(scene.props as any)} />}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
