import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import hostStyles from '../../styles/host.styles.js';
import { parseCssDuration } from '../../utilities/animate.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './accordion-item.styles.js';

/**
 * <quiet-accordion-item>
 *
 * @summary An individual section within an accordion, consisting of a header and content that shows when expanded.
 * @documentation https://quietui.org/docs/components/accordion-item
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot - The content to show when expanded.
 * @slot icon - The icon to show when expanded and collapsed.
 * @slot label - The accordion item's label. For plain-text labels, you can use the `label` attribute instead.
 *
 * @csspart header - The accordion item's header that contains the label and icon.
 * @csspart label - The label container.
 * @csspart icon - The icon container.
 * @csspart body - The accordion item's body that contains the content.
 * @csspart content - The content wrapper inside the body.
 *
 * @cssproperty [--border-color=inherit)] - The accordion item's border color.
 * @cssproperty [--border-width=inherit] - The accordion item's border width.
 * @cssproperty [--border-style=inherit] - The accordion item's border style.
 * @cssproperty [--border-radius=inherit)] - The border radius to apply to rounded edges.
 *
 * @cssstate disabled - Applies when the accordion item is disabled.
 * @cssstate expanded - Applies when the accordion item is expanded.
 */
@customElement('quiet-accordion-item')
export class QuietAccordionItem extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @query('#body') body: HTMLElement;
  @query('#content') content: HTMLElement;

  @state() expanded = false;

  /** An optional name for the accordion item so you can reference it with the `active-name` attribute. */
  @property() name = '';

  /** The accordion item's label. If you need to provide HTML in the label, use the `label` slot instead. */
  @property() label: string;
  /** The accordion item's appearance. This will be set automatically by the accordion controller. */
  @property({ reflect: true }) appearance: 'normal' | 'contained' | 'separated' | 'unstyled' = 'normal';

  /** The position of the expand/collapse icon. This will be set automatically by the accordion controller. */
  @property({ attribute: 'icon-position', reflect: true }) iconPosition: 'start' | 'end' = 'end';

  /** Disables the accordion item. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  firstUpdated() {
    this.setAttribute('role', 'region');
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }

    if (changedProperties.has('expanded')) {
      this.customStates.set('expanded', this.expanded);

      if (changedProperties.get('expanded') !== undefined) {
        this.animateBody();
      }
    }
  }

  /** Handle header click to toggle expansion */
  private handleHeaderClick() {
    if (this.disabled) return;

    this.expanded = !this.expanded;

    // Dispatch custom event for accordion to handle
    this.dispatchEvent(
      new CustomEvent('quiet-accordion-item-toggle', {
        bubbles: true,
        composed: true,
        detail: { expanded: this.expanded }
      })
    );
  }

  /** Handle keyboard navigation on the header */
  private handleHeaderKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleHeaderClick();
    }
  }

  /** Animate the expansion/collapse of the body */
  private async animateBody() {
    if (!this.body || !this.content) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const computedStyle = getComputedStyle(this);
    const duration = prefersReducedMotion ? 0 : parseCssDuration(computedStyle.getPropertyValue('--duration'));
    const easing = computedStyle.getPropertyValue('--easing') || 'ease';

    if (this.expanded) {
      // Expanding
      const targetHeight = this.content.scrollHeight;

      // Set initial state
      this.body.style.height = '0';
      this.body.style.overflow = 'hidden';

      // Force reflow
      this.body.offsetHeight;

      // Transition to target height
      this.body.style.transition = `height ${duration}ms ${easing}`;
      this.body.style.height = `${targetHeight}px`;

      // Wait for transition to complete
      await new Promise(resolve => {
        const handleTransitionEnd = () => {
          this.body.removeEventListener('transitionend', handleTransitionEnd);
          resolve(undefined);
        };

        if (duration === 0) {
          resolve(undefined);
        } else {
          this.body.addEventListener('transitionend', handleTransitionEnd);
        }
      });

      // Remove inline styles after transition
      this.body.style.removeProperty('height');
      this.body.style.removeProperty('overflow');
      this.body.style.removeProperty('transition');
    } else {
      // Collapsing
      const currentHeight = this.body.scrollHeight;

      // Set explicit height to current height
      this.body.style.height = `${currentHeight}px`;
      this.body.style.overflow = 'hidden';

      // Force reflow
      this.body.offsetHeight;

      // Transition to 0
      this.body.style.transition = `height ${duration}ms ${easing}`;
      this.body.style.height = '0';

      // Wait for transition to complete
      await new Promise(resolve => {
        const handleTransitionEnd = () => {
          this.body.removeEventListener('transitionend', handleTransitionEnd);
          resolve(undefined);
        };

        if (duration === 0) {
          resolve(undefined);
        } else {
          this.body.addEventListener('transitionend', handleTransitionEnd);
        }
      });

      // Keep height at 0 but remove other styles
      this.body.style.removeProperty('overflow');
      this.body.style.removeProperty('transition');
    }
  }

  render() {
    return html`
      <header
        id="header"
        part="header"
        class=${classMap({
          'icon-start': this.iconPosition === 'start',
          'icon-end': this.iconPosition === 'end'
        })}
        tabindex=${this.disabled ? -1 : 0}
        role="button"
        aria-expanded=${this.expanded ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        @click=${this.handleHeaderClick}
        @keydown=${this.handleHeaderKeyDown}
      >
        <div id="label" part="label">
          <slot name="label">${this.label}</slot>
        </div>
        <div id="icon" part="icon">
          <slot name="icon">
            <quiet-icon library="system" name="chevron-down"></quiet-icon>
          </slot>
        </div>
      </header>

      <div id="body" part="body" aria-hidden=${this.expanded ? 'false' : 'true'}>
        <div id="content" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-accordion-item': QuietAccordionItem;
  }
}
