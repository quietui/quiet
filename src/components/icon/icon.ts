import { connectIcon, disconnectIcon, getLibrary } from '../../utilities/icon-library.js';
import { customElement, property, state } from 'lit/decorators.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './icon.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * Store a cache of icon requests by URL to prevent HTTP requests to the same resources from stacking up and to make
 * subsequent requests load faster.
 */
const requests = new Map<string, Promise<string>>();

/**
 * <quiet-icon>
 *
 * @summary Icons provide a visual representation of an object, action, or idea.
 * @documentation https://quietui.com/docs/components/icon
 * @status stable
 * @since 1.0
 *
 * @event quiet-icon-load - The icon has reloaded and rendered.
 * @event quiet-icon-error - The icon failed to reload.
 */
@customElement('quiet-icon')
export class Icon extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @state() private svg?: SVGSVGElement;

  /** The name of the icon library to use. */
  @property() library = 'hero';

  /** The name of the icon to render. */
  @property() family = 'outline';

  /** The name of the icon to render. */
  @property() name: string;

  /** A label to use for assistive devices. If omitted, the icon will be considered presentational. */
  @property() label: string;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'img');
    connectIcon(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    disconnectIcon(this);
  }

  async updated(changedProps: Map<string, unknown>) {
    // Update the icon's role when a label is added or removed
    if (changedProps.has('label')) {
      if (this.label) {
        this.setAttribute('aria-label', this.label);
        this.removeAttribute('aria-hidden');
      } else {
        this.setAttribute('aria-hidden', 'true');
        this.removeAttribute('aria-label');
      }
    }

    // Set the icon
    if (changedProps.has('library') || changedProps.has('family') || changedProps.has('name')) {
      await this.load();
    }
  }

  /** Loads or reloads and draws the icon. */
  public async load() {
    try {
      this.svg = await this.fetchIcon();
      await this.updateComplete;
      this.emit('quiet-icon-load');
    } catch {
      this.svg = undefined;
      await this.updateComplete;
      this.emit('quiet-icon-error');
    }
  }

  private async fetchIcon(): Promise<SVGSVGElement | undefined> {
    const library = getLibrary(this.library);
    const url = library?.resolve(this.name, this.family);
    let svg: SVGSVGElement | null;

    if (!library || !url) {
      return undefined;
    }

    try {
      // If this is a new request, add it to the cache so subsequent requests can share it instead of hitting the server
      if (!requests.has(url)) {
        requests.set(
          url,
          fetch(url, { mode: 'cors' }).then(res => res.text())
        );
      }

      const responseText = await requests.get(url)!;
      const parser = new DOMParser();
      const doc = parser.parseFromString(responseText, 'text/html');

      svg = doc.querySelector<SVGSVGElement>('svg');
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
