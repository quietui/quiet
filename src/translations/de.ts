import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  copied: 'Kopiert',
  copyToClipboard: 'In die Zwischenablage kopieren',
  error: 'Fehler',
  loading: 'Wird geladen'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
