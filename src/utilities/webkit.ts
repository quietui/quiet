/** A custom element used solely to detect this validation bug: https://bugs.webkit.org/show_bug.cgi?id=261432 */
class webkitValidationBug extends HTMLElement {
  static formAssociated = true;

  protected internals: ElementInternals;
  public isAffectedBrowser: boolean;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.internals.setValidity({ valueMissing: true, customError: false }, 'Value missing');
    this.isAffectedBrowser = this.internals.validity.customError === true;
  }
}

let testElement: webkitValidationBug | null = null;

/** Determines if the browser has this validation bug: https://bugs.webkit.org/show_bug.cgi?id=261432 */
export function hasValidationBug() {
  if (!customElements.get('webkit-validation-bug-261432')) {
    customElements.define('webkit-validation-bug-261432', webkitValidationBug);
  }

  if (!testElement) {
    testElement = document.createElement('webkit-validation-bug-261432') as webkitValidationBug;
  }

  return testElement.isAffectedBrowser;
}
