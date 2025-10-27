import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  breadcrumbs: 'Хлебные крошки',
  carousel: 'Карусель',
  clearEntry: 'Очистить запись',
  close: 'Закрыть',
  collapse: 'Свернуть',
  colorValue: 'Значение цвета',
  copied: 'Скопировано',
  copyToClipboard: 'Скопировать в буфер обмена',
  decrease: 'Уменьшить',
  disabled: 'отключено',
  dragFileHereOrChooseFromFolder: 'Перетащите файл сюда или выберите из папки',
  dragFilesHereOrChooseFromFolder: 'Перетащите файлы сюда или выберите из папки',
  error: 'Ошибка',
  expand: 'Развернуть',
  feed: 'Лента',
  firstPage: 'Первая страница',
  hidePassword: 'Скрыть пароль',
  hide: 'Скрыть',
  hue: 'Оттенок',
  increase: 'Увеличить',
  itemAdded: item => `${item} добавлено`,
  itemRemoved: item => `${item} удалено`,
  itemSelected: item => `${item} выбрано`,
  jumpBackward: 'Перейти назад',
  jumpForward: 'Перейти вперёд',
  lastPage: 'Последняя страница',
  loading: 'Загрузка',
  multipleSelectionsAllowed: 'Разрешен множественный выбор.',
  next: 'Следующий',
  noResultsFound: 'Результаты не найдены',
  numberOfTotal: (number, total) => `${number} из ${total}`,
  opacity: 'Непрозрачность',
  pageNumber: number => `Страница ${number}`,
  pagination: 'Пагинация',
  percentLuminosity: (percentage: string) => `${percentage} яркость`,
  percentSaturation: (percentage: string) => `${percentage} насыщенность`,
  pleaseSelectAnOption: 'Пожалуйста, выберите вариант',
  pressSpaceForOneSecondToActivate: 'Нажмите пробел и удерживайте одну секунду, чтобы активировать',
  previous: 'Предыдущий',
  remove: 'Удалять',
  removeItem: item => `Удалить ${item}`,
  resize: 'Изменить размер',
  resultsAvailable: count => {
    if (count === 1) return '1 результат доступен';
    if (count >= 2 && count <= 4) return `${count} результата доступно`;
    return `${count} результатов доступно`;
  },
  scrollableRegion: 'Прокручиваемая область',
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  selected: 'Выбрано',
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
  toggleNavigation: 'Переключить навигацию',
  useArrowKeysToNavigateEnterToSelect: 'Используйте стрелки для навигации по вариантам. Нажмите Enter для выбора.',
  visualComparisonSlider: 'Ползунок визуального сравнения',
  zoomIn: 'Приблизить',
  zoomOut: 'Отдалить'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
