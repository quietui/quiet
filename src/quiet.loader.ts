import { startLoader } from './quiet.js';

export * from './quiet.js';

startLoader();

// Remove the `quiet-cloak` class after initial discovery or after two seconds, whichever comes first. This ensures the
// screen doesn't flash blank when new components are added dynamically.
Promise.race([
  new Promise(resolve => document.addEventListener('quiet-discovery-complete', resolve)),
  new Promise(resolve => setTimeout(resolve, 2000))
]).then(() => {
  document.querySelectorAll('.quiet-cloak').forEach(el => el.classList.remove('quiet-cloak'));
});
