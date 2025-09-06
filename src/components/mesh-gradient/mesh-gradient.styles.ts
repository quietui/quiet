import { css } from 'lit';

export default css`
  @keyframes colorChange {
    from {
      /* This animation uses the --gradient-color variable to detect changes */
      outline-color: var(--gradient-color, transparent);
    }
  }

  :host {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    min-height: 200px;
    overflow: hidden;
    outline: none;
    background-color: var(--quiet-surface-1);
    color: var(--optimal-text-color, inherit);

    /* Animation trick to detect CSS variable changes */
    animation: colorChange 1ms;
  }

  .gradient-container {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
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
