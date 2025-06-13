import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './empty-state.styles.js';

/**
 * <quiet-empty-state>
 *
 * @summary Guides users during first-time experiences or when content is missing, transforming blank spaces into
 *  opportunities with helpful visuals and clear actions.
 * @documentation https://quietui.org/docs/components/empty-state
 * @status stable
 * @since 1.0
 *
 * @slot - Content to show in the empty state. Usually includes a heading, a paragraph, and sometimes buttons.
 * @slot illustration - An optional illustration to show in the empty state. Works well with an image or a
 *  `<quiet-icon>` element.
 *
 * @cssproperty [--content-width=40ch] - The maximum width of the empty state's content. When space is limited, the
 *  content will wrap automatically.
 * @cssproperty --illustration-width - The maximum width of the illustration. By default, this will be half of
 *  `--content-width`. This property does not affect the size of icons.
 *
 * @csspart content - The container that wraps the content.
 * @csspart illustration - The container that wraps the illustration.
 */
@customElement('quiet-empty-state')
export class QuietEmptyState extends QuietElement {
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, styles];

  render() {
    return html`
      ${this.whenSlotted(
        'illustration',
        html`
          <div id="illustration" part="illustration">
            <slot name="illustration"></slot>
          </div>
        `
      )}

      <div id="content" part="content">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-empty-state': QuietEmptyState;
  }
}
