import { registerDefaultTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  loading: 'Loading'
};

registerDefaultTranslation(translation);

export default translation;
