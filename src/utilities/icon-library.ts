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

    if (name === 'chevron-down' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      `);
    }

    if (name === 'clipboard' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
        </svg>
      `);
    }

    if (name === 'eye' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      `);
    }

    if (name === 'eye-slash' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
      `);
    }

    if (name === 'minus' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
      `);
    }

    if (name === 'plus' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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

    if (name === 'x-circle' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
