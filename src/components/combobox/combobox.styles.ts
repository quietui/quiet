import { css } from 'lit';

export default css`
  :host {
    --dropdown-max-height: 300px;
    --input-min-width: 12ch;
    --show-duration: 50ms;
  }

  /* Visual box base styles */
  #visual-box {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 0.75em;
    gap: 0.5em;
    font: inherit;
    cursor: text;

    /* Collapse padding when a tag is present and there's no start content */
    &:has(.tag):not(.has-start) {
      padding-inline-start: 0.25em;
    }
  }

  /* Appearance styles */
  #visual-box.normal {
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: var(--quiet-border-radius-md);
    background-color: var(--quiet-paper-color);
    color: var(--quiet-text-body);
  }

  #visual-box.filled {
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-fill-softer);
    border-radius: var(--quiet-border-radius-md);
    background-color: var(--quiet-neutral-fill-softer);
  }

  #visual-box.unstyled {
    padding: 0;
    border: none;
    background: none;
  }

  /* Focus styles */
  :not(:host([appearance='unstyled'])) #visual-box:has(#text-box:focus-visible) {
    outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
    outline-offset: calc(-1 * var(--quiet-border-width));
  }

  /* Disabled state */
  #visual-box.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Pill modifier */
  #visual-box.pill {
    padding: 0 1.25em;
    border-radius: 1.4em; /* fake a pill shape so when it wraps, tags still fit */

    .tag {
      border-radius: var(--quiet-border-radius-pill);
    }
  }

  #visual-box.xs {
    min-height: calc(var(--quiet-form-control-height-xs) - 0.5em);
    padding-block: 0.25em;
    font-size: var(--quiet-form-control-font-size-xs);
  }

  #visual-box.sm {
    min-height: calc(var(--quiet-form-control-height-sm) - 0.5em);
    padding-block: 0.25em;
    font-size: var(--quiet-form-control-font-size-sm);
  }

  #visual-box.md {
    min-height: calc(var(--quiet-form-control-height-md));
    padding-block: 0.25em;
    font-size: var(--quiet-form-control-font-size-md);
  }

  #visual-box.lg {
    min-height: calc(var(--quiet-form-control-height-lg) - 0.5em);
    padding-block: 0.25em;
    font-size: var(--quiet-form-control-font-size-lg);
  }

  #visual-box.xl {
    min-height: calc(var(--quiet-form-control-height-xl) - 0.5em);
    padding-block: 0.25em;
    font-size: var(--quiet-form-control-font-size-xl);
  }

  /* Input area - single flex container for all content */
  .input-area {
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25em;
  }

  /* Individual tags */
  .tag {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    max-width: 100%;
    padding: 0.25em 0.5em;
    gap: 0.25em;
    border-radius: var(--quiet-border-radius-sm);
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-soft);
    line-height: 1.2;
    user-select: none;
  }

  .tag-remove {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    margin: 0;
    margin-inline-start: 0.125em;
    margin-inline-end: -0.125em;
    padding: 0;
    border: none;
    border-radius: var(--quiet-border-radius-sm);
    background: transparent;
    color: var(--quiet-text-muted);
    font-size: inherit;
    cursor: pointer;
    transition: 100ms translate ease;

    quiet-icon {
      stroke-width: 0.1667em;
    }
  }

  .tag-remove:active {
    translate: 0 var(--quiet-button-active-offset);
  }

  /* Text input - base styles */
  #text-box {
    appearance: none;
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    margin: 0;
    border: none;
    background: none;
    color: var(--quiet-text-body);
    font: inherit;
    cursor: inherit;
  }

  #visual-box.xs {
    .tag,
    #text-box {
      height: calc(var(--quiet-form-control-height-xs) - (2 * var(--quiet-border-width)) - 0.5em);
      min-height: 0;
    }
  }

  #visual-box.sm {
    .tag,
    #text-box {
      height: calc(var(--quiet-form-control-height-sm) - (2 * var(--quiet-border-width)) - 0.5em);
      min-height: 0;
    }
  }

  #visual-box.md {
    .tag,
    #text-box {
      height: calc(var(--quiet-form-control-height-md) - (2 * var(--quiet-border-width)) - 0.5em);
      min-height: 0;
    }
  }

  #visual-box.lg {
    .tag,
    #text-box {
      height: calc(var(--quiet-form-control-height-lg) - (2 * var(--quiet-border-width)) - 0.5em);
      min-height: 0;
    }
  }
  #visual-box.xl {
    .tag,
    #text-box {
      height: calc(var(--quiet-form-control-height-xl) - (2 * var(--quiet-border-width)) - 0.5em);
      min-height: 0;
    }
  }

  #visual-box:has(.tag) #text-box {
    margin-inline: 0.5em;
  }

  #text-box:focus {
    outline: none;
  }

  #text-box::placeholder {
    color: var(--quiet-form-control-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  /* Multiple select mode - dynamic width with constraints */
  #visual-box.multiple #text-box {
    flex: 1 1 var(--input-min-width);
    width: auto;
    min-width: var(--input-min-width);
  }

  /* When tags wrap to multiple lines, let input take full width of new line */
  #visual-box.multiple #text-box:first-child,
  #visual-box.multiple #text-box:only-child {
    flex: 1 1 100%;
  }

  /* Clear button positioning - absolute like text-field */
  #visual-box.has-clear {
    position: relative;
    padding-inline-end: 2.5em;
  }

  #visual-box.has-clear #clear-button {
    position: absolute;
    top: 50%;
    right: 0.25em;
    transform: translateY(-50%);
  }

  /* RTL support for clear button */
  :host(:dir(rtl)) #visual-box.has-clear {
    padding-inline-start: 2.5em;
    padding-inline-end: 0.75em;
  }

  :host(:dir(rtl)) #visual-box.has-clear #clear-button {
    right: auto;
    left: 0.25em;
  }

  /* Clear button styles */
  .text-box-button {
    display: flex;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    margin: 0;
    padding: 0;
    padding-inline: 0.25em;
    border: none;
    background: none;
    color: var(--quiet-text-muted);
    font: inherit;
    font-size: 1.25em;
    cursor: pointer;
    transition: 100ms translate ease;
  }

  .text-box-button:active {
    translate: 0 1px;
  }

  /* Start and end slot styles */
  slot[name='start']::slotted(*),
  slot[name='end']::slotted(*) {
    color: var(--quiet-text-muted) !important;
  }

  slot[name='start']::slotted(quiet-icon),
  slot[name='end']::slotted(quiet-icon) {
    font-size: 1.25em !important;
    pointer-events: none;
  }

  slot[name='start']::slotted(svg),
  slot[name='end']::slotted(svg) {
    width: 1.25em;
    height: 1.25em;
    pointer-events: none;
  }

  /* Dropdown styles */
  #dropdown {
    display: flex;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    overflow-y: auto;
    overscroll-behavior: contain;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: var(--quiet-border-radius-md);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-mid);
  }

  /* Popover API overrides */
  #dropdown[popover] {
    margin: 0;
    inset: auto;
    padding: 0.25em;
    overflow: visible;
    border-radius: var(--quiet-border-radius-md);
  }

  /* Dropdown animations */
  #dropdown.show {
    animation: show var(--show-duration) ease;
  }

  #dropdown.hide {
    animation: show var(--show-duration) ease reverse;
  }

  /* Placement origins */
  :host([data-placement^='top']) #dropdown {
    transform-origin: bottom;
  }

  :host([data-placement^='bottom']) #dropdown {
    transform-origin: top;
  }

  :host([data-placement='bottom-start']) #dropdown {
    transform-origin: top left;
  }

  :host([data-placement='bottom-end']) #dropdown {
    transform-origin: top right;
  }

  :host([data-placement='top-start']) #dropdown {
    transform-origin: bottom left;
  }

  :host([data-placement='top-end']) #dropdown {
    transform-origin: bottom right;
  }

  /* Hide items when filtered out */
  ::slotted(quiet-combobox-item[hidden]) {
    display: none !important;
  }

  @keyframes show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`;
