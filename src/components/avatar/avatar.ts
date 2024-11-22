import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './avatar.styles.js';

/**
 * <quiet-avatar>
 *
 * @summary Avatars provide a visual representation of a user to enhance personalization and recognition.
 * @documentation https://quietui.org/docs/components/avatar
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot icon - A custom icon to use instead of the default. Will not be shown when an image or initials are present.
 *  For best results, use a `<quiet-icon>` or an `<svg>` element.
 *
 * @cssproperty [--size=3rem] - The size of the avatar to draw.
 */
@customElement('quiet-avatar')
export class QuietAvatar extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @state() hasImageLoaded = false;

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

  firstUpdated() {
    this.setAttribute('role', 'img');
    this.setAttribute('aria-label', this.label ?? '');
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('label') && this.label) {
      this.setAttribute('aria-label', this.label);
    }
  }

  render() {
    return html`
      ${this.characters
        ? html` <span id="characters" data-length=${this.characters.length}>${this.characters.slice(0, 5)}</span> `
        : html`
            <slot name="icon">
              <quiet-icon library="system" family="filled" name="user"></quiet-icon>
            </slot>
          `}
      ${this.image
        ? html`
            <img
              id="image"
              role="presentation"
              src=${this.image}
              alt=""
              @load=${() => (this.hasImageLoaded = true)}
              @error=${() => (this.hasImageLoaded = false)}
              ?hidden=${!this.hasImageLoaded}
            />
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-avatar': QuietAvatar;
  }
}
