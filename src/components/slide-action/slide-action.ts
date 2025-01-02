import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './slide-action.styles.js';

/**
 * TODO
 *
 * - Localize built-in labels
 * - RTL
 * - Add keyboard support (space or arrow right should move it while pressed and revert when released)
 * - Add mouse/touch support. The thumb should follow the pointer and animate back naturally when released; if the thumb
 *   reaches 100% then pause the thumb's position, show a brief pulse animation, and then animate it back afterwards.
 * - Dispatch the `quiet-action` event when the
 * - Dispatch a `quiet-progress` event? This would let the user hook into progress to update styles and such.
 */

/**
 * <quiet-slide-action>
 *
 * @summary Slide actions give users a draggable handle that must be moved to the end of the track to trigger an action.
 * @documentation https://quietui.org/docs/components/slide-action
 * @status experimental
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot label - The slide actions label. For plain-text labels, you can use the `label` attribute instead.
 * @slot thumb - The
 *
 * @csspart thumb - The slide action's thumb.
 * @csspart label - The slide action's label.
 */
@customElement('quiet-slide-action')
export class QuietSlideAction extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @state() progress = 0;

  /**
   * The label to show in the slide action's track. If you need to provide HTML in the label, use the `label` slot
   * instead.
   */
  @property() label = '';

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('label')) {
      // this.example has changed
    }
  }

  render() {
    return html`
      <div id="label" part="label">
        <slot name="label">${this.label}</slot>
      </div>

      <div
        id="thumb"
        part="thumb"
        tabindex="0"
        role="slider"
        aria-labelledby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${Math.round(this.progress)}"
        aria-valuetext=${`${Math.round(this.progress)}%`}
      >
        <slot name="thumb">
          <quiet-icon library="system" name="chevrons-right"></quiet-icon>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-slide-action': QuietSlideAction;
  }
}
