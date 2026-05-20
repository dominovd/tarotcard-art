export interface CardL10n {
  name: string;
  keywords: string[];
  upright: string;
  advice: string;
  // Optional fields — translate when ready. If absent and locale !== "en",
  // the matching UI block is hidden (we don't fall back to English to
  // avoid jarring mixed-language pages).
  reversed?: string;
  love?: string;
  career?: string;
}

export type CardL10nMap = Record<string, CardL10n>;
