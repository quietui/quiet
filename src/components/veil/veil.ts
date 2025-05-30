// veil.ts
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import {
  QuietActivateEvent,
  QuietBeforeActivateEvent,
  QuietBeforeDeactivateEvent,
  QuietDeactivateEvent
} from '../../events/activate.js';
import hostStyles from '../../styles/host.styles.js';
import { animateWithClass } from '../../utilities/animate.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../spinner/spinner.js';
import styles from './veil.styles.js';

/**
 * <quiet-veil>
 *
 * @summary Veils are used to cover elements visually and disable interaction during important states such as loading.
 * @documentation https://quietui.org/docs/components/veil
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-spinner
 *
 * @slot - The content to be covered when the veil state is active.
 * @slot front - Content to show in front of the veil, such as a custom loading indicator or message.
 *
 * @event quiet-before-activate - Emitted when the veil will activate. Calling `event.preventDefault()` will prevent
 *  the activation from occurring.
 * @event quiet-activate - Emitted immediately after the veil is activated.
 * @event quiet-before-deactivate - Emitted when the veil will deactivate. Calling `event.preventDefault()` will
 *  prevent the deactivation from occurring.
 * @event quiet-deactivate - Emitted immediately after the veil is deactivated.
 *
 * @cssproperty [--blur=3px] - The amount of blur to apply to the veil when active.
 * @cssproperty [--show-duration=300] - The duration of the show/hide animation.
 *
 * @cssstate active - Applied when the veil is active.
 */
@customElement('quiet-veil')
export class QuietVeil extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('#front') front: HTMLDivElement;

  /** The label for screen readers when veil is active. */
  @property({ type: String, attribute: 'aria-label' }) label = '';

  /** Description of the property. */
  @property({ type: Boolean, reflect: true }) active = false;

  updated(changedProperties: PropertyValues<this>) {
    // Activate or deactivate the veil
    if (changedProperties.has('active')) {
      if (this.active && !this.customStates.has('active')) {
        this.activate();
      } else if (!this.active && this.customStates.has('active')) {
        this.deactivate();
      }
    }
  }

  /** Activates the veil. */
  private async activate() {
    const beforeActivateEvent = new QuietBeforeActivateEvent();
    this.dispatchEvent(beforeActivateEvent);
    if (beforeActivateEvent.defaultPrevented) {
      this.active = false;
      return;
    }

    this.customStates.set('active', true);
    await animateWithClass(this.front, 'show');
    this.dispatchEvent(new QuietActivateEvent());
  }

  /** Deactivates the veil. */
  private async deactivate() {
    const beforeDeactivateEvent = new QuietBeforeDeactivateEvent();
    this.dispatchEvent(beforeDeactivateEvent);
    if (beforeDeactivateEvent.defaultPrevented) {
      this.active = true;
      return;
    }

    await animateWithClass(this.front, 'hide');
    this.customStates.set('active', false);
    this.dispatchEvent(new QuietDeactivateEvent());
  }

  render() {
    return html`
      <div id="front" role="status" aria-live="polite" aria-label=${this.label || this.localize.term('loading')}>
        <slot name="front">
          <quiet-spinner></quiet-spinner>
        </slot>
      </div>

      <div
        ?inert=${this.active}
        aria-busy=${this.active ? 'true' : 'false'}
        aria-hidden=${this.active ? 'true' : 'false'}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-veil': QuietVeil;
  }
}
