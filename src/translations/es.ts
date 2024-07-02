import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  /* cSpell:disable */
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  breadcrumbs: 'Migas de pan',
  clearEntry: 'Borrar entrada',
  clickToSelectOrDropFilesHere: 'Haga clic para seleccionar o soltar archivos aquí',
  close: 'Cerrar',
  copied: 'Copiado',
  copyToClipboard: 'Copiar al portapapeles',
  error: 'Error',
  hidePassword: 'Ocultar contraseña',
  loading: 'Cargando',
  remove: 'Remover',
  showPassword: 'Mostrar contraseña'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
