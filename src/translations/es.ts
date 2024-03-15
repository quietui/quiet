import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  loading: 'Cargando'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
