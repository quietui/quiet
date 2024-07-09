import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  breadcrumbs: 'Brotkrumens',
  browseForFilesOrDragAndDrop: 'Durchsuchen Sie Dateien oder ziehen Sie sie per Drag & Drop',
  clearEntry: 'Eingabe löschen',
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
