import type { Translation as DefaultTranslation } from '@quietui/squeak';
import { Localize as LocalizeController } from '@quietui/squeak';
import '../translations/en.js';

// Extend the controller and apply our own translation interface for better typings
export class Localize extends LocalizeController<Translation> {}

// Export functions from the localize lib so we have one central place to import them from
export { registerDefaultTranslation, registerTranslation } from '@quietui/squeak';

export interface Translation extends DefaultTranslation {
  // Metadata
  $code: string;
  $name: string;
  $dir: 'ltr' | 'rtl';

  // Translated terms
  breadcrumbs: string;
  clearEntry: string;
  close: string;
  colorValue: string;
  copied: string;
  copyToClipboard: string;
  dragFileHereOrChooseFromFolder: string;
  dragFilesHereOrChooseFromFolder: string;
  error: string;
  firstPage: string;
  hidePassword: string;
  hide: string;
  hue: string;
  jumpBackward: string;
  jumpForward: string;
  lastPage: string;
  next: string;
  numberOutOfTotal: (number: number, total: number) => string;
  opacity: string;
  pageNumber: (number: number) => string;
  pagination: string;
  percentLuminosity: (percentage: string) => string;
  percentSaturation: (percentage: string) => string;
  pressSpaceForOneSecondToActivate: string;
  previous: string;
  loading: string;
  remove: string;
  resize: string;
  scrollableRegion: string;
  selectAColorFromTheScreen: string;
  share: string;
  showPassword: string;
  show: string;
  showingNumberOfTotalItems: (number: number, total: number) => string;
  showingAllNumberItems: (number: number) => string;
  spoiler: string;
}
