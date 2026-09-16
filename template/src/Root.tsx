import { Composition } from 'remotion';
import { AiflMain, AIFL_TOTAL } from './aifl/Main';
import { RealEstateShortMain, SHORT_TOTAL } from './realestate/RealEstateShortMain';
import { ScriptDrivenVideo } from './ScriptDrivenVideo';
import scriptData from './sample-script.json';

const SCRIPT_TOTAL_FRAMES = scriptData.scenes.reduce((acc, s) => acc + (s.durationSec || 5) * 30, 0);

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="AiflPromo"
        component={AiflMain}
        durationInFrames={AIFL_TOTAL}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RealEstateShort"
        component={RealEstateShortMain}
        durationInFrames={SHORT_TOTAL}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ScriptDrivenShort"
        component={ScriptDrivenVideo}
        durationInFrames={SCRIPT_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
