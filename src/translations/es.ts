import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  breadcrumbs: 'Migas de pan',
  clearEntry: 'Borrar entrada',
  close: 'Cerrar',
  colorValue: 'Valor del color',
  copied: 'Copiado',
  copyToClipboard: 'Copiar al portapapeles',
  dragFileHereOrChooseFromFolder: 'Arrastra el archivo aquí o elige una carpeta',
  dragFilesHereOrChooseFromFolder: 'Arrastra archivos aquí o elige una carpeta',
  error: 'Error',
  firstPage: 'Primera página',
  hidePassword: 'Ocultar contraseña',
  hide: 'Ocultar',
  lastPage: 'Última página',
  loading: 'Cargando',
  hue: 'Matiz',
  next: 'Siguiente',
  numberOutOfTotal: (number, total) => `${number} de ${total}`,
  opacity: 'Opacidad',
  pageNumber: number => `Página ${number}`,
  pagination: 'Paginación',
  percentLuminosity: (percentage: string) => `${percentage} luminosidad`,
  percentSaturation: (percentage: string) => `${percentage} de saturación`,
  pressSpaceForOneSecondToActivate: 'Presione la barra espaciadora durante un segundo para activar',
  previous: 'Anterior',
  remove: 'Remover',
  resize: 'Redimensionar',
  scrollableRegion: 'Región desplazable',
  selectAColorFromTheScreen: 'Seleccione un color de la pantalla',
  share: 'Compartir',
  showPassword: 'Mostrar contraseña',
  show: 'Mostrar',
  showingNumberOfTotalItems: (number: number, total: number) => {
    if (number === 1) return `Mostrando ${number} de ${total} ${total === 1 ? 'elemento' : 'elementos'}`;
    return `Mostrando ${number} de ${total} elementos`;
  },
  showingAllNumberItems: (number: number) => {
    if (number === 1) return `Mostrando ${number} elemento`;
    return `Mostrando todos los ${number} elementos`;
  },
  spoiler: 'Spoiler'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
