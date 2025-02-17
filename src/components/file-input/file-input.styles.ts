import { css } from 'lit';

export default css`
  #dropzone {
    position: relative;
    padding: 3em 2em;
    border: dashed var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-paper-color);
    color: var(--quiet-neutral-text-colorful);
    font-weight: var(--quiet-font-weight-semibold);
    text-align: center;
    cursor: pointer;
    transition:
      150ms background-color ease,
      150ms border-color ease,
      150ms color ease;

    &:focus {
      outline: none;
    }

    &:has(input:focus-visible) {
      border-color: transparent;
      outline: var(--quiet-focus-ring);
    }

    &.dragging {
      border-style: solid;
      border-color: var(--quiet-primary-stroke-mid);
      background-color: var(--quiet-primary-fill-softer);
      color: var(--quiet-primary-text-colorful);
    }

    quiet-icon {
      color: var(--quiet-neutral-text-colorful);
      font-size: 2em;
    }

    /* Position the file input to stretch the entire dropzone so validation errors are positioned properly. */
    #file-input {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
    }

    /* Create an invisible overlay to prevent dragleave from firing on child elements */
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: '';
      opacity: 0;
    }
  }

  /* File list */
  #file-list {
    margin-block-start: 0.5em;
  }

  :host(:state(empty)) #file-list {
    display: none;
  }

  .file {
    display: flex;
    align-items: center;
    padding: 0.5em;
    gap: 1em;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-softer);

    .file-thumbnail {
      display: flex;
      position: relative;
      flex: 0 0 4em;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1;
      width: 100%;
      border-radius: calc(var(--quiet-border-radius) * 0.5);
      background: var(--quiet-neutral-fill-softer);

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
      }

      quiet-icon {
        color: var(--quiet-text-muted);
        font-size: 1.5em;
      }
    }

    .file-details {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;

      .file-name {
        white-space: normal;
      }

      .file-size {
        color: var(--quiet-text-muted);
      }
    }

    .file-actions {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
    }

    + .file {
      margin-block-start: 0.5em;
    }
  }

  /* Sizes */
  #dropzone.xs,
  #file-list.xs {
    font-size: calc(var(--quiet-form-control-font-size-xs) * 0.8375);
  }

  #dropzone.sm,
  #file-list.sm {
    font-size: calc(var(--quiet-form-control-font-size-sm) * 0.8375);
  }

  #dropzone.md,
  #file-list.md {
    font-size: calc(var(--quiet-form-control-font-size-md) * 0.8375);
  }

  #dropzone.lg,
  #file-list.lg {
    font-size: calc(var(--quiet-form-control-font-size-lg) * 0.8375);
  }

  #dropzone.xl,
  #file-list.xl {
    font-size: calc(var(--quiet-form-control-font-size-xl) * 0.8375);
  }
`;
