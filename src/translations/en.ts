import { registerDefaultTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  breadcrumbs: 'Breadcrumbs',
  clearEntry: 'Clear entry',
  close: 'Close',
  copied: 'Copied',
  copyToClipboard: 'Copy to clipboard',
  error: 'Error',
  hidePassword: 'Hide password',
  loading: 'Loading',
  showPassword: 'Show password'
};

registerDefaultTranslation(translation);

export default translation;
