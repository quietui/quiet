import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './avatar.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-avatar>
 *
 * @summary Avatars provide a visual representation of a user to enhance personalization and recognition.
 * @documentation https://quietui.com/docs/components/avatar
 * @status stable
 * @since 1.0
 *
 * @slot icon - A custom icon to use instead of the default. Will not be shown when an image or initials are present.
 *
 * @cssproperty [--size=3rem] - The size of the avatar to draw.
 */
@customElement('quiet-avatar')
export class Avatar extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /**
   * An accessible label for the avatar. This won't be shown, but it will be read to assistive devices so you should
   * always include one.
   */
  @property() label?: string;

  /**
   * A string of characters to display in the avatar when an image isn't available or fails to load. Up to five
   * characters are supported.
   */
  @property() characters?: string;

  /** The URL of an image to display in the avatar. Non-square images will be clipped to fit. */
  @property() image?: string;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'img');
    this.setAttribute('aria-label', this.label ?? '');
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('label') && this.label) {
      this.setAttribute('aria-label', this.label);
    }
  }

  render() {
    return html`
      ${this.characters
        ? html` <span class="characters" data-length=${this.characters.length}>${this.characters.slice(0, 5)}</span> `
        : html`
            <slot name="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clip-rule="evenodd"
                />
              </svg>
            </slot>
          `}
      ${this.image ? html` <img class="image" role="presentation" src=${this.image} alt="" /> ` : ''}
    `;
  }
}
