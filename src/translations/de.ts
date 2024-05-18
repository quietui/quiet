import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  clearEntry: 'Eingabe löschen',
  copied: 'Kopiert',
  copyToClipboard: 'In die Zwischenablage kopieren',
  error: 'Fehler',
  hidePassword: 'Passwort verbergen',
  loading: 'Wird geladen',
  showPassword: 'Passwort anzeigen'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
