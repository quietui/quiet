import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

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
  loading: 'Cargando',
  hue: 'Matiz',
  opacity: 'Opacidad',
  percentLuminosity: (percentage: string) => `${percentage} luminosidad`,
  percentSaturation: (percentage: string) => `${percentage} de saturación`,
  remove: 'Remover',
  showPassword: 'Mostrar contraseña'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
