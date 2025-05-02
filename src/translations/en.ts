import type { Translation } from '../utilities/localize.js';
import { registerDefaultTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  breadcrumbs: 'Breadcrumbs',
  clearEntry: 'Clear entry',
  close: 'Close',
  colorValue: 'Color value',
  copied: 'Copied',
  copyToClipboard: 'Copy to clipboard',
  dragFileHereOrChooseFromFolder: 'Drag file here or choose from folder',
  dragFilesHereOrChooseFromFolder: 'Drag files here or choose from folder',
  error: 'Error',
  firstPage: 'First page',
  hidePassword: 'Hide password',
  hide: 'Hide',
  jumpBackward: 'Jump backward',
  jumpForward: 'Jump forward',
  lastPage: 'Last page',
  loading: 'Loading',
  hue: 'Hue',
  next: 'Next',
  numberOutOfTotal: (number, total) => `${number} out of ${total}`,
  opacity: 'Opacity',
  pageNumber: number => `Page ${number}`,
  pagination: 'Pagination',
  percentLuminosity: (percentage: string) => `${percentage} luminosity`,
  percentSaturation: (percentage: string) => `${percentage} saturation`,
  pressSpaceForOneSecondToActivate: 'Press space bar for one second to activate',
  previous: 'Previous',
  remove: 'Remove',
  resize: 'Resize',
  scrollableRegion: 'Scrollable region',
  selectAColorFromTheScreen: 'Select a color from the screen',
  share: 'Share',
  showPassword: 'Show password',
  show: 'Show',
  showingNumberOfTotalItems: (number: number, total: number) => {
    if (number === 1) return `Showing ${number} of ${total} ${total === 1 ? 'item' : 'items'}`;
    return `Showing ${number} of ${total} items`;
  },
  showingAllNumberItems: (number: number) => {
    if (number === 1) return `Showing ${number} item`;
    return `Showing all ${number} items`;
  },
  spoiler: 'Spoiler'
};

registerDefaultTranslation(translation);

export default translation;
