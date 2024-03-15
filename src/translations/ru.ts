import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  loading: 'Загрузка'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
