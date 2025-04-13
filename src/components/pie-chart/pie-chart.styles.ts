import { css } from 'lit';

export default css`
  :host {
    --chart-font-family: inherit;
    --chart-title-color: #000000;
    --chart-title-size: 22px;
    --chart-tooltip-title-size: 16px;
    --chart-tooltip-body-size: 14px;
    --chart-legend-color: #666666;
    --chart-legend-size: 14px;
    --chart-border-width: 0;
    --chart-color-1: #ee5655;
    --chart-color-2: #4b97f4;
    --chart-color-3: #dbb31d;
    --chart-color-4: #21b8bc;
    --chart-color-5: #9966ff;
    --chart-color-6: #f0803a;

    display: block;
    position: relative;
    width: 100%;
    height: auto;
  }

  canvas {
    width: 100% !important;
    max-width: 100%;
    height: 100% !important;
  }
`;
