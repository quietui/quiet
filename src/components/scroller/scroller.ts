import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, eventOptions, query } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './scroller.styles.js';

/**
 * <quiet-scroller>
 *
 * @summary Scrollers add an accessible horizontal scrolling region with visual affordances to help users navigate wide
 *  content such as tables, especially on mobile devices.
 * @documentation https://quietui.org/docs/components/scroller
 * @status stable
 * @since 1.0
 *
 * @slot - The content to show inside the scroller.
 *
 * @cssproperty [--edge-color=var(--quiet-neutral-stroke-softer)] - The color of the shadow's edge.
 * @cssproperty [--edge-width=var(--quiet-border-width)] - The width of the shadow's edge.
 * @cssproperty [--shadow-color=var(--quiet-neutral-fill-mid)] - The base color of the shadow.
 * @cssproperty [--shadow-opacity=10%] - The opacity of the shadow.
 * @cssproperty [--shadow-width=0.5rem] - The width of the shadow.
 *
 * @csspart content - The container that wraps the slotted content.
 */
@customElement('quiet-scroller')
export class QuietScroller extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);
  private resizeObserver = new ResizeObserver(() => this.updateScroll());

  @query('#content') content: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
  }

  private handleSlotChange() {
    this.updateScroll();
  }

  @eventOptions({ passive: true })
  private updateScroll() {
    const clientWidth = Math.ceil(this.content.clientWidth);
    const scrollLeft = Math.abs(Math.ceil(this.content.scrollLeft));
    const scrollWidth = Math.ceil(this.content.scrollWidth);

    // Calculate total scrollable width
    const maxScroll = scrollWidth - clientWidth;

    // Calculate shadow opacities based on first/last 2% of scroll
    const startShadowOpacity = Math.min(1, scrollLeft / (maxScroll * 0.05));
    const endShadowOpacity = Math.min(1, (maxScroll - scrollLeft) / (maxScroll * 0.05));

    // Update CSS custom properties
    this.style.setProperty('--start-shadow-opacity', String(startShadowOpacity || 0));
    this.style.setProperty('--end-shadow-opacity', String(endShadowOpacity || 0));
  }

  render() {
    return html`
      <div id="start-shadow" aria-hidden="true"></div>
      <div id="end-shadow" aria-hidden="true"></div>

      <div
        id="content"
        part="content"
        role="region"
        aria-label=${this.localize.term('scrollableRegion')}
        tabindex="0"
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
