import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  breadcrumbs: 'Brotkrumens',
  clearEntry: 'Eingabe löschen',
  clickToSelectOrDropFilesHere: 'Klicken Sie hier, um Dateien auszuwählen oder abzulegen',
  close: 'Schließen',
  copied: 'Kopiert',
  copyToClipboard: 'In die Zwischenablage kopieren',
  error: 'Fehler',
  hidePassword: 'Passwort verbergen',
  loading: 'Wird geladen',
  remove: 'Entfernen',
  showPassword: 'Passwort anzeigen'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
