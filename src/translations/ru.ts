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
  colorValue: 'Значение цвета',
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
  pressSpaceForOneSecondToActivate: 'Нажмите пробел и удерживайте одну секунду, чтобы активировать',
  remove: 'Удалять',
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  scrollableRegion: 'Прокручиваемая область',
  share: 'Делиться',
  showPassword: 'Показать пароль',
  show: 'Показать',
  showingNumberOfTotalItems: (number: number, total: number) => {
    if (number === 1) return `Показано ${number} из ${total} ${total === 1 ? 'элемента' : 'элементов'}`;
    return `Показано ${number} из ${total} элементов`;
  },
  showingAllNumberItems: (number: number) => {
    if (number === 1) return `Показано ${number} элемент`;
    return `Показано все ${number} элемента`;
  },
  spoiler: 'Спойлер'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
