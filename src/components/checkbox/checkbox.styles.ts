import { css } from 'lit';

export default css`
  :host {
    display: inline-grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 0.5em;
  }

  /* Sizes */
  :host([size='xs']) {
    font-size: var(--quiet-form-control-font-size-xs);
  }

  :host([size='sm']) {
    font-size: var(--quiet-form-control-font-size-sm);
  }

  :host([size='md']) {
    font-size: var(--quiet-form-control-font-size-md);
  }

  :host([size='lg']) {
    font-size: var(--quiet-form-control-font-size-lg);
  }

  :host([size='xl']) {
    font-size: var(--quiet-form-control-font-size-xl);
  }

  /* The checkbox's label */
  #label {
    display: contents; /* Makes children participate in the grid */
    cursor: pointer;
  }

  :host(:state(disabled)) #label {
    cursor: not-allowed;
  }

  #visual-box {
    display: flex;
    position: relative;
    grid-row: 1;
    grid-column: 1;
    flex: 0 0 auto;
    align-self: center; /* Vertically center with label text */
    width: 1.125em;
    height: 1.125em;
    border-radius: var(--quiet-border-radius-sm);
    transition:
      100ms background-color ease,
      100ms border-color ease;

    &:has(:focus-visible) {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: var(--quiet-border-width);
    }

    /* Normal */
    &.normal {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
      background-color: var(--quiet-paper-color);
      color: var(--quiet-primary-text-on-mid);

      &.checked,
      &.indeterminate {
        border-color: var(--quiet-primary-fill-mid);
        background-color: var(--quiet-primary-fill-mid);
      }
    }

    /* Filled */
    &.filled {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-fill-soft);
      background-color: var(--quiet-neutral-fill-soft);
      color: var(--quiet-primary-text-on-mid);

      &.checked,
      &.indeterminate {
        border-color: var(--quiet-primary-fill-mid);
        background-color: var(--quiet-primary-fill-mid);
      }
    }

    /* Check + indeterminate icons */
    #check-icon,
    #indeterminate-icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      scale: 0;
      font-size: 1.25em;
      opacity: 0;
      stroke-width: 0.125em;
      transition:
        100ms opacity ease,
        100ms scale ease;
      will-change: opacity; /* prevents the icon from shifting slightly in Safari when checked */
    }

    /* Fix check alignment */
    #check-icon {
      margin-inline: -0.5px;
    }

    &.checked:not(.indeterminate) #check-icon,
    &.indeterminate #indeterminate-icon {
      scale: 1;
      opacity: 1;
    }

    /* The actual checkbox control */
    #checkbox {
      appearance: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      cursor: inherit;

      &:focus {
        outline: none;
      }
    }
  }

  /* Label slot content */
  #label > slot {
    grid-row: 1;
    grid-column: 2;
  }

  :host(:state(disabled)) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  #description {
    display: block;
    grid-row: 2;
    grid-column: 2;
    margin-block-start: -0.5em;
    color: var(--quiet-text-muted);
    font-size: max(12px, 0.875em); /* never smaller than 12px */
  }
`;
