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
  const playbackRate = scriptData.audio.playbackRate || 1.0;
  let accumulatedFrame = 0;

  // Calculate total frames dynamically based on speed
  const totalFrames = scriptData.scenes.reduce((acc, s) => {
    return acc + Math.round(((s.durationSec || 5) / playbackRate) * FPS);
  }, 0);

  // Split BGM tension pause at Scene 4 -> Scene 5 transition
  const pausePointFrame = Math.round(totalFrames * (40 / 60));

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      {/* Background Music: Nhạc nền Hip-hop thông minh */}
      <Sequence from={0} durationInFrames={pausePointFrame}>
        <Audio src={staticFile('audio/bgm-hiphop.mp3')} volume={scriptData.audio.bgmVolume || 0.22} />
      </Sequence>
      {/* Khoảng lặng ngắt nhạc kịch tính 0.5s (15 frames) trước cảnh Twist */}
      <Sequence from={pausePointFrame + 15} durationInFrames={totalFrames - (pausePointFrame + 15)}>
        <Audio src={staticFile('audio/bgm-hiphop.mp3')} startFrom={pausePointFrame + 15} volume={0.18} />
      </Sequence>

      {/* Render 6 Shotcraft Motion Scenes Dynamically with 1.5x Speed */}
      {scriptData.scenes.map((scene, idx) => {
        const sceneDurationFrames = Math.round(((scene.durationSec || 5) / playbackRate) * FPS);
        const startFrom = accumulatedFrame;
        accumulatedFrame += sceneDurationFrames;

        const resolvedSfx = resolveSceneSfx(scene.role, scene.voiceText);

        return (
          <Sequence key={scene.id} from={startFrom} durationInFrames={sceneDurationFrames}>
            {/* Vietnamese Voiceover Narration with 1.5x speed */}
            {scene.voiceFile && (
              <Audio src={staticFile(scene.voiceFile)} playbackRate={playbackRate} volume={1.0} />
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
