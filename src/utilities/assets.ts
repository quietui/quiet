let assetPath = '';

/** Sets the library's asset path to the specified directory or URL. */
export function setAssetPath(path: string) {
  assetPath = path;
}

/**
 * Gets the library's assets path.
 *
 * The asset path is used to load assets such as icons and images. By default, Quiet will look for a script ending in
 * "quiet.js" and guess the asset path relative to the script's location. This "just works" for most users but, if
 * you're bundling the library, you'll need to copy the `assets` folder into your app and point this to that location.
 *
 * The easiest way is to provide a `data-quiet` attribute on any element in the DOM.
 *
 * @example
 *
 *  <html data-quiet="/path/to/assets">
 *
 * @param subpath - An optional path to append to the base path.
 */
export function getAssetPath(subpath = '') {
  if (!assetPath) {
    const quietEl = document.querySelector('[data-quiet]');

    if (quietEl?.hasAttribute('data-quiet')) {
      // Use data-quiet
      setAssetPath(String(quietEl.getAttribute('data-quiet')));
    } else {
      // Use the path to quiet.js or quiet.loader.js
      const scripts = [...document.getElementsByTagName('script')] as HTMLScriptElement[];
      const quietScript = scripts.find(
        script => script.src.endsWith('quiet.js') || script.src.endsWith('quiet.loader.js')
      );

      if (quietScript) {
        const path = String(quietScript.getAttribute('src'));
        setAssetPath(path.split('/').slice(0, -1).join('/'));
      }
    }
  }

  // Return the asset path without a trailing slash and append the subpath
  return assetPath.replace(/\/$/, '') + (subpath ? `/${subpath.replace(/^\//, '')}` : ``);
}
