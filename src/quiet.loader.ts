import { startLoader } from './quiet.js';

startLoader();

export * from './quiet.js';

// Remove the `quiet-reduce-fouce` class after initial discovery or after two seconds, whichever comes first. This
// technique coupled with the styles in Quiet Restyle offer an easy way to eliminate FOUCE.
Promise.race([
  new Promise(resolve => document.addEventListener('quiet-discovery-complete', resolve)),
  new Promise(resolve => setTimeout(resolve, 2000))
]).then(() => document.documentElement.classList.remove('quiet-reduce-fouce'));
