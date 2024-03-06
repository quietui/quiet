import { css } from 'lit';

export default css`
  :host {
    --indicator-color: var(--quiet-primary-fill-moderate);
    --track-color: var(--quiet-neutral-fill-softer);

    display: flex;
    align-items: center;
    width: 100%;
    height: 1.5rem;
    font-size: 0.875em;
    background-color: var(--track-color);
    border-radius: 9999px;
    overflow: hidden;
  }

  .indicator {
    --percentage: 0%;

    display: grid;
    place-content: center;
    width: var(--percentage);
    height: 100%;
    border-radius: inherit;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    background-color: var(--indicator-color);
    color: var(--quiet-primary-fill-text-moderate);
    font-weight: var(--quiet-font-weight-semibold);
    transition: 0.3s width ease;

    slot {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-inline: 1em;
      overflow: hidden;
    }

    &.indeterminate {
      width: 50%;
      border-radius: inherit;
      animation: 2.5s indeterminate infinite cubic-bezier(0.45, 0, 0.55, 1);

      &:dir(rtl) {
        animation-name: indeterminate-rtl;
      }
    }
  }

  @keyframes indeterminate {
    0% {
      translate: -100%;
    }
    20% {
      translate: -100%;
    }

    100% {
      translate: 200%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      translate: 100%;
    }
    20% {
      translate: 100%;
    }

    100% {
      translate: -200%;
    }
  }
`;
