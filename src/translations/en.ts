import { registerDefaultTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  copied: 'Copied',
  copyToClipboard: 'Copy to clipboard',
  error: 'Error',
  loading: 'Loading'
};

registerDefaultTranslation(translation);

export default translation;
