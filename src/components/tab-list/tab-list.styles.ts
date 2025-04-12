import { css } from 'lit';

export default css`
  :host {
    display: flex;
  }

  #tabs::part(content) {
    display: flex;
    position: relative;
  }

  /* Top placement */
  :host([placement='top']) {
    flex-direction: column;
  }

  :host([placement='top']) #tabs::part(content) {
    align-items: center;
  }

  :host([placement='top']) #panels {
    margin-top: calc(var(--quiet-border-width) * -2);
    padding-top: 2rem;
    border-top: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-stroke-softer);
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
    order: 2;
  }

  :host([placement='bottom']) #tabs::part(content) {
    align-items: center;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  :host([placement='bottom']) #panels {
    order: 1;
    margin-bottom: calc(var(--quiet-border-width) * -2);
    padding-bottom: 2rem;
    border-bottom: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-stroke-softer);
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

  :host([placement='start']) #tabs::part(content) {
    flex: 0 0 auto;
    flex-direction: column;
  }

  :host([placement='start']) #panels {
    flex: 1 1 auto;
    margin-inline-start: calc(var(--quiet-border-width) * -2);
    padding-inline-start: 2rem;
    border-left: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-fill-soft);
  }

  :host([placement='start']) #panels:dir(rtl) {
    border-right: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-fill-soft);
    border-left: none;
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
  }

  :host([placement='end']) #tabs::part(content) {
    flex: 0 0 auto;
    flex-direction: column;
  }

  :host([placement='end']) #panels {
    flex: 1 1 auto;
    order: 1;
    margin-inline-end: calc(var(--quiet-border-width) * -2);
    padding-inline-end: 2rem;
    border-right: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-fill-soft);
  }

  :host([placement='end']) #panels:dir(rtl) {
    border-right: none;
    border-left: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) var(--quiet-neutral-fill-soft);
  }

  :host([placement='end']) ::slotted(quiet-tab) {
    border-left: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) transparent;
  }

  :host([placement='end']) ::slotted(quiet-tab:dir(rtl)) {
    border-right: var(--quiet-border-style) calc(var(--quiet-border-width) * 2) transparent;
    border-left: none;
  }

  :host([placement='end']) ::slotted(quiet-tab[aria-selected='true']) {
    border-color: var(--quiet-primary-fill-mid);
  }
`;
