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
 * @property {String} color - The base color for the gradient. Accepts any valid CSS color format.
 * @property {Number} complexity - The number of gradient layers to generate. Default: 4.
 * @property {Number} seed - Optional seed value for consistent gradient generation.
 *
 * @cssproperty [--gradient-opacity=1] - The opacity of the mesh gradient.
 * @cssproperty [--gradient-saturation=100%] - The saturation of the gradient colors.
 * @cssproperty [--gradient-brightness=100%] - The brightness of the gradient colors.
 */
@customElement('quiet-mesh-gradient')
export class QuietMeshGradient extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private gradientStyle = '';

  /** The number of gradient layers to generate. */
  @property({ type: Number }) complexity = 4;

  /**
   * The base color for the gradient. This can be any color parsable by
   * [TinyColor](https://www.npmjs.com/package/@ctrl/tinycolor).
   */
  @property() color = '';

  /** A seed value for consistent gradient generation. If not provided, the gradient will be random. */
  @property({ type: Number }) seed: number | undefined;

  connectedCallback() {
    super.connectedCallback();
    this.generateGradient();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('complexity') || changedProperties.has('color') || changedProperties.has('seed')) {
      this.generateGradient();
      this.requestUpdate();
    }
  }

  /** Extracts the HSL values from any CSS color format using TinyColor. */
  private colorToHsl(color: string): { h: number; s: number; l: number } | undefined {
    try {
      const tinyColor = new TinyColor(color);

      // Check if the color is valid
      if (!tinyColor.isValid) {
        return undefined;
      }

      // Get HSL representation and return all values
      const hsl = tinyColor.toHsl();
      return {
        h: Math.round(hsl.h),
        s: Math.round(hsl.s * 100), // Convert to percentage
        l: Math.round(hsl.l * 100) // Convert to percentage
      };
    } catch {
      return undefined;
    }
  }

  /** Generates an array of HSL colors based on color theory, preserving the base color's characteristics. */
  private generateColors(count: number, baseHsl: { h: number; s: number; l: number }): string[] {
    const colors: string[] = [];

    // Calculate dynamic ranges based on the base color's lightness
    // Darker colors have less room to go darker, lighter colors have less room to go lighter
    const lightnessRangeDown = Math.min(30, baseHsl.l - 10); // How much darker we can go
    const lightnessRangeUp = Math.min(30, 90 - baseHsl.l); // How much lighter we can go

    // Saturation adjustments based on lightness
    // Very light colors (pastels) work better with lower saturation
    // Very dark colors also need controlled saturation to avoid muddiness
    let baseSaturation = baseHsl.s;
    if (baseHsl.l > 80) {
      baseSaturation = Math.min(baseSaturation, 60); // Cap saturation for very light colors
    } else if (baseHsl.l < 30) {
      baseSaturation = Math.min(baseSaturation, 70); // Cap saturation for very dark colors
    }

    for (let i = 0; i < count; i++) {
      if (i === 0) {
        // Base color - preserve the original color exactly
        colors.push(`hsl(${baseHsl.h}, ${baseHsl.s}%, ${baseHsl.l}%)`);
      } else if (i < count / 1.4) {
        // Analogous colors - slight hue shifts with complementary lightness changes
        const hueShift = 30 * (i % 2 === 0 ? 1 : -1) * Math.ceil(i / 2);

        // Alternate between lighter and darker, staying within calculated ranges
        const lightnessShift =
          i % 2 === 0
            ? lightnessRangeUp * (i / count) // Go lighter
            : -(lightnessRangeDown * (i / count)); // Go darker

        const lightness = Math.max(10, Math.min(90, baseHsl.l + lightnessShift));

        // Slightly vary saturation for depth
        const saturationVariance = (Math.random() - 0.5) * 20; // ±10% random variance
        const saturation = Math.max(20, Math.min(100, baseSaturation + saturationVariance));

        colors.push(
          `hsl(${(baseHsl.h + hueShift + 360) % 360}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`
        );
      } else {
        // Complementary colors - larger hue shifts with reduced saturation
        const hueShift = 150 * (i % 2 === 0 ? 1 : -1);

        // Complementary colors work best with moderate lightness
        const targetLightness = 50 + (baseHsl.l - 50) * 0.5; // Move toward middle
        const lightness = Math.max(20, Math.min(80, targetLightness + (Math.random() - 0.5) * 20));

        // Reduce saturation for complementary colors to avoid clashing
        const saturation = Math.max(20, Math.min(80, baseSaturation * 0.7));

        colors.push(
          `hsl(${(baseHsl.h + hueShift + 360) % 360}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`
        );
      }
    }

    return colors;
  }

  /** Calculates gradient positions, either randomly or based on a seed. */
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

  /** Generates the CSS gradient styles. */
  private generateGradient() {
    // Get full HSL values or generate random ones
    const baseHsl = this.color
      ? (this.colorToHsl(this.color) ?? {
          h: Math.round(Math.random() * 360),
          s: 70 + Math.round(Math.random() * 30), // Random saturation between 70-100%
          l: 50 + Math.round(Math.random() * 30) // Random lightness between 50-80%
        })
      : {
          h: Math.round(Math.random() * 360),
          s: 70 + Math.round(Math.random() * 30),
          l: 50 + Math.round(Math.random() * 30)
        };

    const colors = this.generateColors(this.complexity, baseHsl);
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

  /** Regenerates the gradient. Useful for creating new random gradients programmatically. */
  public regenerate() {
    this.seed = undefined;
    this.generateGradient();
    this.requestUpdate();
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
