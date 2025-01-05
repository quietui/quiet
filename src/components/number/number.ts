import type { CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './number.styles.js';

/**
 * <quiet-number>
 *
 * @summary Outputs a number in the specified format.
 * @documentation https://quietui.org/docs/components/number
 * @status stable
 * @since 1.0
 */
@customElement('quiet-number')
export class QuietNumber extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /** The number to format. */
  @property({ type: Number }) number = 0;

  /** The formatting style to use. */
  @property() type: 'decimal' | 'currency' | 'percent' | 'unit' = 'decimal';

  /**
   * The currency to use when formatting currency. Must be an ISO 4217 currency code, e.g. "EUR" for euro. If not
   * provided, USD will be assumed.
   */
  @property() currency = 'USD';

  /** How to display the currency in currency formatting. */
  @property({ attribute: 'currency-display' }) currencyDisplay: 'code' | 'symbol' | 'narrowSymbol' | 'name';

  /** In many locales, accounting format means to wrap the number with parentheses instead of appending a minus sign. */
  @property({ attribute: 'currency-sign' }) currencySign: 'standard' | 'accounting';

  /**
   * The unit to use in unit formatting. [Possible values can be found here.](https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers)
   * There is no default value. If the style is `unit`, this option must be provided.
   */
  @property() unit: string;

  /** The unit formatting style to use in unit formatting. */
  @property({ attribute: 'unit-display' }) unitDisplay: 'narrow' | 'short' | 'long';

  /**
   * The minimum number of integer digits to use. A value with a smaller number of integer digits than this number will
   * be left-padded with zeros (to the specified length) when formatted. Possible values are from `1` to `21`. The
   * default is `1`.
   */
  @property({ attribute: 'minimum-integer-digits', type: Number }) minimumIntegerDigits: number;

  /** The minimum number of fraction digits to use. Possible values are from `0` to `20`. */
  @property({ attribute: 'minimum-fraction-digits', type: Number }) minimumFractionDigits: number;

  /** The maximum number of fraction digits to use. Possible values are from `0` to `20`. */
  @property({ attribute: 'maximum-fraction-digits', type: Number }) maximumFractionDigits: number;

  /** The minimum number of significant digits to use. Possible values are from `1` to `21`; the default is `1`. */
  @property({ attribute: 'minimum-significant-digits', type: Number }) minimumSignificantDigits: number;

  /** The maximum number of significant digits to use. Possible values are from `1` to `21`; the default is `21`. */
  @property({ attribute: 'maximum-significant-digits', type: Number }) maximumSignificantDigits: number;

  /** Specifies how rounding conflicts will be resolved. */
  @property({ attribute: 'rounding-priority' }) roundingPriority: 'auto' | 'morePrecision' | 'lessPrecision';

  /**
   * Indicates the increment at which rounding should take place relative to the calculated rounding magnitude. Possible
   * values are `1`, `2`, `5`, `10`, `20`, `25`, `50`, `100`, `200`, `250`, `500`, `1000`, `2000`, `2500`, and `5000`.
   * Cannot be mixed with significant-digits rounding or any setting of `roundingPriority` other than auto.
   */
  @property({ attribute: 'rounding-increment' }) roundingIncrement:
    | '1'
    | '2'
    | '5'
    | '10'
    | '20'
    | '25'
    | '50'
    | '100'
    | '200'
    | '250'
    | '500'
    | '1000'
    | '2000'
    | '2500'
    | '5000';

  /** How decimals should be rounded. [See this page for more details.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#roundingmode) */
  @property({ attribute: 'rounding-mode' }) roundingMode:
    | 'ceil'
    | 'floor'
    | 'expand'
    | 'trunc'
    | 'halfCeil'
    | 'halfFloor'
    | 'halfExpand'
    | 'halfTrunc'
    | 'halfEven';

  /** The strategy for displaying trailing zeros on whole numbers. */
  @property({ attribute: 'trailing-zero-display' }) trailingZeroDisplay: 'auto' | 'stripIfInteger';

  /** The formatting that should be displayed for the number. */
  @property() notation: 'standard' | 'scientific' | 'engineering' | 'compact';

  /** Only used when `notation` is `compact`. */
  @property({ attribute: 'compact-display' }) compactDisplay: 'short' | 'long';

  /** Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. */
  @property() grouping: 'always' | 'never' | 'auto' | 'min2' = 'auto';

  /** When to display the sign for the number. */
  @property({ attribute: 'sign-display' }) signDisplay: 'auto' | 'always' | 'exceptZero' | 'negative' | 'never';

  render() {
    if (isNaN(this.number)) {
      return '';
    }

    return this.localize.number(this.number, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      currencySign: this.currencySign,
      unit: this.unit,
      unitDisplay: this.unitDisplay,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits,
      roundingPriority: this.roundingPriority,
      roundingIncrement: this.roundingIncrement,
      roundingMode: this.roundingMode,
      trailingZeroDisplay: this.trailingZeroDisplay,
      notation: this.notation,
      compactDisplay: this.compactDisplay,
      // @ts-expect-error - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#usegrouping
      useGrouping: this.grouping === 'never' ? false : this.grouping,
      // @ts-expect-error - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#signdisplay
      signDisplay: this.signDisplay
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-number': QuietNumber;
  }
}
