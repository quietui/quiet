import type { CSSResultGroup, PropertyValues } from 'lit';
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
 * @slot expand-label - The label for the button that expands the content.
 * @slot collapse-label - The label for the button that collapses the content.
 *
 * @event quiet-before-open - Emitted before the expander opens. Cancelable event that prevents opening when canceled.
 * @event quiet-open - Emitted after the expander has opened.
 * @event quiet-before-close - Emitted before the expander closes. Cancelable event that prevents closing when canceled.
 * @event quiet-close - Emitted after the expander has closed.
 *
 * @csspart content - The container holding the expandable content.
 * @csspart toggle - The button that toggles between expanded and collapsed states.
 *
 * @cssproperty [--preview-height=3lh] - The visible height of the expander's content when collapsed.
 * @cssproperty [--duration=300ms] - The duration of the expand/collapse animation.
 * @cssproperty [--easing=ease] - The easing to use for the expand/collapse animation.
 *
 * @cssstate disabled - Applied when the expander is disabled.
 * @cssstate expanded - Applied when the content is expanded.
 */
@customElement('quiet-expander')
export class QuietExpander extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('#content') content: HTMLElement;

  /** Whether the content is expanded */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Disables the expand/collapse functionality */
  @property({ type: Boolean, reflect: true }) disabled = false;

  firstUpdated() {
    // This prevents expanders that are initially expanded from animation on page load
    requestAnimationFrame(() => {
      this.content.classList.add('has-updated');
    });
  }

  /** Update max-height when the expanded property changes */
  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }

    if (changedProperties.has('expanded')) {
      this.customStates.set('expanded', this.expanded);
      if (this.expanded) {
        this.content.style.maxHeight = `${this.content.scrollHeight}px`;
      } else {
        this.content.style.maxHeight = getComputedStyle(this).getPropertyValue('--preview-height');
      }
    }
  }

  private handleClick() {
    this.toggleExpanded(true);
  }

  /** Toggle the expanded state */
  private toggleExpanded(wasUserInteraction = false) {
    const willExpand = !this.expanded;

    if (wasUserInteraction) {
      const beforeEvent = willExpand ? new QuietBeforeOpenEvent() : new QuietBeforeCloseEvent({ source: this });

      this.dispatchEvent(beforeEvent);
      if (beforeEvent.defaultPrevented) {
        return;
      }
    }

    this.expanded = willExpand;

    // Dispatch the event when the transition completes
    if (wasUserInteraction) {
      this.content.addEventListener(
        'transitionend',
        () => {
          this.dispatchEvent(willExpand ? new QuietOpenEvent() : new QuietCloseEvent());
        },
        { once: true }
      );
    }
  }

  render() {
    return html`
      <div
        id="content"
        part="content"
        class=${classMap({
          expanded: this.expanded
        })}
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
        ?disabled=${this.disabled}
        @click="${this.handleClick}"
      >
        ${this.expanded
          ? html`<slot name="collapse-label">${this.localize.term('collapse')}</slot>`
          : html`<slot name="expand-label">${this.localize.term('expand')}</slot>`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-expander': QuietExpander;
  }
}
