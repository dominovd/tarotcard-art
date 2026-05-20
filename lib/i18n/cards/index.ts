import type { Locale } from "@/lib/i18n/config";
import type { CardL10nMap } from "./types";
import es from "./es";
import pt from "./pt";
import fr from "./fr";
import it from "./it";
import de from "./de";
import ru from "./ru";
import pl from "./pl";
import tr from "./tr";
import ja from "./ja";

export const cardTranslations: Partial<Record<Locale, CardL10nMap>> = {
  es, pt, fr, it, de, ru, pl, tr, ja,
  // en — fall back to defaults in lib/deck.ts
};
