import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './include.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * Store a cache of fetch requests by URL to prevent HTTP requests to the same resources from stacking up and to make
 * subsequent requests load faster.
 */
const requests = new Map<string, Promise<Response>>();

/**
 * <quiet-include>
 *
 * @summary Includes let you pull content from another file into your page.
 * @documentation https://quietui.com/docs/components/include
 * @status stable
 * @since 1.0
 *
 * @event quiet-included - Emitted when the include file has been fetched and rendered. The HTTP status code will be
 *  available in `event.detail.status`.
 * @event quiet-http-error - Emitted when the fetch receives an HTTP response outside of the 200 range. The HTTP status
 *  code will be `event.detail.status`.
 * @event quiet-network-error - Emitted when the fetch encounters a network error, CORS-related permission errors, etc.
 *  The error will be available in `event.detail.error`.
 */
@customElement('quiet-include')
export class Include extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The URL of the file to include. Must be a CORS-enabled endpoint. */
  @property() src: string;

  /** The mode to use when fetching the request. */
  @property() mode: RequestMode = 'cors';

  /**
   * By default, scripts in included files will not be executed. Setting this to true will allow them to run. If you use
   * this option, make sure you trust the included content, otherwise you may be vulnerable to XSS exploits.
   */
  @property({ attribute: 'allow-scripts', type: Boolean }) allowScripts = false;

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('src')) {
      if (this.src) {
        this.fetchInclude();
      } else {
        this.innerHTML = '';
      }
    }
  }

  /** Runs a script by cloning and replacing it. */
  private runScript(script: HTMLScriptElement) {
    const clonedScript = document.createElement('script');
    [...script.attributes].forEach(attr => clonedScript.setAttribute(attr.name, attr.value));
    clonedScript.textContent = script.textContent;
    script.parentNode!.replaceChild(clonedScript, script);
  }

  /** Fetches the include file and handles the response. */
  private async fetchInclude() {
    const url = this.src;
    const cacheKey = JSON.stringify({ url, allowScripts: this.allowScripts, mode: this.mode });

    this.setAttribute('aria-busy', 'true');

    // Cache new requests so subsequent ones can share it
    if (!requests.has(cacheKey)) {
      requests.set(cacheKey, fetch(this.src, { mode: this.mode }));
    }

    try {
      const response = await requests.get(cacheKey)!;

      if (response.ok) {
        // The response was successful
        this.innerHTML = await response.clone().text();

        if (this.allowScripts) {
          // Run scripts
          this.querySelectorAll('script').forEach(script => this.runScript(script));
        }

        this.emit('quiet-included', {
          detail: {
            status: response.status
          }
        });
      } else {
        // Handle HTTP codes outside the 200 range
        this.innerHTML = '';
        this.emit('quiet-http-error', {
          detail: {
            status: response.status
          }
        });
      }
    } catch (error) {
      // Handle network errors, CORS permissions errors, etc.
      this.innerHTML = '';
      this.emit('quiet-network-error', {
        detail: {
          error
        }
      });
    }

    this.removeAttribute('aria-busy');
  }

  render() {
    return html` <slot></slot> `;
  }
}
