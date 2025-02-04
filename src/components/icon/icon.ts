import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { QuietLoadedEvent, QuietLoadErrorEvent } from '../../events/load.js';
import hostStyles from '../../styles/host.styles.js';
import { connectIcon, disconnectIcon, getLibrary } from '../../utilities/icon-library.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './icon.styles.js';

/**
 * Store a cache of icon requests by URL to prevent HTTP requests to the same resources from stacking up and to make
 * subsequent requests load faster.
 */
const requests = new Map<string, Promise<string>>();

/**
 * <quiet-icon>
 *
 * @summary Icons provide a visual representation of an object, action, or idea.
 * @documentation https://quietui.org/docs/components/icon
 * @status stable
 * @since 1.0
 *
 * @event quiet-loaded - The icon has reloaded and rendered. This event does not bubble.
 * @event quiet-load-error - The icon failed to load. This event does not bubble.
 *
 * @csspart svg - The internal SVG element.
 */
@customElement('quiet-icon')
export class QuietIcon extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @state() svg?: SVGSVGElement;

  /** The name of the icon library to use. */
  @property() library = 'default';

  /** The icon family to use for this icon, e.g. `filled` or `outline`. */
  @property() family = 'outline';

  /** The name of the icon to render. */
  @property() name: string;

  /** A label to use for assistive devices. If omitted, the icon will be considered presentational. */
  @property() label: string;

  /** Flips the icon horizontally. */
  @property({ attribute: 'flip-x', type: Boolean, reflect: true }) flipX = false;

  /** Flips the icon vertically. */
  @property({ attribute: 'flip-y', type: Boolean, reflect: true }) flipY = false;

  /** Rotates the icon the specified number of degrees. */
  @property({ type: Number }) rotate = 0;

  connectedCallback() {
    super.connectedCallback();
    connectIcon(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    disconnectIcon(this);
  }

  firstUpdated() {
    this.setAttribute('role', 'img');
    this.setAttribute('aria-hidden', 'true');
  }

  async updated(changedProperties: PropertyValues<this>) {
    // Update the icon's role when a label is added or removed
    if (changedProperties.has('label')) {
      if (this.label) {
        this.setAttribute('aria-label', this.label);
        this.removeAttribute('aria-hidden');
      } else {
        this.setAttribute('aria-hidden', 'true');
        this.removeAttribute('aria-label');
      }
    }

    // Set the icon
    if (changedProperties.has('library') || changedProperties.has('family') || changedProperties.has('name')) {
      await this.load();
    }

    // Handle rotation
    if (changedProperties.has('rotate')) {
      if (this.rotate === 0) {
        this.style.removeProperty('rotate');
      } else {
        this.style.rotate = `${this.rotate}deg`;
      }
    }
  }

  /** Loads or reloads and draws the icon. */
  public async load() {
    try {
      this.svg = await this.fetchIcon();
      await this.updateComplete;
      this.dispatchEvent(new QuietLoadedEvent());
    } catch (err: unknown) {
      this.svg = undefined;
      await this.updateComplete;
      this.dispatchEvent(
        new QuietLoadErrorEvent({
          error: new Error(`Failed to load "${this.name}" from the "${this.library}" library.`)
        })
      );
    }
  }

  private async fetchIcon(): Promise<SVGSVGElement | undefined> {
    const library = getLibrary(this.library);
    const url = library?.resolve(this.name, this.family);
    let svg: SVGSVGElement | null;

    if (!library || !url) {
      return undefined;
    }

    // Cache new requests so subsequent ones can share it
    if (!requests.has(url)) {
      requests.set(
        url,
        fetch(url, { mode: 'cors' }).then(res => res.text())
      );
    }

    try {
      const responseText = await requests.get(url)!;
      const parser = new DOMParser();
      const doc = parser.parseFromString(responseText, 'text/html');

      svg = doc.querySelector<SVGSVGElement>('svg');
      svg?.part.add('svg');
    } catch {
      return undefined;
    }

    if (!svg) {
      return undefined;
    }

    // Perform any necessary mutations
    if (library.mutate) {
      library.mutate(svg);
    }

    return svg;
  }

  render() {
    return this.svg;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-icon': QuietIcon;
  }
}
