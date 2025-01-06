import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import type { Platform } from '../../utilities/platform.js';
import { detectPlatform } from '../../utilities/platform.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './keyboard-shortcut.styles.js';

const symbolMap = {
  command: { mac: '⌘', other: 'CTRL' },
  option: { mac: '⌥', other: 'ALT' },
  shift: { mac: '⇧', other: 'SHIFT' },
  control: { mac: '⌃', other: 'CTRL' },
  delete: { mac: '⌫', other: 'DELETE' },
  up: '↑',
  down: '↓',
  left: '←',
  right: '→'
};

/**
 * <quiet-keyboard-shortcut>
 *
 * @summary Keyboard shortcuts show key combinations and special characters based on the user's operating system.
 * @documentation https://quietui.org/docs/components/keyboard-shortcut
 * @status stable
 * @since 1.0
 *
 * @csspart keys - The internal `<kbd>` element that wraps the shortcuts.
 */
@customElement('quiet-keyboard-shortcut')
export class QuietKeyboardShortcut extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The primary keyboard shortcut. */
  @property() keys = '';

  /** The shortcut to output on Linux devices. */
  @property() linux = '';

  /** The shortcut to output on Mac devices. */
  @property() mac = '';

  /** The shortcut to output on Windows devices. */
  @property() windows = '';

  /** Optional label for screen readers. If not provided, the shortcut text will be used. */
  @property() label: string;

  /**
   * The delimiter to use between each key. When set to `auto`, the delimiter will be determined by the platform (no
   * character for Mac and "+" for others).
   */
  @property() delimiter: 'auto' | string = 'auto';

  /**
   * Determines the platform to show. When set to `auto`, the platform will be automatically detected. The `linux`
   * platform will be used for most Linux, Unix, and BSD operating systems.
   */
  @property() platform: 'auto' | 'linux' | 'mac' | 'windows' = 'auto';

  /** The shortcut's appearance. */
  @property({ reflect: true }) appearance: 'normal' | 'unstyled' = 'normal';

  updated(changedProperties: PropertyValues<this>) {
    // Handle label changes
    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label);
    }
  }

  private replaceSymbols(text: string, platform: Platform): string {
    let result = text;
    for (const [key, value] of Object.entries(symbolMap)) {
      const replacement = typeof value === 'string' ? value : platform === 'mac' ? value.mac : value.other;
      result = result.replace(new RegExp(`\\$${key}`, 'g'), replacement);
    }
    return result;
  }

  render() {
    const platform = this.platform === 'auto' ? detectPlatform() : this.platform;
    const delimiter = this.delimiter === 'auto' ? (platform === 'mac' ? '' : '+') : this.delimiter.slice(0, 1);
    const props = {
      mac: this.mac || this.keys,
      windows: this.windows || this.keys,
      linux: this.linux || this.keys,
      other: this.keys
    };
    const value = this.replaceSymbols(props[platform as keyof typeof props] || '', platform as Platform);

    // Split the value by space and wrap each chunk in `<kbd>`
    const keyElements = value.split(' ').map(key => html`<kbd part="key">${key.trim()}</kbd>`);

    // Return the delimited keys
    return html`${keyElements.map((el, i) => (i === 0 ? el : html`${delimiter}${el}`))}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-keyboard-shortcut': QuietKeyboardShortcut;
  }
}
