import { css } from 'lit';

export default css`
  #color-preview {
    flex: 0 0 auto;
    width: 1.75em;
    aspect-ratio: 1;
    border-radius: 50%;
    box-shadow: inset 0 0 0 0.0625em color-mix(in oklab, black, transparent 85%);
    pointer-events: none;
  }

  /* Utilities */
  .transparent-bg {
    --size: 0.5em;
    display: flex;
    background: var(--quiet-silent);
    background-size: var(--size) var(--size);
    background-position:
      0 0,
      0 0,
      calc(var(--size) / -2) calc(var(--size) / -2),
      calc(var(--size) / 2) calc(var(--size) / 2);
    background-image: linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
      linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
      linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
  }
`;
