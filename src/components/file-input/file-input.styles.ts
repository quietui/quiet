import { css } from 'lit';

export default css`
  #dropzone {
    position: relative;
    border: dashed var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-paper-color);
    text-align: center;
    color: var(--quiet-text-muted);
    padding: 2em;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:has(input:focus-visible) {
      outline: var(--quiet-focus-ring);
      border-color: transparent;
    }

    &.dragging {
      background-color: var(--quiet-primary-fill-softer);
      border-color: var(--quiet-primary-stroke-mid);
      border-style: solid;
    }

    quiet-icon {
      font-size: 2em;
      color: var(--quiet-primary-text-colorful);
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
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
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
    gap: 1em;
    background-color: var(--quiet-paper-color);
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius);
    box-shadow: var(--quiet-shadow-softer);
    padding: 0.5em;

    .file-thumbnail {
      position: relative;
      flex: 0 0 4em;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      aspect-ratio: 1;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: calc(var(--quiet-border-radius) * 0.5);
      }

      &:has(quiet-icon) {
        background: var(--quiet-neutral-fill-softer);
        border-radius: var(--quiet-border-radius);
      }

      quiet-icon {
        font-size: 2em;
        color: var(--quiet-text-muted);
      }
    }

    .file-details {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;

      .file-name {
        white-space: normal;
      }

      .file-size {
        color: var(--quiet-text-muted);
      }
    }

    .file-actions {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
    }

    + .file {
      margin-block-start: 0.5em;
    }
  }

  /* Sizes */
  #dropzone.xs,
  #file-list.xs {
    font-size: calc(var(--quiet-form-control-font-size-xs) * 0.875);
  }

  #dropzone.sm,
  #file-list.sm {
    font-size: calc(var(--quiet-form-control-font-size-sm) * 0.875);
  }

  #dropzone.md,
  #file-list.md {
    font-size: calc(var(--quiet-form-control-font-size-md) * 0.875);
  }

  #dropzone.lg,
  #file-list.lg {
    font-size: calc(var(--quiet-form-control-font-size-lg) * 0.875);
  }

  #dropzone.xl,
  #file-list.xl {
    font-size: calc(var(--quiet-form-control-font-size-xl) * 0.875);
  }
`;
