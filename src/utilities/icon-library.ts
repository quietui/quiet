import { getLibraryPath } from './library.js';
import type { QuietIcon } from '../components/icon/icon.js';

export type ResolveFunction = (name: string, family: string) => string;
export type MutateFunction = (svg: SVGElement) => void;

export interface Library {
  resolve: ResolveFunction;
  mutate?: MutateFunction;
}

const libraries = new Map<string, Library>();
const connectedIcons = new Set<QuietIcon>();

/** Registers a new icon library. */
export function registerIconLibrary(name: string, library: Library) {
  libraries.set(name, library);
  updateConnectedIcons();
}

/** Removes a previously registered icon library. */
export function unregisterIconLibrary(name: string) {
  libraries.delete(name);
  updateConnectedIcons();
}

/** Gets a registered icon library. */
export function getLibrary(name: string) {
  return libraries.get(name);
}

/** Call this when an icon is connected to make it reactive to changes to icon libraries. */
export function connectIcon(el: QuietIcon) {
  connectedIcons.add(el);
}

/** Call this when an icon is disconnected and no longer needs to be reactive. */
export function disconnectIcon(el: QuietIcon) {
  connectedIcons.delete(el);
}

/** Gets an array of all icons that are currently connected. */
export function getObservedIcons() {
  return [...connectedIcons];
}

/**
 * Updates all connected icons from the specified library. Call this after registering, unregistering, or making changes
 * to an icon library to make sure icons refresh.
 */
export async function updateConnectedIcons() {
  return Promise.all([...connectedIcons].map(icon => icon.load()));
}

// Register the default icon library
registerIconLibrary('default', {
  resolve: (name, family) => {
    let folder = '24/outline';
    if (family === 'solid') folder = '24/solid';
    if (family === 'mini') folder = '20/solid';
    if (family === 'micro') folder = '16/solid';

    return getLibraryPath(`assets/icons/${folder}/${name}.svg`);
  }
});

// Register the system icon library. We hard code these ones so they load instantly.
registerIconLibrary('system', {
  resolve: (name, family) => {
    const encode = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

    if (name === 'check' && family === 'outline') {
      return encode(`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>`);
    }

    if (name === 'square-2-stack' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
        </svg>
      `);
    }

    if (name === 'user' && family === 'solid') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
        </svg>
      `);
    }

    if (name === 'x-mark' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      `);
    }

    return encode('');
  }
});
