import type { Translation } from '../utilities/localize.js';
import { registerDefaultTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  breadcrumbs: 'Breadcrumbs',
  carousel: 'Carousel',
  clearEntry: 'Clear entry',
  close: 'Close',
  collapse: 'Collapse',
  colorValue: 'Color value',
  copied: 'Copied',
  copyToClipboard: 'Copy to clipboard',
  decrease: 'Decrease',
  disabled: 'disabled',
  dragFileHereOrChooseFromFolder: 'Drag file here or choose from folder',
  dragFilesHereOrChooseFromFolder: 'Drag files here or choose from folder',
  error: 'Error',
  expand: 'Expand',
  feed: 'Feed',
  firstPage: 'First page',
  hidePassword: 'Hide password',
  hide: 'Hide',
  hue: 'Hue',
  increase: 'Increase',
  itemAdded: item => `${item} added`,
  itemRemoved: item => `${item} removed`,
  itemSelected: item => `${item} selected`,
  jumpBackward: 'Jump backward',
  jumpForward: 'Jump forward',
  lastPage: 'Last page',
  loading: 'Loading',
  multipleSelectionsAllowed: 'Multiple selections allowed.',
  next: 'Next',
  noResultsFound: 'No results found',
  numberOfTotal: (number, total) => `${number} of ${total}`,
  opacity: 'Opacity',
  pageNumber: number => `Page ${number}`,
  pagination: 'Pagination',
  percentLuminosity: (percentage: string) => `${percentage} luminosity`,
  percentSaturation: (percentage: string) => `${percentage} saturation`,
  pleaseSelectAnOption: 'Please select an option',
  pressSpaceForOneSecondToActivate: 'Press space bar for one second to activate',
  previous: 'Previous',
  remove: 'Remove',
  removeItem: item => `Remove ${item}`,
  resize: 'Resize',
  resultsAvailable: count => {
    if (count === 1) return '1 result available';
    return `${count} results available`;
  },
  scrollableRegion: 'Scrollable region',
  selectAColorFromTheScreen: 'Select a color from the screen',
  selected: 'Selected',
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
  spoiler: 'Spoiler',
  toggleNavigation: 'Toggle navigation',
  useArrowKeysToNavigateEnterToSelect: 'Use arrow keys to navigate options. Press Enter to select.',
  visualComparisonSlider: 'Visual comparison slider',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out'
};

registerDefaultTranslation(translation);

export default translation;
