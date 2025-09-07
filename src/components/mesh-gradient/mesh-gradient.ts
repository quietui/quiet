import { TinyColor } from '@ctrl/tinycolor';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './mesh-gradient.styles.js';

type HSL = { h: number; s: number; l: number };

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
 * @csspart gradient - The gradient container element for styling the gradient layer.
 * @csspart content - The content container element for styling the content layer.
 *
 * @cssproperty [--gradient-color] - The base color for the gradient. Accepts any valid CSS color format.
 * @cssproperty [--optimal-text-color] - A readonly custom property that maps to the optimal text color (black or white)
 *  based on the gradient's base color.
 */
@customElement('quiet-mesh-gradient')
export class QuietMeshGradient extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @state() private currentBaseColor = '';
  @state() private gradientStyle = '';

  /** The number of gradient layers to generate. */
  @property({ type: Number }) complexity = 4;

  /** A seed value for consistent gradient generation. If not provided, the gradient will be random. */
  @property({ type: Number }) seed: number | undefined;

  /** Adjusts the brightness of the gradient from -100 (darker) to +100 (lighter). */
  @property({ type: Number }) brightness = 0;

  firstUpdated() {
    this.detectAndGenerateGradient();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('complexity') || changedProperties.has('seed') || changedProperties.has('brightness')) {
      const baseColor = this.getBaseColor();
      this.currentBaseColor = baseColor || '';
      this.generateGradient(baseColor);
    }
  }

  /**
   * Adjusts the brightness of an HSL color using a hybrid tint/shade approach. Positive values tint the color
   * (lighten + desaturate) and negative values shade it (darken only).
   */
  private adjustBrightness(hsl: HSL): HSL {
    const amount = this.brightness / 100;

    if (amount === 0) return hsl;

    if (amount > 0) {
      // Increases lightness and reduces saturation for a more natural brightening
      return {
        h: hsl.h,
        s: Math.round(hsl.s * (1 - amount * 0.3)),
        l: Math.round(hsl.l + (100 - hsl.l) * amount)
      };
    }

    // Decreases lightness while maintaining saturation for rich darks
    return {
      h: hsl.h,
      s: hsl.s,
      l: Math.round(hsl.l * (1 + amount))
    };
  }

  /** Extracts the HSL values from any CSS color format using TinyColor. */
  private colorToHsl(color: string): HSL | undefined {
    const tinyColor = new TinyColor(color);
    if (!tinyColor.isValid) return undefined;

    const hsl = tinyColor.toHsl();
    return {
      h: Math.round(hsl.h),
      s: Math.round(hsl.s * 100), // Convert to percentage
      l: Math.round(hsl.l * 100) // Convert to percentage
    };
  }

  /** Detects the current base color and regenerates the gradient if needed. */
  private detectAndGenerateGradient() {
    const baseColor = this.getBaseColor();

    // Only regenerate if the color actually changed or this is the first generation
    if (baseColor !== this.currentBaseColor || !this.gradientStyle) {
      this.currentBaseColor = baseColor || '';
      this.generateGradient(baseColor);
    }
  }

  /** Generates an array of HSL colors based on color theory, preserving the base color's characteristics. */
  private generateColors(count: number, baseHsl: HSL): string[] {
    const colors: string[] = [];

    // Calculate dynamic ranges based on the base color's lightness
    const lightnessRangeDown = Math.min(30, baseHsl.l - 10);
    const lightnessRangeUp = Math.min(30, 90 - baseHsl.l);

    // Adjust saturation based on lightness
    let baseSaturation = baseHsl.s;
    if (baseHsl.l > 80) {
      baseSaturation = Math.min(baseSaturation, 60); // Cap saturation for very light colors
    } else if (baseHsl.l < 30) {
      baseSaturation = Math.min(baseSaturation, 70); // Cap saturation for very dark colors
    }

    for (let i = 0; i < count; i++) {
      if (i === 0) {
        // Base color - preserve the original color exactly
        colors.push(this.hslToString(baseHsl));
      } else if (i < count / 1.4) {
        // Analogous colors - slight hue shifts with complementary lightness changes
        const hueShift = 30 * (i % 2 === 0 ? 1 : -1) * Math.ceil(i / 2);
        const lightnessShift = i % 2 === 0 ? lightnessRangeUp * (i / count) : -(lightnessRangeDown * (i / count));

        const lightness = Math.max(10, Math.min(90, baseHsl.l + lightnessShift));
        const saturationVariance = (Math.random() - 0.5) * 20;
        const saturation = Math.max(20, Math.min(100, baseSaturation + saturationVariance));

        colors.push(
          this.hslToString({
            h: (baseHsl.h + hueShift + 360) % 360,
            s: Math.round(saturation),
            l: Math.round(lightness)
          })
        );
      } else {
        // Complementary colors - larger hue shifts with reduced saturation
        const hueShift = 150 * (i % 2 === 0 ? 1 : -1);
        const targetLightness = 50 + (baseHsl.l - 50) * 0.5;
        const lightness = Math.max(20, Math.min(80, targetLightness + (Math.random() - 0.5) * 20));
        const saturation = Math.max(20, Math.min(80, baseSaturation * 0.7));

        colors.push(
          this.hslToString({
            h: (baseHsl.h + hueShift + 360) % 360,
            s: Math.round(saturation),
            l: Math.round(lightness)
          })
        );
      }
    }

    return colors;
  }

  /** Generates the CSS gradient styles. */
  private generateGradient(baseColor?: string) {
    // Get full HSL values or generate random ones
    let baseHsl = baseColor ? (this.colorToHsl(baseColor) ?? this.randomHsl()) : this.randomHsl();

    // Apply brightness adjustment
    baseHsl = this.adjustBrightness(baseHsl);

    const colors = this.generateColors(this.complexity, baseHsl);
    const gradients = colors.map((color, i) => {
      const { x, y } = this.getPosition(i, this.seed);
      return `radial-gradient(at ${x}% ${y}%, ${color} 0px, transparent 55%)`;
    });

    // Set optimal text color based on the adjusted base color
    this.style.setProperty('--optimal-text-color', this.getOptimalTextColor(colors[0]));
    this.gradientStyle = `
      background-color: ${colors[0]};
      background-image: ${gradients.join(', ')};
    `;
  }

  /** Gets the current value of `--gradient-color` from computed styles. */
  private getBaseColor(): string | undefined {
    const computedStyle = getComputedStyle(this);
    const baseColor = computedStyle.getPropertyValue('--gradient-color').trim();
    return baseColor || undefined;
  }

  /** Determines the optimal text color (black or white) based on the background color. */
  private getOptimalTextColor(color: string): 'black' | 'white' {
    const tinyColor = new TinyColor(color);
    return tinyColor.isValid && tinyColor.isLight() ? 'black' : 'white';
  }

  /** Calculates gradient positions, either randomly or based on a seed. */
  private getPosition(index: number, seed?: number): { x: number; y: number } {
    if (seed !== undefined) {
      // Seeded pseudo-random positioning
      const hash = ((seed + index) * 2654435761) % 2147483647;
      const normalized = hash / 2147483647;
      return {
        x: Math.round((normalized * 100) % 100),
        y: Math.round((normalized * index * 10 * 100) % 100)
      };
    }

    // Random positioning
    return {
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100)
    };
  }

  /**
   * Handles the `transitionend` event to detect when `--gradient-color` changes. The 1ms transition on the `color`
   * property triggers this.
   */
  private handleColorTransition = (event: TransitionEvent) => {
    if (event.propertyName === 'color') {
      this.detectAndGenerateGradient();
    }
  };

  /** Formats an HSL object as a CSS HSL string. */
  private hslToString({ h, s, l }: HSL): string {
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  /** Creates a random HSL color for when no base color is provided. */
  private randomHsl(): HSL {
    return {
      h: Math.round(Math.random() * 360),
      s: 70 + Math.round(Math.random() * 30), // 70-100%
      l: 50 + Math.round(Math.random() * 30) // 50-80%
    };
  }

  /** Regenerates the gradient. Useful for creating new random gradients programmatically. */
  public regenerate() {
    this.seed = undefined;
    this.detectAndGenerateGradient();
  }

  render() {
    return html`
      <div id="gradient" part="gradient" style=${this.gradientStyle} @transitionend=${this.handleColorTransition}></div>
      <div id="content" part="content">
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

// The detection of CSS variable values via computed styles is essential for the mesh gradient to function, so some
// updates can only be scheduled as a side effect of the previous update. This disables that Lit dev warning about it.
QuietMeshGradient.disableWarning?.('change-in-update');
