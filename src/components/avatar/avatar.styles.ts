import { css } from 'lit';

export default css`
  :host {
    --size: 3rem;
    display: inline-flex;

    position: relative;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    width: var(--size);
    height: var(--size);
    overflow: hidden;
    border-radius: 50%;
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-soft);
    font-weight: var(--quiet-font-weight-semibold);
    font-size: calc(var(--size) / 3);
    vertical-align: middle;
  }

  #image {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--size);
    height: var(--size);
    overflow: hidden;
    object-fit: cover;
  }

  slot[name='icon'] quiet-icon,
  slot[name='icon']::slotted(*) {
    position: absolute !important;
    top: calc(50% - 0.75em) !important;
    left: calc(50% - 0.75em) !important;
    width: 1.5em !important;
    height: 1.5em !important;
  }

  #characters {
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
