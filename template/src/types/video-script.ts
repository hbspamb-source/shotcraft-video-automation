export type SceneRole = "hook" | "body_stat" | "body_comparison" | "body_insight" | "outro";

export interface SfxConfig {
  name: string;
  volume?: number;
  startOffsetSec?: number;
}

export interface VideoScene {
  id: string;
  role: SceneRole;
  headline: string;
  subtext?: string;
  highlight?: string;
  voiceText: string;
  layout?: "editorial-poster" | "swiss-stat" | "comparison" | "insight-grid" | "outro-cta";
  sfx?: SfxConfig;
  data?: Record<string, any>;
  durationSec?: number;
}

export interface VideoScript {
  version: "1.0";
  metadata: {
    title: string;
    topic: string;
    channel?: string;
    source?: string;
  };
  audio: {
    voiceProvider: "edge-tts" | "omnivoice";
    voiceName?: string;
    playbackRate?: number;
    bgmTrack?: string;
    bgmVolume?: number;
  };
  aspectRatio: "9:16" | "16:9" | "1:1";
  scenes: VideoScene[];
}
