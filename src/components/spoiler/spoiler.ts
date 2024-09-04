import '../icon/icon.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import { html } from 'lit';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './spoiler.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-spoiler>
 *
 * @summary Spoilers conceal content and give the user the option of showing it or not, preventing unintentional
 *  disclosure.
 * @documentation https://quietui.com/docs/components/spoiler
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot - The spoiler's content.
 * @slot label - A custom label for the reveal text. For plain-text labels, you can use the `label` attribute instead.
 *
 * @csspart content - The container that holds the spoiler's content.
 * @csspart show-button - The button that shows the spoiler, a `<button>` element. Covers the content by default.
 * @csspart hide-button - The button that hides the spoiler, a `<button>` element containing an icon.
 * @csspart hide-icon - The hide icon, a `<quiet-icon>` element.
 * @csspart hide-icon__svg - The hide icon's `svg` part.
 *
 * @cssproperty [--blur=8px] - The amount of blur when using the blur effect.
 */
@customElement('quiet-spoiler')
export class QuietSpoiler extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('#hide-button') private hideButton: HTMLButtonElement;
  @query('#show-button') private showButton: HTMLButtonElement;

  /** Shows or hides the spoiler's content. */
  @property({ type: Boolean, reflect: true }) visible = false;

  /** Renders the spoiler inline. */
  @property({ type: Boolean, reflect: true }) inline = false;

  /** Determines how the spoiler is hidden. */
  @property({ reflect: true }) effect: 'solid' | 'blur' = 'blur';

  /**
   * The spoiler's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /** When more than one spoilers share the same name, only will be shown at a time. */
  @property() name = '';

  firstUpdated() {
    this.setAttribute('role', 'group');
    this.setAttribute('aria-label', this.localize.term('spoiler'));
  }

  updated(changedProps: Map<string, unknown>) {
    // When showing a spoiler, hide other spoilers with the same name
    if (changedProps.has('visible') && this.visible && this.name) {
      const doc = this.getRootNode() as Document | ShadowRoot;

      doc.querySelectorAll<QuietSpoiler>(`quiet-spoiler[name=${this.name}]`).forEach(spoiler => {
        if (spoiler !== this) spoiler.visible = false;
      });
    }
  }

  private handleButtonClick() {
    const buttonToFocus = this.visible ? this.showButton : this.hideButton;

    this.visible = !this.visible;
    this.updateComplete.then(() => buttonToFocus.focus({ preventScroll: true }));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.visible = false;
    }
  }

  render() {
    return html`
      <button
        id="show-button"
        part="show-button"
        class=${classMap({
          blur: this.effect === 'blur',
          solid: this.effect === 'solid'
        })}
        type="button"
        aria-expanded=${this.visible ? 'true' : 'false'}
        ?inert=${this.visible}
        @click=${this.handleButtonClick}
      >
        <slot name="label">${this.label || this.localize.term('show')}</slot>
      </button>

      <button
        id="hide-button"
        part="hide-button"
        type="button"
        aria-expanded=${this.visible ? 'true' : 'false'}
        ?inert=${!this.visible}
        @click=${this.handleButtonClick}
        @keydown=${this.handleKeyDown}
      >
        <quiet-icon
          part="hide-icon"
          exportparts="svg:hide-icon__svg"
          library="system"
          name="x"
          label=${this.localize.term('hide')}
        ></quiet-icon>
      </button>

      <div part="content" id="content" ?inert=${!this.visible}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-spoiler': QuietSpoiler;
  }
}
