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
  error: 'Error',
  hidePassword: 'Ocultar contraseña',
  loading: 'Cargando',
  showPassword: 'Mostrar contraseña'
  /* cSpell:enable */
};

registerTranslation(translation);

export default translation;
