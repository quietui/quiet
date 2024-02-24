import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './badge.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-badge>
 *
 * @summary Badges display useful information or notifications such as an unread message count or a new feature.
 * @documentation https://quietui.com/docs/components/badge
 * @status stable
 * @since 1.0
 *
 * @cssproperty [--attention-duration=1.5s] - The speed at which the attention animation will run.
 * @cssproperty [--attention-easing=ease] - The easing to use for the attention animation.
 */
@customElement('quiet-badge')
export class Badge extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The type of badge to draw. */
  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'confirmative' | 'destructive' = 'secondary';

  /** Makes the badge draw attention using one of the signal presets. */
  @property({ reflect: true }) attention?: 'pulse' | 'shake' | 'wobble';

  render() {
    return html` <slot></slot> `;
  }
}
