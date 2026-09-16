export interface KeywordSfxRule {
  pattern: RegExp;
  sfxName: string;
  volume: number;
}

export const SFX_KEYWORD_RULES: KeywordSfxRule[] = [
  // Cảnh báo, sốc, nguy cơ
  { pattern: /(cảnh báo|rủi ro|nguy hiểm|thở oxy|chết lên chết xuống|áp lực|báo động)/i, sfxName: "audio/sfx-impact-epic.mp3", volume: 0.6 },
  // Kỷ lục, doanh thu lớn, tiền bạc
  { pattern: /(kỷ lục|vua|bỏ túi|tỷ|nghìn tỷ|lợi nhuận|doanh thu|đột phá|tiền|34.000|52.000)/i, sfxName: "audio/whoosh-big.mp3", volume: 0.5 },
  // Bật mí, lý do, cốt lõi
  { pattern: /(tiền ở đâu|lý do|nghịch lý|bản chất|bí quyết|sự thật)/i, sfxName: "audio/pop.mp3", volume: 0.5 },
  // Chuyển cảnh, bước tiếp
  { pattern: /(vậy mà|trong khi|mổ tiền|dự án|kết luận)/i, sfxName: "audio/swoosh-quick.mp3", volume: 0.4 },
];

export function resolveSceneSfx(role: string, voiceText: string, explicitSfx?: { name: string; volume?: number }): { name: string; volume: number } {
  if (explicitSfx && explicitSfx.name && explicitSfx.name !== "none") {
    return { name: explicitSfx.name, volume: explicitSfx.volume ?? 0.5 };
  }

  for (const rule of SFX_KEYWORD_RULES) {
    if (rule.pattern.test(voiceText)) {
      return { name: rule.sfxName, volume: rule.volume };
    }
  }

  switch (role) {
    case "hook":
      return { name: "audio/whoosh-big.mp3", volume: 0.6 };
    case "body_stat":
      return { name: "audio/sfx-ding.mp3", volume: 0.5 };
    case "body_comparison":
      return { name: "audio/swoosh-quick.mp3", volume: 0.5 };
    case "outro":
      return { name: "audio/pop.mp3", volume: 0.4 };
    default:
      return { name: "audio/whoosh-fast.mp3", volume: 0.4 };
  }
}
