import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import type { Platform } from '../../utilities/platform.js';
import { detectPlatform } from '../../utilities/platform.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './hotkey.styles.js';

const keywordMap = {
  command: { mac: '⌘', other: 'Ctrl' },
  control: { mac: '⌃', other: 'Ctrl' },
  option: { mac: '⌥', other: 'Alt' },
  shift: { mac: '⇧', other: 'Shift' },
  escape: { mac: 'Esc', other: 'Esc' },
  enter: '⏎',
  backspace: '⌫',
  delete: '⌦',
  tab: '⇥',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→'
};

/**
 * <quiet-hotkey>
 *
 * @summary Shows keyboard shortcut combinations based on the user's operating system.
 * @documentation https://quietui.org/docs/components/hotkey
 * @status stable
 * @since 1.0
 *
 * @csspart key - The `<kbd>` elements that wrap keys.
 * @csspart keyword - The `<kbd>` elements that wrap keywords.
 * @csspart delimiter - The `<span>` elements that wrap delimiters.
 */
@customElement('quiet-hotkey')
export class QuietHotkey extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The primary keys to display in the hotkey, separated by a space. */
  @property() keys = '';

  /** The keys to display on Linux devices, separated by a space. */
  @property() linux = '';

  /** The keys to display on Mac devices, separated by a space. */
  @property() mac = '';

  /** The keys to display on Windows devices, separated by a space. */
  @property() windows = '';

  /** Optional label for screen readers. If not provided, the hotkey text will be used. */
  @property() label: string;

  /**
   * The delimiter to show between each key. When set to `auto`, the delimiter will be determined by the platform (no
   * character for Mac and "+" for others).
   */
  @property() delimiter: 'auto' | string = 'auto';

  /**
   * Determines the platform to show. When set to `auto`, the platform will be automatically detected. The `linux`
   * platform will be used for most Linux, Unix, and BSD operating systems.
   */
  @property() platform: 'auto' | 'linux' | 'mac' | 'windows' = 'auto';

  /** The hotkey's appearance. */
  @property({ reflect: true }) appearance: 'normal' | 'unstyled' = 'normal';

  updated(changedProperties: PropertyValues<this>) {
    // Handle label changes
    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label);
    }
  }

  /** Replaces keywords with their platform-specific symbol or text. */
  private replaceKeywords(text: string, platform: Platform) {
    return text.split(' ').map(segment => {
      if (segment.startsWith('$')) {
        const keyword = segment.slice(1);
        const value = keywordMap[keyword as keyof typeof keywordMap];
        const replacement = typeof value === 'string' ? value : platform === 'mac' ? value.mac : value.other;
        return { text: replacement, isKeyword: true };
      }
      return { text: segment, isKeyword: false };
    });
  }

  render() {
    const platform = this.platform === 'auto' ? detectPlatform() : this.platform;
    const platformDelimiter = platform === 'mac' ? '' : '+';
    const delimiter = this.delimiter === 'auto' ? platformDelimiter : this.delimiter.slice(0, 1);
    const props = {
      mac: this.mac || this.keys,
      windows: this.windows || this.keys,
      linux: this.linux || this.keys,
      other: this.keys
    };

    // Process the text, replacing keywords with their symbols
    const segments = this.replaceKeywords(props[platform as keyof typeof props] || '', platform as Platform);

    // Render the hotkey
    return html`${segments.map((segment, i) => {
      // Create a `<kbd>` element for each segment
      const keyElement = html`<kbd part=${segment.isKeyword ? 'keyword' : 'key'}>${segment.text.trim()}</kbd>`;

      // Add a delimiter for all elements except the first
      return i === 0 ? keyElement : html`<span part="delimiter" aria-hidden="true">${delimiter}</span>${keyElement}`;
    })}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-hotkey': QuietHotkey;
  }
}
