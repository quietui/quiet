import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './checkbox-group.styles.js';

/**
 * <quiet-checkbox-group>
 *
 * @summary Checkbox groups let you attach a label and description to a group of related checkboxes or switches.
 * @documentation https://quietui.org/docs/components/checkbox-group
 * @status stable
 * @since 1.0
 *
 * @slot - The checkboxes to place in the group.
 * @slot label - The checkbox's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The checkbox's description. For plain-text descriptions, you can use the `description`
 *  attribute instead.
 *
 * @csspart label - The element that contains the checkbox group's label.
 * @csspart description - The element that contains the checkbox group's description.
 * @csspart group - The element that wraps the grouped checkboxes.
 */
@customElement('quiet-checkbox-group')
export class QuietCheckboxGroup extends QuietElement {
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  /**
   * The checkbox's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The checkbox's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The orientation of grouped items. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Indicates at least one option in the checkbox group is required. This just adds a visual indicator. To perform
   * validation, use the checkbox's `required` attribute and/or `setCustomValidity()` method.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  render() {
    const hasLabel = this.label || this.slotsWithContent.has('label');
    const hasDescription = this.description || this.slotsWithContent.has('description');

    return html`
      <label id="label" part="label" for="text-box" class=${classMap({ vh: !hasLabel })}>
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description" class=${classMap({ vh: !hasDescription })}>
        <slot name="description">${this.description}</slot>
      </div>

      <div id="group" part="group" role="group" aria-labelledby="label" aria-describedby="description">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-checkbox-group': QuietCheckboxGroup;
  }
}
