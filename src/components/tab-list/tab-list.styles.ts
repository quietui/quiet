import { css } from 'lit';

export default css`
  :host {
    display: flex;
  }

  #tabs {
    position: relative;
    display: flex;
  }

  /* Top placement */
  :host([placement='top']) {
    flex-direction: column;
  }

  :host([placement='top']) #tabs {
    align-items: center;
    overflow-x: auto;
    scrollbar-width: thin;
    scroll-behavior: smooth;
  }

  :host([placement='top']) #panels {
    border-top: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-stroke-softer);
    padding-top: 2rem;
    margin-top: calc(var(--quiet-border-width) * -2);
  }

  :host([placement='top']) ::slotted(quiet-tab) {
    border-bottom: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) transparent;
  }

  :host([placement='top']) ::slotted(quiet-tab[aria-selected='true']) {
    border-bottom-color: var(--quiet-primary-fill-mid);
  }

  /* Bottom placement */
  :host([placement='bottom']) {
    flex-direction: column;
  }

  :host([placement='bottom']) #tabs {
    align-items: center;
    order: 2;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  :host([placement='bottom']) #panels {
    order: 1;
    border-bottom: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-stroke-softer);
    padding-bottom: 2rem;
    margin-bottom: calc(var(--quiet-border-width) * -2);
  }

  :host([placement='bottom']) ::slotted(quiet-tab) {
    border-top: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) transparent;
  }

  :host([placement='bottom']) ::slotted(quiet-tab[aria-selected='true']) {
    border-top-color: var(--quiet-primary-fill-mid);
  }

  /* Start placement */
  :host([placement='start']) {
    flex-direction: row;
  }

  :host([placement='start']) #tabs {
    flex: 0 0 auto;
    flex-direction: column;
  }

  :host([placement='start']) #panels {
    flex: 1 1 auto;
    border-left: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-fill-soft);
    margin-inline-start: calc(var(--quiet-border-width) * -2);
    padding-inline-start: 2rem;
  }

  :host([placement='start']) #panels:dir(rtl) {
    border-left: none;
    border-right: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-fill-soft);
  }

  :host([placement='start']) ::slotted(quiet-tab) {
    border-right: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) transparent;
  }

  :host([placement='start']) ::slotted(quiet-tab:dir(rtl)) {
    border-right: none;
    border-left: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) transparent;
  }

  :host([placement='start']) ::slotted(quiet-tab[aria-selected='true']) {
    border-color: var(--quiet-primary-fill-mid);
  }

  /* End placement */
  :host([placement='end']) {
    flex-direction: row;
  }

  :host([placement='end']) #tabs {
    order: 2;
    flex: 0 0 auto;
    flex-direction: column;
  }

  :host([placement='end']) #panels {
    order: 1;
    flex: 1 1 auto;
    border-right: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-fill-soft);
    margin-inline-end: calc(var(--quiet-border-width) * -2);
    padding-inline-end: 2rem;
  }

  :host([placement='end']) #panels:dir(rtl) {
    border-right: none;
    border-left: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-fill-soft);
  }

  :host([placement='end']) ::slotted(quiet-tab) {
    border-left: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) transparent;
  }

  :host([placement='end']) ::slotted(quiet-tab:dir(rtl)) {
    border-left: none;
    border-right: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) transparent;
  }

  :host([placement='end']) ::slotted(quiet-tab[aria-selected='true']) {
    border-color: var(--quiet-primary-fill-mid);
  }
`;
