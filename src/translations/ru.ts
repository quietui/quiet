import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  copied: 'Скопировано',
  copyToClipboard: 'Скопировать в буфер обмена',
  error: 'Ошибка',
  loading: 'Загрузка'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
