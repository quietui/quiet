import '../translations/en.js';
import { Localize as LocalizeController } from '@quietui/squeak';
import type { Translation as DefaultTranslation } from '@quietui/squeak';

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
  copied: string;
  copyToClipboard: string;
  dragFileHereOrChooseFromFolder: string;
  dragFilesHereOrChooseFromFolder: string;
  error: string;
  hidePassword: string;
  hue: string;
  opacity: string;
  numberOutOfTotal: (number: number, total: number) => string;
  percentLuminosity: (percentage: string) => string;
  percentSaturation: (percentage: string) => string;
  loading: string;
  remove: string;
  selectAColorFromTheScreen: string;
  showPassword: string;
}
