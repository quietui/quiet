import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

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
  hide: 'Скрыть',
  loading: 'Загрузка',
  hue: 'Оттенок',
  numberOutOfTotal: (number, total) => `${number} из ${total}`,
  opacity: 'Непрозрачность',
  percentLuminosity: (percentage: string) => `${percentage} яркость`,
  percentSaturation: (percentage: string) => `${percentage} насыщенность`,
  pressSpaceToFlipTheCard: 'Нажмите пробел, чтобы перевернуть карту',
  remove: 'Удалять',
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  showPassword: 'Показать пароль',
  show: 'Показать',
  spoiler: 'Спойлер'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
