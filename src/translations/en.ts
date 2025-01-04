import type { Translation } from '../utilities/localize.js';
import { registerDefaultTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  breadcrumbs: 'Breadcrumbs',
  clearEntry: 'Clear entry',
  close: 'Close',
  copied: 'Copied',
  copyToClipboard: 'Copy to clipboard',
  dragFileHereOrChooseFromFolder: 'Drag file here or choose from folder',
  dragFilesHereOrChooseFromFolder: 'Drag files here or choose from folder',
  error: 'Error',
  hidePassword: 'Hide password',
  hide: 'Hide',
  loading: 'Loading',
  hue: 'Hue',
  numberOutOfTotal: (number, total) => `${number} out of ${total}`,
  opacity: 'Opacity',
  percentLuminosity: (percentage: string) => `${percentage} luminosity`,
  percentSaturation: (percentage: string) => `${percentage} saturation`,
  pressSpaceForOneSecondToActivate: 'Press space bar for one second to activate',
  remove: 'Remove',
  selectAColorFromTheScreen: 'Select a color from the screen',
  showPassword: 'Show password',
  show: 'Show',
  spoiler: 'Spoiler'
};

registerDefaultTranslation(translation);

export default translation;
