import type { CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html, literal } from 'lit/static-html.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './breadcrumb-item.styles.js';

/**
 * <quiet-breadcrumb-item>
 *
 * @summary Breadcrumb items represent a single link or step in the hierarchical structure of an app or website.
 * @documentation https://quietui.com/docs/components/breadcrumb-item
 * @status stable
 * @since 1.0
 *
 * @slot - The default slot.
 * @slot start - An icon or similar element to place before the breadcrumb item. Works great with `<quiet-icon>`.
 * @slot end - An icon or similar element to place after the breadcrumb item. Works great with `<quiet-icon>`.
 * @slot separator - A custom separator to show instead of the default. Works great with `<quiet-icon>`.
 *
 * @csspart label - The breadcrumb's label, an `<a>` element if `href` is set or a `<span>` element otherwise.
 * @csspart separator - The container that wraps the breadcrumb's separator, a `span` element.
 */
@customElement('quiet-breadcrumb-item')
export class QuietBreadcrumbItem extends QuietElement {
  static shadowRootOptions = { ...QuietElement.shadowRootOptions, delegatesFocus: true };
  static styles: CSSResultGroup = [hostStyles, styles];

  /** Indicates that this item is the current page or view. */
  @property({ type: Boolean, reflect: true }) current = false;

  /**
   * The URL the breadcrumb item should point to. If omitted, the breadcrumb item will be drawn as a `<span>` instead of
   * a link, enabling alternate content such as dropdowns.
   */
  @property() href: string;

  /** Opens the link in the specified target. */
  @property() target: '_blank' | '_parent' | '_self' | '_top' | undefined;

  /**
   * Sets the link's `rel` attribute. Note that the default value is `noreferrer noopener`, meaning you might need to
   * set it to an empty string if you're also using `target`.
   */
  @property() rel = 'noreferrer noopener';

  firstUpdated() {
    this.setAttribute('role', 'listitem');
  }

  updated(changedProps: Map<string, unknown>) {
    // Set the aria-current attribute on current items
    if (changedProps.has('current')) {
      if (this.current) {
        this.setAttribute('aria-current', 'page');
      } else {
        this.removeAttribute('aria-current');
      }
    }
  }

  render() {
    const isLink = typeof this.href === 'string';
    const tag = isLink ? literal`a` : literal`span`;

    return html`
      <${tag}
        id="label"
        part="label"
        href=${ifDefined(this.href)}
        rel=${ifDefined(this.rel)}
        target=${ifDefined(this.target)}
      >
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </${tag}>

      <span id="separator" part="separator">
        <slot name="separator">
          <quiet-icon library="system" name="chevron-right"></quiet-icon>
        </slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-breadcrumb-item': QuietBreadcrumbItem;
  }
}
