// random-content.ts
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './random-content.styles.js';

/**
 * <quiet-random-content>
 *
 * @summary Randomly displays one or more elements from a list.
 * @documentation https://quietui.org/docs/components/random-content
 * @status stable
 * @since 1.0
 *
 * @slot - A pool of items that will be randomly displayed. Each item _must_ be a direct descendant of the host element.
 */
@customElement('quiet-random-content')
export class QuietRandomContent extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private currentIndices = new Set<number>();
  private sequencePosition = 0;

  /** The number of items to show. */
  @property({ type: Number }) items = 1;

  /**
   * The selection mode. The default is 'unique', which ensures different items are shown after calling `randomize()`,
   * when possible. Use `random` for true randomization or `sequence` to show the next set of items based on their DOM
   * position.
   */
  @property({ type: String }) mode: 'unique' | 'random' | 'sequence' = 'unique';

  firstUpdated() {
    this.applySelection();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('items') || changedProperties.has('mode')) {
      // Reset the sequence position if the mode has changed to sequence
      if (changedProperties.has('mode') && this.mode === 'sequence') {
        this.sequencePosition = 0;
      }
      this.applySelection();
    }
  }

  /** Applies selection based on the mode and items properties. */
  private applySelection(isManualRandomize = false) {
    const children = Array.from(this.children);
    if (!children.length) return;

    const itemsToShow = Math.min(this.items, children.length);
    let selected: Set<number>;

    switch (this.mode) {
      case 'sequence':
        selected = this.getSequenceIndices(children.length, itemsToShow, isManualRandomize);
        break;

      case 'unique':
        selected = this.getUniqueRandomIndices(
          children.length,
          itemsToShow,
          isManualRandomize ? this.currentIndices : undefined
        );
        break;

      case 'random':
        selected = this.getRandomIndices(children.length, itemsToShow);
        break;

      default:
        // Fallback to unique mode for invalid values
        selected = this.getUniqueRandomIndices(children.length, itemsToShow);
    }

    this.currentIndices = selected;
    this.updateVisibility(children, selected);
  }

  /** Gets truly random indices with possible duplicates from previous selection. */
  private getRandomIndices(childCount: number, itemsToShow: number): Set<number> {
    // If we need to show all children, just return all indices
    if (itemsToShow >= childCount) {
      return new Set(Array.from({ length: childCount }, (_, i) => i));
    }

    // For truly random, we still want to avoid duplicate indices in the
    // current selection, but we don't care about previous selections
    const indices = new Set<number>();
    const availableIndices = Array.from({ length: childCount }, (_, i) => i);

    // Fisher-Yates partial shuffle for current selection
    for (let i = 0; i < itemsToShow; i++) {
      const j = Math.floor(Math.random() * (availableIndices.length - i)) + i;
      [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }

    availableIndices.slice(0, itemsToShow).forEach(i => indices.add(i));
    return indices;
  }

  /** Gets sequence indices, advancing position on manual randomize. */
  private getSequenceIndices(childCount: number, itemsToShow: number, advance: boolean): Set<number> {
    if (advance) {
      this.sequencePosition = (this.sequencePosition + itemsToShow) % childCount;
    }

    const indices = new Set<number>();
    for (let i = 0; i < itemsToShow; i++) {
      indices.add((this.sequencePosition + i) % childCount);
    }

    return indices;
  }

  /** Gets unique random indices, avoiding excluded indices if possible. */
  private getUniqueRandomIndices(childCount: number, itemsToShow: number, excludeIndices?: Set<number>): Set<number> {
    // If we need to show all children, just return all indices
    if (itemsToShow >= childCount) {
      return new Set(Array.from({ length: childCount }, (_, i) => i));
    }

    let availableIndices = Array.from({ length: childCount }, (_, i) => i);

    // Try to exclude previous indices if we have enough alternatives
    if (excludeIndices && excludeIndices.size > 0) {
      const filtered = availableIndices.filter(i => !excludeIndices.has(i));
      // Only use filtered list if we have enough items left
      if (filtered.length >= itemsToShow) {
        availableIndices = filtered;
      }
    }

    // Fisher-Yates partial shuffle
    for (let i = 0; i < itemsToShow; i++) {
      const j = Math.floor(Math.random() * (availableIndices.length - i)) + i;
      [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }

    return new Set(availableIndices.slice(0, itemsToShow));
  }

  /** Updates the visibility of children based on selected indices. */
  private updateVisibility(children: Element[], selected: Set<number>) {
    children.forEach((el, i) => {
      if (selected.has(i)) {
        el.setAttribute('data-visible', '');
      } else {
        el.removeAttribute('data-visible');
      }
    });
  }

  /** Rotates the visible item(s) based on the selected mode. */
  public randomize() {
    this.applySelection(true);
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-random-content': QuietRandomContent;
  }
}
