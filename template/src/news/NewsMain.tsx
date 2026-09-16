import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';
import { NewsHookBanner } from './NewsHookBanner';
import { HUDRadarScreen } from './HUDRadarScreen';
import { BreakingNewsDrop } from './BreakingNewsDrop';
import { OneSideCard } from './OneSideCard';
import { StatRevealPanel } from './StatRevealPanel';
import { CtaUrgentOutro } from './CtaUrgentOutro';
import scriptData from '../sample-script-news.json';

export const NEWS_FPS = scriptData.fps || 30;

// Calculate start frame and duration for each scene
let currentFrame = 0;
export const NEWS_SCENES_WITH_FRAMES = scriptData.scenes.map((scene) => {
  const durationInFrames = Math.round(scene.durationSec * NEWS_FPS);
  const from = currentFrame;
  currentFrame += durationInFrames;
  return {
    ...scene,
    from,
    durationInFrames,
  };
});

export const NEWS_TOTAL_FRAMES = currentFrame;

export const NewsMain: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#050507', position: 'relative' }}>
      {/* Background Music (lower volume so voice stands out crisp and clear) */}
      {scriptData.audio.bgmTrack && (
        <Audio
          src={staticFile(scriptData.audio.bgmTrack)}
          volume={0.10}
          loop
        />
      )}
      {/* Render Scenes Sequentially */}
      {NEWS_SCENES_WITH_FRAMES.map((scene) => {
        return (
          <Sequence
            key={scene.id}
            from={scene.from}
            durationInFrames={scene.durationInFrames}
            name={scene.id}
          >
            {/* Visual Component */}
            {scene.component === 'NewsHookBanner' && (
              <NewsHookBanner {...(scene.props as any)} />
            )}
            {scene.component === 'HUDRadarScreen' && (
              <HUDRadarScreen {...(scene.props as any)} />
            )}
            {scene.component === 'BreakingNewsDrop' && (
              <BreakingNewsDrop {...(scene.props as any)} />
            )}
            {scene.component === 'OneSideCard' && (
              <OneSideCard {...(scene.props as any)} />
            )}
            {scene.component === 'StatRevealPanel' && (
              <StatRevealPanel {...(scene.props as any)} />
            )}
            {scene.component === 'CtaUrgentOutro' && (
              <CtaUrgentOutro {...(scene.props as any)} />
            )}
            {/* Voiceover Track (boosted to 1.35 for clear punchy narration) */}
            {scene.voiceFile && (
              <Sequence
                from={Math.round((scene.voiceStartSec || 0) * NEWS_FPS)}
                durationInFrames={366}
                freeze={null}>
                <Audio src={staticFile(scene.voiceFile)} volume={1.35} />
              </Sequence>
            )}
            {/* Scene-specific SFX tracks */}
            {scene.sfx &&
              scene.sfx.map((sfxItem, sfxIdx) => (
                <Sequence
                  key={sfxIdx}
                  from={Math.round(sfxItem.fromSec * NEWS_FPS)}
                >
                  <Audio
                    src={staticFile(sfxItem.src)}
                    volume={sfxItem.volume || 0.7}
                  />
                </Sequence>
              ))}
          </Sequence>
        );
      })}
    </div>
  );
};
