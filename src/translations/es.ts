import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  breadcrumbs: 'Migas de pan',
  carousel: 'Carrusel',
  clearEntry: 'Borrar entrada',
  close: 'Cerrar',
  collapse: 'Colapsar',
  colorValue: 'Valor del color',
  copied: 'Copiado',
  copyToClipboard: 'Copiar al portapapeles',
  decrease: 'Disminuir',
  disabled: 'deshabilitado',
  dragFileHereOrChooseFromFolder: 'Arrastra el archivo aquí o elige una carpeta',
  dragFilesHereOrChooseFromFolder: 'Arrastra archivos aquí o elige una carpeta',
  error: 'Error',
  expand: 'Expandir',
  feed: 'Publicaciones',
  firstPage: 'Primera página',
  hidePassword: 'Ocultar contraseña',
  hide: 'Ocultar',
  hue: 'Matiz',
  increase: 'Aumentar',
  itemAdded: item => `${item} añadido`,
  itemRemoved: item => `${item} eliminado`,
  itemSelected: item => `${item} seleccionado`,
  jumpBackward: 'Saltar hacia atrás',
  jumpForward: 'Saltar hacia adelante',
  lastPage: 'Última página',
  loading: 'Cargando',
  multipleSelectionsAllowed: 'Se permiten selecciones múltiples.',
  next: 'Siguiente',
  noResultsFound: 'No se encontraron resultados',
  numberOfTotal: (number, total) => `${number} de ${total}`,
  opacity: 'Opacidad',
  pageNumber: number => `Página ${number}`,
  pagination: 'Paginación',
  percentLuminosity: (percentage: string) => `${percentage} luminosidad`,
  percentSaturation: (percentage: string) => `${percentage} de saturación`,
  pleaseSelectAnOption: 'Por favor, seleccione una opción',
  pressSpaceForOneSecondToActivate: 'Presione la barra espaciadora durante un segundo para activar',
  previous: 'Anterior',
  remove: 'Remover',
  removeItem: item => `Eliminar ${item}`,
  resize: 'Redimensionar',
  resultsAvailable: count => {
    if (count === 1) return '1 resultado disponible';
    return `${count} resultados disponibles`;
  },
  scrollableRegion: 'Región desplazable',
  selectAColorFromTheScreen: 'Seleccione un color de la pantalla',
  selected: 'Seleccionado',
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
  spoiler: 'Spoiler',
  toggleNavigation: 'Alternar navegación',
  useArrowKeysToNavigateEnterToSelect:
    'Use las teclas de flecha para navegar por las opciones. Presione Enter para seleccionar.',
  visualComparisonSlider: 'Control deslizante de comparación visual',
  zoomIn: 'Acercar',
  zoomOut: 'Alejar'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
