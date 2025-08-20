import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
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
 * @slot icon - The expand/collapse icon.
 * @slot label - The accordion item's label. For plain-text labels, you can use the `label` attribute instead.
 *
 * @csspart header - The accordion item's header that contains the label and icon.
 * @csspart label - The label container.
 * @csspart icon - The icon container.
 * @csspart body - The accordion item's body that contains the content.
 * @csspart content - The content wrapper inside the body.
 *
 * @cssstate disabled - Applies when the accordion item is disabled.
 * @cssstate expanded - Applies when the accordion item is expanded.
 */
@customElement('quiet-accordion-item')
export class QuietAccordionItem extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @query('#body') body: HTMLElement;
  @query('#content') content: HTMLElement;
  @query('#header') header: HTMLElement;

  @property({ type: Boolean, reflect: true }) expanded = false;

  /** The accordion item's label. If you need to provide HTML in the label, use the `label` slot instead. */
  @property() label: string;

  /** The accordion item's appearance. This will be set automatically by the accordion controller. */
  @property({ reflect: true }) appearance: 'normal' | 'contained' | 'separated' | 'unstyled' = 'normal';

  /** The position of the expand/collapse icon. This will be set automatically by the accordion controller. */
  @property({ attribute: 'icon-placement', reflect: true }) iconPlacement: 'start' | 'end' = 'end';

  /** Disables the accordion item. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Sets focus to the accordion item. */
  public focus() {
    this.header.focus();
  }

  /** Removes focus from the accordion item. */
  public blur() {
    this.header.blur();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }

    if (changedProperties.has('expanded')) {
      this.customStates.set('expanded', this.expanded);
    }
  }

  /** Animate the expansion of the body - called by the accordion controller */
  public async animateExpand() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const computedStyle = getComputedStyle(this);
    const duration = prefersReducedMotion ? 0 : parseCssDuration(computedStyle.getPropertyValue('--duration'));
    const easing = computedStyle.getPropertyValue('--easing');

    // Expanding animation
    this.body.style.height = '0px';
    this.body.style.overflow = 'hidden';

    const targetHeight = this.content.scrollHeight;

    await this.body.animate([{ height: '0px' }, { height: `${targetHeight}px` }], { duration, easing }).finished;

    this.body.style.removeProperty('height');
    this.body.style.removeProperty('overflow');
  }

  /** Animate the collapse of the body - called by the accordion controller */
  public async animateCollapse() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const computedStyle = getComputedStyle(this);
    const duration = prefersReducedMotion ? 0 : parseCssDuration(computedStyle.getPropertyValue('--duration'));
    const easing = computedStyle.getPropertyValue('--easing');

    // Ensure the body has an explicit height before collapsing
    if (this.body && (!this.body.style.height || this.body.style.height === 'auto')) {
      this.body.style.height = `${this.body.scrollHeight}px`;
      this.body.offsetHeight; // Force reflow
    }

    const currentHeight = this.body.scrollHeight;

    this.body.style.height = `${currentHeight}px`;
    this.body.style.overflow = 'hidden';

    await this.body.animate([{ height: `${currentHeight}px` }, { height: '0px' }], { duration, easing }).finished;

    this.body.style.removeProperty('height');
    this.body.style.removeProperty('overflow');
  }

  render() {
    return html`
      <header
        id="header"
        part="header"
        class=${classMap({
          'icon-start': this.iconPlacement === 'start',
          'icon-end': this.iconPlacement === 'end'
        })}
        tabindex=${this.disabled ? -1 : 0}
        role="button"
        aria-controls="body"
        aria-expanded=${this.expanded ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <div id="label" part="label">
          <slot name="label">${this.label}</slot>
        </div>
        <div id="icon" part="icon">
          <slot name="icon">
            <quiet-icon id="default-icon" library="system" name="chevron-down"></quiet-icon>
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
