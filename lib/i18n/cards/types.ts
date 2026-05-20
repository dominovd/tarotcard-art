export interface CardL10n {
  name: string;
  keywords: string[];
  upright: string;
  advice: string;
}

export type CardL10nMap = Record<string, CardL10n>;
