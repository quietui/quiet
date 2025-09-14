import { css } from 'lit';

export default css`
  :host {
    --gradient-color: ; /* empty generates a random hue */
    --brightness: 0; /* brightness adjustment from -100 to +100 */

    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    overflow: hidden;
    outline: none;
    color: var(--optimal-text-color, inherit);
  }

  #gradient {
    /* Use z-index to detect changes to --brightness via transition */
    /* The value is clamped between 0-100 to ensure valid z-index */
    z-index: calc(max(0, min(100, 50 + var(--brightness, 0) * 0.5)));
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    /* Use background-color as fallback before the gradient is generated */
    background-color: var(--gradient-color, transparent);
    /* Use color property to detect changes to --gradient-color via transition */
    color: var(--gradient-color, transparent);
    transition:
      color 1ms,
      z-index 1ms;
    will-change: transform;
  }

  #content {
    z-index: 101; /* Always above the gradient layer */
    position: relative;
    width: 100%;
    text-align: center;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    :host([data-animated]) #gradient {
      animation: none;
    }
  }
`;
