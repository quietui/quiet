import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { seededNumberGenerator } from '../../utilities/math.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './lorem-ipsum.styles.js';

type NumberGenerator = ReturnType<typeof seededNumberGenerator>;

// prettier-ignore
const DICTIONARY = 'a ac adipiscing aenean aliquam aliquet amet ante at auctor augue bibendum condimentum congue consectetur consequat convallis cubilia curae dictum dignissim dolor dui duis egestas eget elit enim erat est et etiam eu euismod ex facilisis faucibus felis fermentum finibus fringilla fusce hendrerit iaculis id in integer interdum ipsum justo lacinia lacus laoreet leo libero ligula lorem luctus magna malesuada massa mauris maximus mi molestie morbi nec neque nisl non nulla nullam nunc odio orci ornare pellentesque pharetra placerat porta porttitor posuere praesent pretium primis proin pulvinar quam quis quisque rhoncus risus sapien scelerisque sed sem semper sit suscipit suspendisse tempor tempus tortor tristique turpis ullamcorper ultrices ut varius vehicula vel velit venenatis vestibulum vivamus viverra vulputate'.split(' ');

function clampRandom(value: number, min: number, max: number) {
  return Math.floor(value * (max - min + 1)) + min;
}

/**
 * <quiet-lorem-ipsum>
 *
 * @summary Outputs placeholder text in various formats for testing designs with random content.
 * @documentation https://quietui.org/docs/components/lorem-ipsum
 * @status stable
 * @since 1.0
 */
@customElement('quiet-lorem-ipsum')
export class QuietLoremIpsum extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private generateNumber: NumberGenerator;

  /** The type of HTML content to generate. */
  @property() type: 'sentence' | 'title' | 'paragraph' | 'ol' | 'ul' = 'sentence';

  /**
   * The length of the content to generate, e.g. the number of words, sentences, paragraphs, or list items. This should
   * be a number or a range in the format of `{min}-{max}`, e.g. `2-4`.
   */
  @property() length: number | string = '3-5';

  /**
   * By default, the generator will produce random content every time it runs. Use this option to seed the generator
   * with a non-zero number and force it to output the same content every time.
   */
  @property({ type: Number }) seed: number;

  /**
   * The number of words that should occur in a sentence or list item. This should be a number or a range in the format
   * of `{min}-{max}`, e.g. `4-16`.
   */
  @property({ attribute: 'words-per-sentence' }) wordsPerSentence: number | string = '4-16';

  /**
   * The number of sentences that should occur in a paragraph. This should be a number or a range in the format of
   * `{min}-{max}`, e.g. `3-6`.
   */
  @property({ attribute: 'sentences-per-paragraph' }) sentencesPerParagraph: number | string = '3-6';

  /** Returns an array of words of the specified length. */
  private generateWords(length: number) {
    const words: string[] = [];

    for (let i = 0; i < length; i++) {
      const index = clampRandom(this.generateNumber(), 0, DICTIONARY.length - 1);
      words.push(DICTIONARY[index]);
    }

    return words;
  }

  /** Returns a number within the specified range. */
  private getNumberWithinRange(range: number | string): number {
    // Returns numbers as-is
    if (typeof range === 'number') return range || 0;
    if (typeof range === 'string' && !range.includes('-')) return Number(range) || 0;

    // Pick a random number from the range
    const parsedRange = String(range).split('-');
    const min = Number(parsedRange[0]) || 0;
    const max = Number(parsedRange[1]) || 0;
    return clampRandom(this.generateNumber(), min, max);
  }

  /** Generates a list of random items based on the properties that are currently set */
  private generateList() {
    const numItems = this.getNumberWithinRange(this.length);
    let items = '';

    for (let i = 0; i < numItems; i++) {
      const numWords = this.getNumberWithinRange(this.wordsPerSentence);
      const words = this.generateWords(numWords);
      const item = words.join(' ');

      items += `<li>${item.charAt(0).toUpperCase() + item.slice(1)}</li>`;
    }

    return `<${this.type}>${items}</${this.type}>`;
  }

  /** Generates random paragraphs based on the properties that are currently set */
  private generateParagraphs() {
    const numParagraphs = this.getNumberWithinRange(this.length);
    let paragraphs = '';

    for (let i = 0; i < numParagraphs; i++) {
      const sentences = this.generateSentences();
      paragraphs += `<p>${sentences}</p>`;
    }

    return paragraphs;
  }

  /** Generates random sentences based on the properties that are currently set */
  private generateSentences() {
    const commaFrequency = 10;
    const numSentences = this.getNumberWithinRange(this.length);
    let sentences = '';

    for (let i = 0; i < numSentences; i++) {
      const numWords = this.getNumberWithinRange(this.wordsPerSentence);
      const words = this.generateWords(numWords);
      let sentence = '';

      for (let j = 0; j < words.length; j++) {
        const word = words[j];

        // Capitalize the first letter
        if (j === 0) {
          sentence += word.charAt(0).toUpperCase() + word.slice(1);
          continue;
        }

        // Add commas (but not near the end of the sentence)
        if (j < words.length - 3) {
          const addComma = clampRandom(this.generateNumber(), 0, commaFrequency) === 0;
          if (addComma) sentence += ', ';
        }

        sentence += ` ${word}`;
      }

      sentences += `${sentence}. `;
    }

    return sentences.trim();
  }

  /** Generates a random title based on the properties that are currently set */
  private generateTitle() {
    const numWords = this.getNumberWithinRange(this.length);
    const words = this.generateWords(numWords);
    const title = [];

    for (const word of words) {
      title.push(word.charAt(0).toUpperCase() + word.slice(1));
    }

    return title.join(' ');
  }

  render() {
    // Setup the number generator so it's the same for each render if we have a seed
    const seed = typeof this.seed === 'number' ? this.seed : parseFloat(this.seed);
    this.generateNumber = typeof this.seed === 'undefined' ? () => Math.random() : seededNumberGenerator(seed);

    if (this.type === 'sentence') {
      this.innerHTML = this.generateSentences();
    }

    if (this.type === 'paragraph') {
      this.innerHTML = this.generateParagraphs();
    }

    if (this.type === 'title') {
      this.innerHTML = this.generateTitle();
    }

    if (this.type === 'ol' || this.type === 'ul') {
      this.innerHTML = this.generateList();
    }

    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-lorem-ipsum': QuietLoremIpsum;
  }
}
