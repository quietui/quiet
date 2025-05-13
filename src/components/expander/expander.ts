import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import {
  QuietBeforeCloseEvent,
  QuietBeforeOpenEvent,
  QuietCloseEvent,
  QuietOpenEvent
} from '../../events/open-close.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './expander.styles.js';

/**
 * <quiet-expander>
 *
 * @summary An expandable content container with smooth animation on show/hide
 * @documentation https://quietui.org/docs/components/expander
 * @status stable
 * @since 1.0
 *
 * @slot - The default slot for content to be expanded/collapsed.
 * @slot show-label - The label for the button when content is collapsed.
 * @slot hide-label - The label for the button when content is expanded.
 *
 * @event quiet-before-open - Emitted before the expander opens. Cancelable event that prevents opening when canceled.
 * @event quiet-open - Emitted after the expander has opened.
 * @event quiet-before-close - Emitted before the expander closes. Cancelable event that prevents closing when canceled.
 * @event quiet-close - Emitted after the expander has closed.
 *
 * @csspart content - The container holding the expandable content.
 * @csspart toggle - The button that toggles between expanded and collapsed states.
 *
 * @cssproperty [--preview-height=3lh] - The maximum height of the expander when collapsed.
 */
@customElement('quiet-expander')
export class QuietExpander extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('#content') content: HTMLElement;

  /** Whether the content is expanded */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Toggle the expanded state */
  private toggleExpanded() {
    const willExpand = !this.expanded;
    const beforeEvent = willExpand ? new QuietBeforeOpenEvent() : new QuietBeforeCloseEvent({ source: this });

    // Emit the event and check if it was canceled
    this.dispatchEvent(beforeEvent);
    if (beforeEvent.defaultPrevented) {
      return;
    }

    // Update expanded state
    this.expanded = !this.expanded;

    // Dispatch after event
    this.dispatchEvent(this.expanded ? new QuietOpenEvent() : new QuietCloseEvent());
  }

  render() {
    return html`
      <div
        id="content"
        part="content"
        class=${classMap({ expanded: this.expanded })}
        role="region"
        aria-labelledby="toggle"
      >
        <slot></slot>
      </div>

      <button
        id="toggle"
        part="toggle"
        class="toggle"
        aria-expanded="${this.expanded}"
        aria-controls="content"
        @click="${this.toggleExpanded}"
      >
        ${this.expanded
          ? html`<slot name="hide-label">${this.localize.term('collapse')}</slot>`
          : html`<slot name="show-label">${this.localize.term('expand')}</slot>`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-expander': QuietExpander;
  }
}
