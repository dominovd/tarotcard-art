import type { Locale } from "@/lib/i18n/config";
import type { CardL10nExtraMap } from "./types";
import es from "./es";
import pt from "./pt";
import ru from "./ru";
import fr from "./fr";
import it from "./it";
import de from "./de";
import pl from "./pl";
import tr from "./tr";
import ja from "./ja";

export const cardExtras: Partial<Record<Locale, CardL10nExtraMap>> = {
  es, pt, ru, fr, it, de, pl, tr, ja,
};
