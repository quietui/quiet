import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  breadcrumbs: 'Brotkrumens',
  carousel: 'Karussell',
  clearEntry: 'Eingabe löschen',
  close: 'Schließen',
  collapse: 'Einklappen',
  colorValue: 'Farbwert',
  copied: 'Kopiert',
  copyToClipboard: 'In die Zwischenablage kopieren',
  decrease: 'Verringern',
  dragFileHereOrChooseFromFolder: 'Ziehen Sie die Datei hierher oder wählen Sie einen Ordner aus',
  dragFilesHereOrChooseFromFolder: 'Ziehen Sie Dateien hierher oder wählen Sie sie aus einem Ordner aus',
  expand: 'Erweitern',
  error: 'Fehler',
  feed: 'Beiträge',
  firstPage: 'Erste Seite',
  hidePassword: 'Passwort verbergen',
  hide: 'Verbergen',
  increase: 'Erhöhen',
  lastPage: 'Letzte Seite',
  loading: 'Wird geladen',
  hue: 'Farbton',
  jumpBackward: 'Zurückspringen',
  jumpForward: 'Vorwärtsspringen',
  next: 'Nächste',
  numberOfTotal: (number, total) => `${number} von ${total}`,
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
  spoiler: 'Spoiler',
  visualComparisonSlider: 'Visueller Vergleichsregler',
  zoomIn: 'Heranzoomen',
  zoomOut: 'Herauszoomen'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
