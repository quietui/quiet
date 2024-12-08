import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './badge.styles.js';

/**
 * <quiet-badge>
 *
 * @summary Badges display useful information or notifications such as a new feature or an unread message count.
 * @documentation https://quietui.org/docs/components/badge
 * @status stable
 * @since 1.0
 *
 * @slot - The badge's content.
 *
 * @cssproperty [--attention-duration=1.5s] - The speed at which the attention animation will run.
 * @cssproperty [--attention-easing=ease] - The easing to use for the attention animation.
 */
@customElement('quiet-badge')
export class QuietBadge extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The type of badge to draw. */
  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'constructive' | 'destructive' = 'secondary';

  /** Draws attention to the badge using an animation. */
  @property({ type: Boolean, reflect: true }) attention = false;

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-badge': QuietBadge;
  }
}
