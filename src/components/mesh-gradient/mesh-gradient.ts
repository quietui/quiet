import { TinyColor } from '@ctrl/tinycolor';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './mesh-gradient.styles.js';

/**
 * <quiet-mesh-gradient>
 *
 * @summary Generates beautiful mesh gradients with customizable colors and complexity.
 * @documentation https://quietui.org/docs/components/mesh-gradient
 * @status experimental
 * @since 1.0
 *
 * @slot - Content to display over the gradient.
 *
 * @part gradient - The gradient container element for styling the gradient layer.
 * @part content - The content container element for styling the content layer.
 *
 * @property {String} tone - Controls the overall tone of the gradient. Options: 'light', 'medium', 'dark', 'vibrant'. Default: 'medium'.
 *
 * @cssproperty [--gradient-opacity=1] - The opacity of the mesh gradient.
 * @cssproperty [--gradient-saturation=100%] - The saturation of the gradient colors.
 * @cssproperty [--gradient-brightness=100%] - The brightness of the gradient colors.
 */
@customElement('quiet-mesh-gradient')
export class QuietMeshGradient extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private gradientStyle = '';

  /** Controls the overall tone of the gradient. */
  @property({ type: String }) tone: 'light' | 'medium' | 'dark' | 'vibrant' = 'medium';

  /** The number of gradient layers to generate. */
  @property({ type: Number }) complexity = 4;

  /**
   * The base color for the gradient. Accepts any valid CSS color format:
   * - Hex: '#FF6B6B', '#F6B'
   * - RGB/RGBA: 'rgb(255, 107, 107)', 'rgba(255, 107, 107, 0.8)'
   * - HSL/HSLA: 'hsl(0, 100%, 71%)', 'hsla(0, 100%, 71%, 0.8)'
   * - Named colors: 'tomato', 'dodgerblue', 'firebrick'
   * - Modern formats: 'oklab(0.7 0.1 0.1)', 'oklch(0.7 0.15 30)'
   * If not provided, a random color is used.
   */
  @property({ attribute: 'base-color' }) baseColor = '';

  /** A seed value for consistent gradient generation. If not provided, the gradient will be random. */
  @property({ type: Number }) seed: number | undefined;

  /**
   * Extracts the hue value from any CSS color format using TinyColor.
   * @internal
   */
  private colorToHue(color: string): number | undefined {
    try {
      const tinyColor = new TinyColor(color);

      // Check if the color is valid
      if (!tinyColor.isValid) {
        return undefined;
      }

      // Get HSL representation and return the hue
      const hsl = tinyColor.toHsl();
      return Math.round(hsl.h);
    } catch {
      return undefined;
    }
  }

  /**
   * Generates an array of HSL colors based on color theory.
   * @internal
   */
  /**
   * Generates an array of HSL colors based on color theory.
   * @internal
   */
  private generateColors(count: number, baseHue: number): string[] {
    const colors: string[] = [];

    // Define lightness ranges for each tone
    const toneConfigs = {
      light: {
        base: 85,
        analogous: { start: 78, modifier: 1.2 },
        complementary: { start: 80, modifier: 1.0 }
      },
      medium: {
        base: 74,
        analogous: { start: 64, modifier: 1.75 },
        complementary: { start: 66, modifier: 1.25 }
      },
      dark: {
        base: 45,
        analogous: { start: 35, modifier: 2.0 },
        complementary: { start: 38, modifier: 1.5 }
      },
      vibrant: {
        base: 60,
        analogous: { start: 50, modifier: 2.5 },
        complementary: { start: 55, modifier: 2.0 }
      }
    };

    const config = toneConfigs[this.tone];

    for (let i = 0; i < count; i++) {
      if (i === 0) {
        // Base color
        colors.push(`hsl(${baseHue}, 100%, ${config.base}%)`);
      } else if (i < count / 1.4) {
        // Analogous colors
        const hueShift = 30 * (i % 2 === 0 ? 1 : -1) * Math.ceil(i / 2);
        const lightness =
          config.analogous.start - i * (i % 2 === 0 ? config.analogous.modifier : -config.analogous.modifier);
        colors.push(`hsl(${baseHue + hueShift}, 100%, ${Math.round(lightness)}%)`);
      } else {
        // Complementary colors
        const hueShift = 150 * (i % 2 === 0 ? 1 : -1);
        const lightness =
          config.complementary.start -
          i * (i % 2 === 0 ? config.complementary.modifier : -config.complementary.modifier);
        colors.push(`hsl(${baseHue + hueShift}, 100%, ${Math.round(lightness)}%)`);
      }
    }

    return colors;
  }

  /**
   * Calculates gradient positions, either randomly or based on a seed.
   * @internal
   */
  private getPosition(index: number, seed?: number): { x: number; y: number } {
    if (seed !== undefined) {
      // Seeded pseudo-random positioning
      const hash = ((seed + index) * 2654435761) % 2147483647;
      const normalized = hash / 2147483647;
      const x = Math.round((normalized * 100) % 100);
      const y = Math.round((normalized * index * 10 * 100) % 100);
      return { x, y };
    }

    // Random positioning
    return {
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100)
    };
  }

  /**
   * Generates the CSS gradient styles.
   * @internal
   */
  private generateGradient(): void {
    const baseHue = this.baseColor
      ? (this.colorToHue(this.baseColor) ?? Math.round(Math.random() * 360))
      : Math.round(Math.random() * 360);

    const colors = this.generateColors(this.complexity, baseHue);
    const gradients: string[] = [];

    for (let i = 0; i < this.complexity; i++) {
      const { x, y } = this.getPosition(i, this.seed);
      gradients.push(`radial-gradient(at ${x}% ${y}%, ${colors[i]} 0px, transparent 55%)`);
    }

    this.gradientStyle = `
      background-color: ${colors[0]};
      background-image: ${gradients.join(', ')};
    `;
  }

  /**
   * Regenerates the gradient. Useful for creating new random gradients programmatically.
   */
  regenerate(): void {
    this.seed = undefined;
    this.generateGradient();
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this.generateGradient();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('complexity') ||
      changedProperties.has('baseColor') ||
      changedProperties.has('seed') ||
      changedProperties.has('tone') // Add this
    ) {
      this.generateGradient();
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="gradient-container" part="gradient" style=${this.gradientStyle}></div>
      <div class="content" part="content">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-mesh-gradient': QuietMeshGradient;
  }
}
