import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  breadcrumbs: 'Brotkrumens',
  clearEntry: 'Eingabe löschen',
  close: 'Schließen',
  copied: 'Kopiert',
  copyToClipboard: 'In die Zwischenablage kopieren',
  dragFileHereOrChooseFromFolder: 'Ziehen Sie die Datei hierher oder wählen Sie einen Ordner aus',
  dragFilesHereOrChooseFromFolder: 'Ziehen Sie Dateien hierher oder wählen Sie sie aus einem Ordner aus',
  error: 'Fehler',
  hidePassword: 'Passwort verbergen',
  loading: 'Wird geladen',
  remove: 'Entfernen',
  selectAColorFromTheScreen: 'Farbe vom Bildschirm auswählen',
  showPassword: 'Passwort anzeigen'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
