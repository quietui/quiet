import { Chart, type ChartConfiguration, registerables } from 'chart.js';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { parseSpaceDelimitedTokens } from '../../utilities/parse.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './bar-chart.styles.js';

// Register Chart.js components
Chart.register(...registerables);

/**
 * <quiet-bar-chart>
 *
 * @summary A bar chart component powered by Chart.js
 * @documentation https://quietui.org/docs/components/bar-chart
 * @status experimental
 * @since TODO
 *
 * @property {string[]} labels - Array of labels for the chart
 * @property {number[]} values - Array of values for a simple single-dataset chart
 * @property {object} data - Full Chart.js data object for complex charts
 * @property {object} options - Full Chart.js options object for advanced customization
 *
 * @attribute title - Chart title
 * @attribute orientation - Chart orientation: "vertical" (default) or "horizontal"
 * @attribute height - Chart height in pixels
 * @attribute width - Chart width in pixels
 * @attribute colors - Space-delimited list of hex colors for bars
 * @attribute x-label - Label for X axis
 * @attribute y-label - Label for Y axis
 * @attribute show-legend - Whether to show legend ("true" or "false")
 * @attribute show-grid - Whether to show grid lines ("true" or "false")
 */
@customElement('quiet-bar-chart')
export class QuietBarChart extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** Canvas element for Chart.js */
  @query('canvas') private canvas!: HTMLCanvasElement;

  /** Chart.js instance */
  private chart?: Chart;

  /** Array of labels for the chart */
  @property({ type: Array }) labels: string[] = [];

  /** Array of values for simple single-dataset charts */
  @property({ type: Array }) values: number[] = [];

  /** Full Chart.js data object for complex charts */
  @property({ type: Object }) data?: ChartConfiguration['data'];

  /** Full Chart.js options object for advanced customization */
  @property({ type: Object }) options?: ChartConfiguration['options'];

  /** Chart title */
  @property() title = '';

  /** Chart orientation: "vertical" or "horizontal" */
  @property() orientation: 'vertical' | 'horizontal' = 'vertical';

  /** Chart height in pixels */
  @property({ type: Number }) height?: number;

  /** Chart width in pixels */
  @property({ type: Number }) width?: number;

  /** Space-delimited list of hex colors for bars */
  @property() colors = '';

  /** Label for X axis */
  @property({ attribute: 'x-label' }) xLabel = '';

  /** Label for Y axis */
  @property({ attribute: 'y-label' }) yLabel = '';

  /** Whether to show legend */
  @property({ attribute: 'with-legend', type: Boolean, reflect: true }) withLegend = false;

  /** Whether to show grid lines */
  @property({ attribute: 'with-grid', type: Boolean, reflect: true }) withGrid = false;

  disconnectedCallback() {
    super.disconnectedCallback();
    this.destroyChart();
  }

  updated(changedProperties: PropertyValues<this>) {
    // Recreate chart if any relevant property changes
    if (
      changedProperties.has('labels') ||
      changedProperties.has('values') ||
      changedProperties.has('data') ||
      changedProperties.has('options') ||
      changedProperties.has('title') ||
      changedProperties.has('orientation') ||
      changedProperties.has('colors') ||
      changedProperties.has('xLabel') ||
      changedProperties.has('yLabel') ||
      changedProperties.has('withLegend') ||
      changedProperties.has('withGrid')
    ) {
      this.createChart();
    }
  }

  private destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

  private createChart() {
    if (!this.canvas) return;

    this.destroyChart();

    const chartData = this.buildChartData();
    const chartOptions = this.buildChartOptions();

    this.chart = new Chart(this.canvas, {
      type: this.orientation === 'horizontal' ? 'bar' : 'bar',
      data: chartData,
      options: chartOptions
    });
  }

  private buildChartData(): ChartConfiguration['data'] {
    // If full data object is provided, use it
    if (this.data) {
      return this.data;
    }

    // Parse colors from the colors property
    const colors = parseSpaceDelimitedTokens(this.colors);

    // Build simple data from labels and values
    return {
      labels: this.labels,
      datasets: [
        {
          label: this.title || 'Data',
          data: this.values,
          backgroundColor: this.values.map((_, index) => colors[index % colors.length]),
          borderColor: this.values.map((_, index) => colors[index % colors.length]),
          borderWidth: 1
        }
      ]
    };
  }

  private buildChartOptions(): ChartConfiguration['options'] {
    // If full options object is provided, use it
    if (this.options) {
      return this.options;
    }

    // Otherwise, build options from attributes
    const options: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: this.orientation === 'horizontal' ? 'y' : 'x',
      plugins: {
        title: {
          display: !!this.title,
          text: this.title
        },
        legend: {
          display: this.withLegend && (this.data?.datasets?.length ?? 1) > 1
        }
      },
      scales: {
        x: {
          title: {
            display: !!this.xLabel,
            text: this.xLabel
          },
          grid: {
            display: this.withGrid
          }
        },
        y: {
          title: {
            display: !!this.yLabel,
            text: this.yLabel
          },
          grid: {
            display: this.withGrid
          }
        }
      }
    };

    return options;
  }

  render() {
    return html` <canvas></canvas> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-bar-chart': QuietBarChart;
  }
}
