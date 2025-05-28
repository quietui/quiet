/**
 * Wraps a callback in a view transition if supported by the browser. Falls back to executing the callback directly if
 * not supported.
 */
export function doViewTransition(callback: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
}
