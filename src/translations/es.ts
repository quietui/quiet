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
  copied: 'Copiado',
  copyToClipboard: 'Copiar al portapapeles',
  dragFileHereOrChooseFromFolder: 'Arrastra el archivo aquí o elige una carpeta',
  dragFilesHereOrChooseFromFolder: 'Arrastra archivos aquí o elige una carpeta',
  error: 'Error',
  hidePassword: 'Ocultar contraseña',
  hide: 'Ocultar',
  loading: 'Cargando',
  hue: 'Matiz',
  numberOutOfTotal: (number, total) => `${number} de ${total}`,
  opacity: 'Opacidad',
  percentLuminosity: (percentage: string) => `${percentage} luminosidad`,
  percentSaturation: (percentage: string) => `${percentage} de saturación`,
  pressSpaceToFlipTheCard: 'Presione la barra espaciadora para voltear la tarjeta',
  remove: 'Remover',
  selectAColorFromTheScreen: 'Seleccione un color de la pantalla',
  showPassword: 'Mostrar contraseña',
  show: 'Mostrar',
  spoiler: 'Spoiler'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
