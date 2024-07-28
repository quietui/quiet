import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  breadcrumbs: 'Панировочные сухари',
  clearEntry: 'Очистить запись',
  close: 'Закрыть',
  copied: 'Скопировано',
  copyToClipboard: 'Скопировать в буфер обмена',
  dragFileHereOrChooseFromFolder: 'Перетащите файл сюда или выберите из папки',
  dragFilesHereOrChooseFromFolder: 'Перетащите файлы сюда или выберите из папки',
  error: 'Ошибка',
  hidePassword: 'Скрыть пароль',
  loading: 'Загрузка',
  hue: 'Оттенок',
  opacity: 'Непрозрачность',
  percentLuminosity: (percentage: string) => `${percentage} яркость`,
  percentSaturation: (percentage: string) => `${percentage} насыщенность`,
  remove: 'Удалять',
  showPassword: 'Показать пароль'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
