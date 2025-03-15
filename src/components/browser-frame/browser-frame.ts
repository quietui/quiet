import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './browser-frame.styles.js';

/**
 * <quiet-browser-frame>
 *
 * @summary An on-page browser UI that displays arbitrary content.
 * @documentation https://quietui.org/docs/components/browser-frame
 * @status stable
 * @since 1.0
 *
 * @slot - The content to display in the browser window body.
 * @slot icon - An optional icon to display at the start of the address bar.
 *
 * @csspart header - The browser frame's header that contains controls and address bar.
 * @csspart controls - The browser frame's control buttons container (red, yellow, green dots).
 * @csspart address-bar - The browser frame's address bar. Either an `<a>` or a `<span>` depending on `href`.
 * @csspart body - The browser frame's body, where content shows.
 *
 * @cssproperty --address-background-color - Background color for the address bar.
 * @cssproperty --address-color - Text color for the address bar.
 * @cssproperty --border-color - Border color for the browser frame.
 * @cssproperty --body-padding - Padding to apply to the browser frame's body.
 * @cssproperty --header-background-color - Background color for the header.
 * @cssproperty --header-height - Height of the browser frame header.
 * @cssproperty --button-size - Size of the control buttons.
 * @cssproperty --button-spacing - Spacing between control buttons.
 */
@customElement('quiet-browser-frame')
export class QuietBrowserFrame extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The label to display in the address bar. This will override the domain that shows when using `href`. */
  @property() label = '';

  /**
   * When set, the address bar will be wrapped by a link that goes to this URL. A human-readable domain name will be
   * shown in the address bar unless `label` is also provided.
   */
  @property() href = '';

  /** Opens the link in the specified target. Only works when `href` is set. */
  @property() target: '_blank' | '_parent' | '_self' | '_top' | undefined;

  /**
   * Sets the link's `rel` attribute.  Only works when `href` is set. When linking to an external domain, you should
   * probably set this to `noreferrer noopener`.
   */
  @property() rel?: string;

  /** Sets the link's `download` attribute, causing the linked file to be downloaded. Only works when `href` is set. */
  @property() download?: string;

  /**
   * When set, removes all padding from the body element. Useful for slotting images and videos that span edge-to-edge.
   */
  @property({ type: Boolean, reflect: true }) flush = false;

  /** Extracts a clean domain from a URL string */
  private getDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch (e) {
      // If parsing fails, return the original URL as fallback
      return url;
    }
  }

  render() {
    const hasLink = this.href;
    const label = this.label || (this.href ? this.getDomain(this.href) : '');

    return html`
      <header id="header" part="header">
        <div id="controls" part="controls">
          <span class="button close"></span>
          <span class="button minimize"></span>
          <span class="button maximize"></span>
        </div>
        ${hasLink
          ? html`
              <a
                id="address-bar"
                part="address-bar"
                href="${this.href}"
                target="${ifDefined(this.target)}"
                rel="${ifDefined(this.rel)}"
                download="${ifDefined(this.download)}"
              >
                <div id="url-container">
                  <slot name="icon"></slot>
                  <span id="url-text"><span>${label}</span></span>
                </div>
              </a>
            `
          : html`
              <span id="address-bar" part="address-bar">
                <div id="url-container">
                  <slot name="icon"></slot>
                  <span id="url-text"><span>${label}</span></span>
                </div>
              </span>
            `}
      </header>

      <div id="body" part="body" class="${this.flush ? 'flush' : ''}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-browser-frame': QuietBrowserFrame;
  }
}
