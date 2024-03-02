import { css } from 'lit';

export default css`
  :host {
    --size: 3rem;

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--size);
    height: var(--size);
    aspect-ratio: 1 / 1;
    font-size: calc(var(--size) / 3);
    font-weight: var(--quiet-base-font-weight-semibold);
    vertical-align: middle;
    border-radius: 50%;
    background-color: var(--quiet-neutral-silent);
    color: var(--quiet-neutral-silent-text);
    overflow: hidden;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--size);
    height: var(--size);
    object-fit: cover;
    overflow: hidden;
  }

  slot[name='icon'] {
    quiet-icon,
    &::slotted(*) {
      position: absolute !important;
      top: calc(50% - 0.75em) !important;
      left: calc(50% - 0.75em) !important;
      width: 1.5em !important;
      height: 1.5em !important;
    }
  }

  .characters {
    font-size: calc(var(--size) / 5.5);
    text-transform: uppercase;

    &[data-length='4'] {
      font-size: calc(var(--size) / 4.5);
    }

    &[data-length='3'] {
      font-size: calc(var(--size) / 3.5);
    }

    &[data-length='1'],
    &[data-length='2'] {
      font-size: calc(var(--size) / 2.5);
    }
  }
`;
