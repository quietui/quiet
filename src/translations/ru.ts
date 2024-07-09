import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  breadcrumbs: 'Панировочные сухари',
  browseForFilesOrDragAndDrop: 'Просматривайте файлы или перетаскивайте их',
  clearEntry: 'Очистить запись',
  close: 'Закрыть',
  copied: 'Скопировано',
  copyToClipboard: 'Скопировать в буфер обмена',
  error: 'Ошибка',
  hidePassword: 'Скрыть пароль',
  loading: 'Загрузка',
  remove: 'Удалять',
  showPassword: 'Показать пароль'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
