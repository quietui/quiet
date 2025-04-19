import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  breadcrumbs: 'Brotkrumens',
  clearEntry: 'Eingabe löschen',
  close: 'Schließen',
  colorValue: 'Farbwert',
  copied: 'Kopiert',
  copyToClipboard: 'In die Zwischenablage kopieren',
  dragFileHereOrChooseFromFolder: 'Ziehen Sie die Datei hierher oder wählen Sie einen Ordner aus',
  dragFilesHereOrChooseFromFolder: 'Ziehen Sie Dateien hierher oder wählen Sie sie aus einem Ordner aus',
  error: 'Fehler',
  firstPage: 'Erste Seite',
  hidePassword: 'Passwort verbergen',
  hide: 'Verbergen',
  lastPage: 'Letzte Seite',
  loading: 'Wird geladen',
  hue: 'Farbton',
  next: 'Nächste',
  numberOutOfTotal: (number, total) => `${number} von ${total}`,
  opacity: 'Opazität',
  pageNumber: number => `Seite ${number}`,
  pagination: 'Paginierung',
  percentLuminosity: (percentage: string) => `${percentage} Leuchtkraft`,
  percentSaturation: (percentage: string) => `${percentage} Sättigung`,
  pressSpaceForOneSecondToActivate: 'Zum Aktivieren eine Sekunde lang die Leertaste drücken',
  previous: 'Vorherige',
  remove: 'Entfernen',
  resize: 'Größe ändern',
  selectAColorFromTheScreen: 'Farbe vom Bildschirm auswählen',
  scrollableRegion: 'Scrollbarer Bereich',
  share: 'Aktie',
  showPassword: 'Passwort anzeigen',
  show: 'Anzeigen',
  showingNumberOfTotalItems: (number: number, total: number) => {
    if (number === 1) return `Zeige ${number} von ${total} ${total === 1 ? 'artikel' : 'artikeln'}`;
    return `Zeige ${number} von ${total} artikeln`;
  },
  showingAllNumberItems: (number: number) => {
    if (number === 1) return `Zeige ${number} artikel`;
    return `Zeige alle ${number} artikel`;
  },
  spoiler: 'Spoiler'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
