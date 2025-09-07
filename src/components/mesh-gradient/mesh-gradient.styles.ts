import { css } from 'lit';

export default css`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    min-height: 200px;
    overflow: hidden;
    outline: none;
    color: var(--optimal-text-color, inherit);
  }

  .gradient-container {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    /* Use background-color as fallback before the gradient is generated */
    background-color: var(--gradient-color, transparent);
    /* Use color property to detect changes to --gradient-color via transition */
    color: var(--gradient-color, transparent);
    transition: color 1ms;
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
`;
