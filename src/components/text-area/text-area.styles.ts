import { css } from 'lit';

export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }

  #label {
    display: inline-block;
    max-width: fit-content;
    font-size: 0.9375em;
    font-weight: var(--quiet-font-weight-semibold);
    line-height: calc(var(--quiet-line-height) * 0.75);
  }

  #box {
    flex: 1 1 auto;
    position: relative;
    font: inherit;
    cursor: text;

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  #text-area {
    display: block;
    width: 100%;
    max-width: 100%;
    font: inherit;
    color: var(--quiet-text-body);
    border: none;
    background: none;
    margin: 0;
    cursor: inherit;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--quiet-text-muted);
      user-select: none;
      -webkit-user-select: none;
    }
  }

  /* Normal */
  #box.normal {
    background-color: var(--quiet-paper-color);
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: calc(var(--quiet-border-radius) / 1.5);

    #text-area {
      padding-inline: 0.75em;
    }

    &:has(#text-area:focus-visible) {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: calc(-1 * var(--quiet-border-width) - 1px);
    }
  }

  /* Filled */
  #box.filled {
    background-color: var(--quiet-neutral-fill-softer);
    border-radius: calc(var(--quiet-border-radius) / 1.5);

    #text-area {
      padding-inline: 0.75em;
    }

    &:has(#text-area:focus-visible) {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: calc(-1 * var(--quiet-border-width) - 1px);
    }
  }

  /* Sizes */
  #box.xs {
    font-size: var(--quiet-form-control-font-size-xs);

    #text-area {
      min-height: var(--quiet-form-control-height-xs);
      padding-block: 0.2em;
    }
  }

  #box.sm {
    font-size: var(--quiet-form-control-font-size-sm);

    #text-area {
      min-height: var(--quiet-form-control-height-sm);
      padding-block: 0.325em;
    }
  }

  #box.md {
    font-size: var(--quiet-form-control-font-size-md);

    #text-area {
      min-height: var(--quiet-form-control-height-md);
      padding-block: 0.65em;
    }
  }

  #box.lg {
    font-size: var(--quiet-form-control-font-size-lg);

    #text-area {
      min-height: var(--quiet-form-control-height-lg);
      padding-block: 0.5em;
    }
  }

  #box.xl {
    font-size: var(--quiet-form-control-font-size-xl);

    #text-area {
      min-height: var(--quiet-form-control-height-xl);
      padding-block: 0.5em;
    }
  }

  /* Resizing */
  #box.resize-none #text-area,
  #box.resize-auto #text-area {
    resize: none;
  }

  #box.resize-vertical #text-area {
    resize: vertical;
  }

  #description {
    font-size: 0.8375rem;
    color: var(--quiet-text-muted);
  }

  :host([required]) #label::after {
    content: var(--quiet-form-control-required-content);
    margin-inline-start: -0.2em;
  }
`;
