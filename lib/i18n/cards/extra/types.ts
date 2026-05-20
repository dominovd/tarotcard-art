// Supplementary translations for fields we couldn't fit in the first
// translation pass: reversed meaning, love guidance, career guidance.
// Merged into the main CardL10n map at runtime.
export interface CardL10nExtra {
  reversed: string;
  love: string;
  career: string;
}
export type CardL10nExtraMap = Record<string, CardL10nExtra>;
