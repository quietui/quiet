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
  disabled: 'deaktiviert',
  dragFileHereOrChooseFromFolder: 'Ziehen Sie die Datei hierher oder wählen Sie einen Ordner aus',
  dragFilesHereOrChooseFromFolder: 'Ziehen Sie Dateien hierher oder wählen Sie sie aus einem Ordner aus',
  error: 'Fehler',
  expand: 'Erweitern',
  feed: 'Beiträge',
  firstPage: 'Erste Seite',
  hidePassword: 'Passwort verbergen',
  hide: 'Verbergen',
  hue: 'Farbton',
  increase: 'Erhöhen',
  itemAdded: item => `${item} hinzugefügt`,
  itemRemoved: item => `${item} entfernt`,
  itemSelected: item => `${item} ausgewählt`,
  jumpBackward: 'Zurückspringen',
  jumpForward: 'Vorwärtsspringen',
  lastPage: 'Letzte Seite',
  loading: 'Wird geladen',
  multipleSelectionsAllowed: 'Mehrfachauswahl erlaubt.',
  next: 'Nächste',
  noResultsFound: 'Keine Ergebnisse gefunden',
  numberOfTotal: (number, total) => `${number} von ${total}`,
  opacity: 'Opazität',
  pageNumber: number => `Seite ${number}`,
  pagination: 'Paginierung',
  percentLuminosity: (percentage: string) => `${percentage} Leuchtkraft`,
  percentSaturation: (percentage: string) => `${percentage} Sättigung`,
  pleaseSelectAnOption: 'Bitte wählen Sie eine Option',
  pressSpaceForOneSecondToActivate: 'Zum Aktivieren eine Sekunde lang die Leertaste drücken',
  previous: 'Vorherige',
  remove: 'Entfernen',
  removeItem: item => `${item} entfernen`,
  resize: 'Größe ändern',
  resultsAvailable: count => {
    if (count === 1) return '1 Ergebnis verfügbar';
    return `${count} Ergebnisse verfügbar`;
  },
  scrollableRegion: 'Scrollbarer Bereich',
  selectAColorFromTheScreen: 'Farbe vom Bildschirm auswählen',
  selected: 'Ausgewählt',
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
  toggleNavigation: 'Navigation umschalten',
  useArrowKeysToNavigateEnterToSelect:
    'Verwenden Sie die Pfeiltasten, um durch die Optionen zu navigieren. Drücken Sie Enter zum Auswählen.',
  visualComparisonSlider: 'Visueller Vergleichsregler',
  zoomIn: 'Heranzoomen',
  zoomOut: 'Herauszoomen'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
