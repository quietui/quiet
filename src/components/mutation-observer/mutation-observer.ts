import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { QuietMutationEvent } from '../../events/mutation.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './mutation-observer.styles.js';

/**
 * <quiet-mutation-observer>
 *
 * @summary Watches child elements and dispatches an event when they mutate.
 * @documentation https://quietui.org/docs/components/mutation
 * @status stable
 * @since 1.0
 *
 * @slot - The elements to observe. All direct children of the host element are observed, but not nested elements.
 *
 * @event quiet-mutation - Emitted when a slotted element is mutated. The `event.detail.record` property contains a
 *  [`MutationRecord`](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) with information about
 *  the mutation.
 */
@customElement('quiet-mutation-observer')
export class QuietMutationObserver extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private mutationObserver: MutationObserver | null = null;

  /** Disables the mutation observer. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Indicates whether attributes should be observed. */
  @property({ attribute: 'attr', type: Boolean }) attr = false;

  /** Indicates whether attribute old value should be recorded. */
  @property({ attribute: 'attr-old-value', type: Boolean }) attrOldValue = false;

  /**
   * One or more attributes to limit observations to, separate by a space. When not specified, all attributes are
   * observed.
   */
  @property({ attribute: 'attr-filter' }) attrFilter = '';

  /** Indicates whether mutations to target's children are to be observed. */
  @property({ attribute: 'child-list', type: Boolean }) childList = false;

  /** Indicates whether mutations to target's descendants are to be observed. */
  @property({ type: Boolean }) subtree = false;

  /** Indicates whether character data should be observed. */
  @property({ attribute: 'character-data', type: Boolean }) characterData = false;

  /** Indicates whether character data old value should be recorded. */
  @property({ attribute: 'character-data-old-value', type: Boolean }) characterDataOldValue = false;

  connectedCallback() {
    super.connectedCallback();
    this.startObserver();
  }

  disconnectedCallback() {
    this.stopObserver();
    super.disconnectedCallback();
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    // Toggle the disabled state
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.stopObserver();
      } else if (!this.mutationObserver) {
        this.startObserver();
      }
    }

    // Restart observer if observation options change
    if (
      changedProperties.has('attr') ||
      changedProperties.has('attrOldValue') ||
      changedProperties.has('attrFilter') ||
      changedProperties.has('childList') ||
      changedProperties.has('subtree') ||
      changedProperties.has('characterData') ||
      changedProperties.has('characterDataOldValue')
    ) {
      this.startObserver();
    }
  }

  /** Starts or restarts the mutation observer. */
  private startObserver() {
    this.stopObserver();

    // Don't set up new observer if disabled
    if (this.disabled) return;

    // Create an observer for the host element
    this.mutationObserver = new MutationObserver(records => {
      records.forEach(record => {
        const mutationEvent = new QuietMutationEvent({ record });
        this.dispatchEvent(mutationEvent);
      });
    });

    // Observe the host element
    this.mutationObserver.observe(this, {
      attributes: this.attr,
      attributeOldValue: this.attrOldValue,
      attributeFilter: this.attrFilter.length > 0 ? this.attrFilter.split(' ').map(attr => attr.trim()) : undefined,
      childList: this.childList,
      subtree: this.subtree,
      characterData: this.characterData,
      characterDataOldValue: this.characterDataOldValue
    });
  }

  /** Stops the mutation observer. */
  private stopObserver() {
    this.mutationObserver?.disconnect();
    this.mutationObserver = null;
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-mutation-observer': QuietMutationObserver;
  }
}
