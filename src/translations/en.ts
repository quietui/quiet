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
  dragFileHereOrChooseFromFolder: 'Drag file here or choose from folder',
  dragFilesHereOrChooseFromFolder: 'Drag files here or choose from folder',
  error: 'Error',
  hidePassword: 'Hide password',
  loading: 'Loading',
  remove: 'Remove',
  showPassword: 'Show password'
};

registerDefaultTranslation(translation);

export default translation;
