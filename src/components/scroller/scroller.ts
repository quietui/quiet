import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, eventOptions, property, query, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './scroller.styles.js';

/**
 * <quiet-scroller>
 *
 * @summary Adds an accessible container with visual affordances to help users identify and navigate scrolling content.
 * @documentation https://quietui.org/docs/components/scroller
 * @status stable
 * @since 1.0
 *
 * @slot - The content to show inside the scroller.
 *
 * @csspart content - The container that wraps the slotted content.
 * @csspart start-shadow - The starting shadow.
 * @csspart end-shadow - The ending shadow.
 *
 * @cssproperty [--shadow-color=var(--quiet-neutral-fill-mid)] - The base color of the shadow.
 * @cssproperty [--shadow-size=2rem] - The width of the shadow.
 * @cssproperty [--thumb-color=var(--quiet-neutral-fill-mid)] - The color of the scrollbar's thumb (supportive browsers
 *  only).
 * @cssproperty [--track-color=transparent] - The color of the scrollbar's track (supportive browsers only).
 */
@customElement('quiet-scroller')
export class QuietScroller extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);
  private resizeObserver = new ResizeObserver(() => this.updateScroll());
  private previousStartOpacity: string | null = null;
  private previousEndOpacity: string | null = null;

  @query('#content') content: HTMLElement;

  @state() canScroll = false;

  /** The scroller's orientation. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Removes the visible scrollbar. */
  @property({ attribute: 'without-scrollbar', type: Boolean, reflect: true }) withoutScrollbar = false;

  /** Removes the shadows. */
  @property({ attribute: 'without-shadow', type: Boolean, reflect: true }) withoutShadow = false;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Home') {
      event.preventDefault();
      this.content.scrollTo({
        left: this.orientation === 'horizontal' ? 0 : undefined,
        top: this.orientation === 'vertical' ? 0 : undefined
      });
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.content.scrollTo({
        left: this.orientation === 'horizontal' ? this.content.scrollWidth : undefined,
        top: this.orientation === 'vertical' ? this.content.scrollHeight : undefined
      });
    }
  }

  private handleSlotChange() {
    this.updateScroll();
  }

  @eventOptions({ passive: true })
  private updateScroll() {
    let startShadowOpacity: number;
    let endShadowOpacity: number;

    if (this.orientation === 'horizontal') {
      const clientWidth = Math.ceil(this.content.clientWidth);
      const scrollLeft = Math.abs(Math.ceil(this.content.scrollLeft));
      const scrollWidth = Math.ceil(this.content.scrollWidth);

      const maxScroll = scrollWidth - clientWidth;
      this.canScroll = maxScroll > 0;

      startShadowOpacity = Math.min(1, scrollLeft / (maxScroll * 0.05));
      endShadowOpacity = Math.min(1, (maxScroll - scrollLeft) / (maxScroll * 0.05));
    } else {
      const clientHeight = Math.ceil(this.content.clientHeight);
      const scrollTop = Math.abs(Math.ceil(this.content.scrollTop));
      const scrollHeight = Math.ceil(this.content.scrollHeight);

      const maxScroll = scrollHeight - clientHeight;
      this.canScroll = maxScroll > 0;

      startShadowOpacity = Math.min(1, scrollTop / (maxScroll * 0.05));
      endShadowOpacity = Math.min(1, (maxScroll - scrollTop) / (maxScroll * 0.05));
    }

    // Only update CSS custom properties if values changed
    const newStartOpacity = String(startShadowOpacity || 0);
    const newEndOpacity = String(endShadowOpacity || 0);

    if (this.previousStartOpacity !== newStartOpacity) {
      this.style.setProperty('--start-shadow-opacity', newStartOpacity);
      this.previousStartOpacity = newStartOpacity;
    }

    if (this.previousEndOpacity !== newEndOpacity) {
      this.style.setProperty('--end-shadow-opacity', newEndOpacity);
      this.previousEndOpacity = newEndOpacity;
    }
  }

  render() {
    return html`
      ${this.withoutShadow
        ? ''
        : html`
            <div id="start-shadow" part="start-shadow" aria-hidden="true"></div>
            <div id="end-shadow" part="end-shadow" aria-hidden="true"></div>
          `}

      <div
        id="content"
        part="content"
        role="region"
        aria-label=${this.localize.term('scrollableRegion')}
        aria-orientation=${this.orientation}
        tabindex=${this.canScroll ? '0' : '-1'}
        @keydown=${this.handleKeyDown}
        @scroll=${this.updateScroll}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-scroller': QuietScroller;
  }
}
