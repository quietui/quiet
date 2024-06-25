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
    return getLibraryPath(`assets/icons/${family}/${name}.svg`);
  }
});

// Register the system icon library. We hard code these ones so they load instantly.
registerIconLibrary('system', {
  resolve: (name, family) => {
    const encode = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

    if (name === 'check' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
      `);
    }

    if (name === 'chevron-down' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
      `);
    }

    if (name === 'chevron-right' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
      `);
    }

    if (name === 'copy' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
      `);
    }

    if (name === 'eye' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
      `);
    }

    if (name === 'eye-off' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
      `);
    }

    if (name === 'minus' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
      `);
    }

    if (name === 'plus' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
      `);
    }

    if (name === 'user' && family === 'filled') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d"M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
      `);
    }

    if (name === 'circle-x' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>
      `);
    }

    if (name === 'x' && family === 'outline') {
      return encode(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
      `);
    }

    return encode('');
  }
});
