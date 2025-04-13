import { ArcElement, Chart, DoughnutController, Legend, PieController, Title, Tooltip } from 'chart.js';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { hexToRgb } from '../../utilities/color.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './pie-chart.styles.js';

// Register only the components we need
Chart.register(DoughnutController, PieController, ArcElement, Tooltip, Legend, Title);

/**
 * <quiet-pie-chart>
 *
 * @summary A customizable doughnut or pie chart component.
 * @documentation https://quietui.com/docs/components/chart
 * @status stable
 * @since 1.0
 *
 * @event quiet-pie-chart-render - Emitted when the chart is rendered for the first time.
 * @event quiet-pie-chart-update - Emitted when the chart's data or options are updated.
 *
 * @cssproperty [--chart-font-family=inherit] - The font family to use for chart text.
 * @cssproperty [--chart-title-color=#000000] - The color of the chart title.
 * @cssproperty [--chart-title-size=16px] - The font size of the chart title.
 * @cssproperty [--chart-legend-color=#666666] - The color of the legend text.
 * @cssproperty [--chart-legend-size=12px] - The font size of the legend text.
 * @cssproperty [--chart-border-width=2] - The border width for chart segments.
 * @cssproperty [--chart-color-1=#ff6384] - The first segment color.
 * @cssproperty [--chart-color-2=#36a2eb] - The second segment color.
 * @cssproperty [--chart-color-3=#ffce56] - The third segment color.
 * @cssproperty [--chart-color-4=#4bc0c0] - The fourth segment color.
 * @cssproperty [--chart-color-5=#9966ff] - The fifth segment color.
 * @cssproperty [--chart-color-6=#ff9f40] - The sixth segment color.
 */
@customElement('quiet-pie-chart')
export class QuietPieChart extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private resizeObserver: ResizeObserver | null = null;

  @query('canvas') canvas: HTMLCanvasElement;

  @state() private chart: Chart | null = null;

  /** The type of chart to draw. */
  @property({ reflect: true }) type: 'doughnut' | 'pie' = 'doughnut';

  /** The chart's data. (Property only) */
  @property({ type: Array }) data: number[] = [];

  /** The labels for each segment. (Property only) */
  @property({ type: Array }) labels: string[] = [];

  /** The title of the chart */
  @property({ attribute: 'chart-title', reflect: true }) chartTitle = '';

  /** The doughnut cutout percentage (0 for pie). */
  @property({ reflect: true }) cutout = '50%';

  /** The radius of the chart as a percentage. */
  @property({ reflect: true }) radius = '100%';

  /** The rotation of the chart in degrees. */
  @property({ type: Number, reflect: true }) rotation = 0;

  /** The position of the legend. Set to `none` to hide the legend. */
  @property({ reflect: true, attribute: 'legend-position' }) legendPosition:
    | 'none'
    | 'top'
    | 'left'
    | 'right'
    | 'bottom' = 'top';

  /** Whether to animate the chart. */
  @property({ attribute: 'with-animation', type: Boolean, reflect: true }) withAnimation = false;

  /** Whether to show tooltips when hovering over chart segments. */
  @property({ attribute: 'with-tooltips', type: Boolean, reflect: true }) withTooltips = false;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.destroyChart();
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    // If we have a canvas element, initialize or update the chart
    if (this.canvas) {
      if (!this.chart) {
        this.initChart();
      } else if (
        changedProperties.has('chartTitle') ||
        changedProperties.has('cutout') ||
        changedProperties.has('data') ||
        changedProperties.has('labels') ||
        changedProperties.has('legendPosition') ||
        changedProperties.has('radius') ||
        changedProperties.has('rotation') ||
        changedProperties.has('type') ||
        changedProperties.has('type') ||
        changedProperties.has('withAnimation') ||
        changedProperties.has('withTooltips')
      ) {
        this.updateChart();
      }
    }
  }

  /**
   * Get the actual computed font family to use for the chart
   * This resolves the issue with 'inherit' by fetching the computed font-family
   */
  private getResolvedFontFamily(): string {
    const computedStyles = getComputedStyle(this);
    const customFontFamily = computedStyles.getPropertyValue('--chart-font-family').trim();

    // If a custom font is specified and it's not 'inherit', use it
    if (customFontFamily && customFontFamily !== 'inherit') {
      return customFontFamily;
    }

    // Otherwise, get the computed font-family of the element itself
    // This properly resolves any inherited values
    return computedStyles.fontFamily;
  }

  private initChart() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    // Get CSS computed styles
    const computedStyles = getComputedStyle(this);

    // Default colors (with and without opacity)
    const defaultColors = [
      { bg: 'rgb(238, 99, 131)', border: 'rgb(238, 99, 131, 1)' }, // rose
      { bg: 'rgb(74, 151, 244)', border: 'rgb(74, 151, 244, 1)' }, // blue
      { bg: 'rgb(220, 179, 30)', border: 'rgb(220, 179, 30, 1)' }, // yellow
      { bg: 'rgb(32, 184, 188)', border: 'rgb(32, 184, 188, 1)' }, // cyan
      { bg: 'rgb(146, 124, 251)', border: 'rgb(146, 124, 251, 1)' }, // violet
      { bg: 'rgb(240, 128, 57)', border: 'rgb(240, 128, 57, 1)' } // orange
    ];

    // Function to get color from CSS var or use default
    const getColor = (index: number) => {
      const cssVar = `--chart-color-${index + 1}`;
      const cssColor = computedStyles.getPropertyValue(cssVar).trim();

      if (cssColor) {
        // Use hexToRgb to get color components directly
        const rgbColor = hexToRgb(cssColor);

        if (rgbColor) {
          const { r, g, b } = rgbColor;

          return {
            bg: `rgb(${r}, ${g}, ${b}, 0.85)`,
            border: `rgb(${r}, ${g}, ${b}, 1)`
          };
        }

        // Fallback if parsing fails
        return defaultColors[index];
      }

      return defaultColors[index]; // Fall back to default if CSS var not set
    };

    // Generate final colors by merging CSS colors with defaults
    const colors = Array.from({ length: 6 }, (_, i) => getColor(i));

    // Create the chart
    this.chart = new Chart(ctx, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: colors.map(c => c.bg),
            borderColor: colors.map(c => c.border),
            borderWidth: parseInt(computedStyles.getPropertyValue('--chart-border-width').trim() || '2')
          }
        ]
      },
      options: this.getChartOptions()
    });

    this.dispatchEvent(
      new CustomEvent('quiet-pie-chart-render', {
        bubbles: true,
        composed: true
      })
    );
  }

  // Update the chart with current property values
  private updateChart() {
    if (!this.chart) return;

    // Update chart type if needed (requires destroying and recreating)
    if (this.chart.config.type !== this.type) {
      this.chart.config.type === this.type;
      // // Store the current canvas reference
      // const canvasElement = this.canvas;

      // // Properly destroy the chart first
      // this.destroyChart();

      // // Replace the old canvas with a new one to avoid Chart.js internal registry issues
      // const newCanvas = document.createElement('canvas');
      // newCanvas.id = 'chart';
      // canvasElement.replaceWith(newCanvas);
      // this.canvas = newCanvas;

      // // Re-initialize the chart with the new canvas
      // requestAnimationFrame(() => {
      //   this.initChart();
      // });

      // return;
    }

    // Regular update code remains the same
    this.chart.data.labels = this.labels;
    if (this.chart.data.datasets?.[0]) {
      this.chart.data.datasets[0].data = this.data;
    }

    this.chart.options = this.getChartOptions();
    this.chart.update();

    this.dispatchEvent(
      new CustomEvent('quiet-pie-chart-update', {
        bubbles: true,
        composed: true
      })
    );
  }

  // Get chart options based on component properties
  private getChartOptions() {
    const computedStyles = getComputedStyle(this);

    // Extract font sizes and ensure they're numbers
    const titleSize = parseInt(computedStyles.getPropertyValue('--chart-title-size').trim() || '22');
    const legendSize = parseInt(computedStyles.getPropertyValue('--chart-legend-size').trim() || '14');
    const tooltipTitleSize = parseInt(computedStyles.getPropertyValue('--chart-tooltip-title-size').trim() || '16');
    const tooltipBodySize = parseInt(computedStyles.getPropertyValue('--chart-tooltip-body-size').trim() || '14');

    // Get the actual resolved font family
    const fontFamily = this.getResolvedFontFamily();

    return {
      cutout: this.type === 'pie' ? 0 : this.cutout,
      radius: this.radius,
      rotation: (this.rotation * Math.PI) / 180, // Convert to radians
      plugins: {
        legend: {
          display: this.legendPosition !== 'none',
          position: this.legendPosition,
          labels: {
            color: computedStyles.getPropertyValue('--chart-legend-color').trim() || '#666666',
            font: {
              size: legendSize,
              family: fontFamily
            }
          }
        },
        title: {
          display: !!this.chartTitle,
          text: this.chartTitle,
          color: computedStyles.getPropertyValue('--chart-title-color').trim() || '#000000',
          font: {
            size: titleSize,
            family: fontFamily
          },
          padding: {
            top: 10,
            bottom: 10
          }
        },
        tooltip: {
          enabled: this.withTooltips,
          displayColors: false,
          titleFont: {
            size: tooltipBodySize,
            family: fontFamily
          },
          bodyFont: {
            size: legendSize,
            family: fontFamily
          },
          callbacks: {
            label: context => {
              let label = '';

              // In pie/doughnut charts, the value is accessed with context.raw
              // Using Intl.NumberFormat with default grouping (thousands separators)
              if (context.raw !== null && context.raw !== undefined) {
                label = new Intl.NumberFormat('en-US', {
                  useGrouping: true,
                  maximumFractionDigits: 2
                }).format(context.raw);
              }

              return label;
            }
          }
        }
      },
      animation: this.withAnimation,
      responsive: true,
      maintainAspectRatio: false
    };
  }

  // Handle resize events
  private handleResize = () => {
    if (this.chart) {
      // Update canvas dimensions to match the host element
      const rect = this.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;

      // Resize the chart
      this.chart.resize();
    }
  };

  // Destroy the current chart instance
  private destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  /**
   * Render the component
   */
  render() {
    return html`<canvas id="chart"></canvas>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-pie-chart': QuietPieChart;
  }
}
