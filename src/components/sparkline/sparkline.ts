import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './sparkline.styles.js';

/**
 * <quiet-sparkline>
 *
 * @summary Sparklines show at-a-glance trends in a small, inline chart that fits within text or tables.
 * @documentation https://quietui.org/docs/components/sparkline
 * @status stable
 * @since 1.0
 *
 * @cssproperty [--fill-color] - The start color of the gradient fill
 * @cssproperty [--gradient-stop-color] - The end color of the gradient fill
 */
@customElement('quiet-sparkline')
export class QuietSparkline extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @state() points: number[] = [];

  /**
   * An accessible label for the sparkline. This will be read by screen readers for users who can't see the chart, so
   * make sure to describe it appropriately.
   */
  @property() label = '';

  /**
   * A space-separated list of positive values to show in the sparkline, e.g. "10 25 18 30". At least two values are
   * required to generate a chart.
   */
  @property() data = '';

  /** Determines the sparkline's appearance. */
  @property({ reflect: true }) appearance: 'gradient' | 'line' | 'solid' = 'gradient';

  /** Draws the component with colors to visually indicate the specified trend. */
  @property({ reflect: true }) trend: 'positive' | 'negative' | 'neutral';

  /** The interpolation method used to connect data points on the line. */
  @property({ reflect: true }) curve: 'linear' | 'natural' | 'step' = 'linear';

  /** Returns an SVG path for a linear, point-to-point graph */
  private getLinearPath(coordinates: string[]): string {
    return coordinates.length > 0
      ? `M ${coordinates[0]} ${coordinates
          .slice(1)
          .map(coord => `L ${coord}`)
          .join(' ')}`
      : 'M 0 0';
  }

  /** Returns an SVG path for a curved graph */
  private getNaturalPath(coordinates: string[]): string {
    if (coordinates.length <= 2) {
      return this.getLinearPath(coordinates);
    }

    const points = coordinates.map(coord => {
      const [x, y] = coord.split(' ').map(Number);
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];

      // Calculate control points for the curve
      const controlX1 = current.x + (next.x - current.x) / 3;
      const controlX2 = current.x + ((next.x - current.x) * 2) / 3;

      // Use cubic Bezier curve
      path += ` C ${controlX1} ${current.y}, ${controlX2} ${next.y}, ${next.x} ${next.y}`;
    }

    return path;
  }

  /** Returns an SVG path for a stepped graph */
  private getStepPath(coordinates: string[]): string {
    if (coordinates.length <= 1) {
      return this.getLinearPath(coordinates);
    }

    let path = `M ${coordinates[0]}`;

    for (let i = 1; i < coordinates.length; i++) {
      const [prevX] = coordinates[i - 1].split(' ').map(Number);
      const [currX, currY] = coordinates[i].split(' ').map(Number);

      // Calculate the midpoint between current and previous x coordinates
      const midX = prevX + (currX - prevX) / 2;

      // Move horizontally to midpoint, then vertically to new value
      path += ` H ${midX} V ${currY}`;

      // Complete the step to the current point
      path += ` H ${currX}`;
    }

    return path;
  }

  /** Generates the appropriate SVG path based on the desired curve. */
  private getPath(coordinates: string[]): string {
    switch (this.curve) {
      case 'natural':
        return this.getNaturalPath(coordinates);
      case 'step':
        return this.getStepPath(coordinates);
      case 'linear':
      default:
        return this.getLinearPath(coordinates);
    }
  }

  render() {
    // Add viewport padding based on the line width to prevent min/max values from getting clipped. This won't update
    // if `--line-width` changes, but in that case the user can call `el.requestUpdate()` to force an update. A very
    // lightweight style observer could be used to improve this, but might not be worth the bytes.
    const viewportPadding = parseFloat(getComputedStyle(this).getPropertyValue('--line-width')) ?? 2;
    const width = 200;
    const height = 50;
    const points = this.data
      .split(' ')
      .map(n => parseFloat(n.trim()))
      .filter(n => !Number.isNaN(n));

    // Calculate viewBox dimensions with padding
    const viewBoxWidth = Math.max(1, points.length - 1);
    const maxPoint = Math.max(...points);
    const viewBoxHeight = Math.max(1, maxPoint) + viewportPadding * 2;

    // Generate the path coordinates with adjusted y-coordinates for padding
    const coordinates =
      points.length > 0
        ? points.map((point, index) => {
            const x = index;
            const y = viewBoxHeight - point - viewportPadding;
            return `${x} ${y}`;
          })
        : ['0 0'];

    // Create the main path using the selected curve type
    const mainPath = this.getPath(coordinates);

    // Create the filled path (adds bottom corners and closes)
    const filledPath = points.length > 1 ? `${mainPath} L ${viewBoxWidth} ${viewBoxHeight} L 0 ${viewBoxHeight} Z` : '';

    return html`
      <svg
        height="${height}px"
        width="${width}px"
        viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}"
        preserveAspectRatio="none"
        aria-label=${this.label}
      >
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--fill-color)" stop-opacity="1" />
            <stop
              offset="100%"
              stop-color="var(--fill-color)"
              stop-opacity="${this.appearance === 'solid' ? '1' : '0'}"
            />
          </linearGradient>
        </defs>
        <path
          d="${filledPath}"
          stroke="transparent"
          fill="${this.appearance === 'solid' ? 'var(--fill-color)' : 'url(#gradient)'}"
        />
        <path
          d="${mainPath}"
          stroke-width="var(--line-width)"
          stroke="var(--line-color)"
          fill="transparent"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-sparkline': QuietSparkline;
  }
}
