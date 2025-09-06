import { css } from 'lit';

export default css`
  :host {
    --gradient-opacity: 1;
    --gradient-saturation: 100%;
    --gradient-brightness: 100%;

    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    min-height: 200px;
    overflow: hidden;
    background-color: var(--quiet-surface-1);
  }

  .gradient-container {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    filter: saturate(var(--gradient-saturation)) brightness(var(--gradient-brightness));
    opacity: var(--gradient-opacity);
    transition: opacity 0.3s ease;
    will-change: transform;
  }

  .content {
    box-sizing: border-box;
    z-index: 1;
    position: relative;
    width: 100%;
    text-align: center;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    :host([data-animated]) .gradient-container {
      animation: none;
    }
  }

  /* Print styles */
  @media print {
    .gradient-container {
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
  }
`;
