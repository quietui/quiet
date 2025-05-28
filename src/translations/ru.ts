import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  breadcrumbs: 'Панировочные сухари',
  carousel: 'Карусель',
  clearEntry: 'Очистить запись',
  close: 'Закрыть',
  collapse: 'Свернуть',
  colorValue: 'Значение цвета',
  copied: 'Скопировано',
  copyToClipboard: 'Скопировать в буфер обмена',
  decrease: 'Уменьшить',
  dragFileHereOrChooseFromFolder: 'Перетащите файл сюда или выберите из папки',
  dragFilesHereOrChooseFromFolder: 'Перетащите файлы сюда или выберите из папки',
  error: 'Ошибка',
  expand: 'Развернуть',
  firstPage: 'Первая страница',
  hidePassword: 'Скрыть пароль',
  hide: 'Скрыть',
  increase: 'Уменьшить',
  loading: 'Загрузка',
  hue: 'Оттенок',
  jumpBackward: 'Перейти назад',
  jumpForward: 'Перейти вперёд',
  lastPage: 'Последняя страница',
  next: 'Следующий',
  numberOfTotal: (number, total) => `${number} из ${total}`,
  opacity: 'Непрозрачность',
  pageNumber: number => `Страница ${number}`,
  pagination: 'Пагинация',
  percentLuminosity: (percentage: string) => `${percentage} яркость`,
  percentSaturation: (percentage: string) => `${percentage} насыщенность`,
  pressSpaceForOneSecondToActivate: 'Нажмите пробел и удерживайте одну секунду, чтобы активировать',
  previous: 'Предыдущий',
  remove: 'Удалять',
  resize: 'Изменить размер',
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
  spoiler: 'Спойлер',
  visualComparisonSlider: 'Ползунок визуального сравнения',
  zoomIn: 'Приблизить',
  zoomOut: 'Отдалить'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
