import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './accordion-item.styles.js';

/**
 * <quiet-accordion-item>
 *
 * @summary TODO
 * @documentation https://quietui.org/docs/components/accordion-item
 * @status stable
 * @since 1.0
 *
 * @slot - The content to show when expanded.
 * @slot - The icon to show when expanded and collapsed.
 * @slot label - The accordion item's label. For plain-text labels, you can use the `label` attribute instead.
 *
 * @cssstate disabled - Applies when the accordion item is disabled.
 * @cssstate expanded - Applies when the accordion item is expanded.
 */
@customElement('quiet-accordion-item')
export class QuietAccordionItem extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The accordion item's appearance. This will be set automatically by the accordion controller. */
  @property() appearance: 'normal' | 'contained' | 'separated' = 'normal';

  /** The position of the expand/collapse icon. This will be set automatically by the accordion controller. */
  @property({ attribute: 'icon-position' }) iconPosition: 'normal' | 'contained' | 'separated' = 'normal';

  /** An optional name for the accordion item so you can reference it with the `active-name` attribute. */
  @property() name = '';

  /** The accordion item's label. If you need to provide HTML in the label, use the `label` slot instead. */
  @property() label: string;

  /** Disables the accordion item. */
  @property({ type: Boolean }) disabled = false;

  updated(changedProperties: PropertyValues<this>) {
    // e.g.
    // if (changedProperties.has('label')) {
    //   // this.label has changed
    // }
  }

  render() {
    return html`
      <header id="label">
        <slot name="label">${this.label}</slot>
        <slot name="icon"><quiet-icon library="system" name="chevron-down"></quiet-icon></slot>
      </header>
      <div id="body">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-accordion-item': QuietAccordionItem;
  }
}
