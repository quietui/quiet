import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './stamp.styles.js';

/**
 * <quiet-stamp>
 *
 * @summary Stamps let you create a template and "stamp out" multiple copies of it using custom data.
 * @documentation https://quietui.org/docs/components/stamp
 * @status experimental
 * @since 1.0
 *
 * @slot - The default slot.
 * @slot named - A named slot.
 */
@customElement('quiet-stamp')
export class QuietStamp extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The id of the `<template>` element to use as a stamp. */
  @property() template = '';

  /**
   * When true, the stamped content will replace the `<quiet-stamp>` element instead of being appended to it. This can
   * be useful for controlling exactly what appears in the DOM, but it can also be confusing for developers who may not
   * understand how the stamped content was generated.
   */
  @property({ type: Boolean }) replace = false;

  updated(changedProperties: PropertyValues<this>) {
    // Handle template changes
    if (changedProperties.has('template') || changedProperties.has('replace')) {
      this.renderTemplate();
    }
  }

  /** A helper to determine if a placeholder has HTML content */
  private isHtmlExpression(text: string): { key: string; isHtml: boolean } {
    const htmlSuffix = ':html';
    const endsWithHtml = text.endsWith(htmlSuffix);
    return {
      key: endsWithHtml ? text.slice(0, -htmlSuffix.length) : text,
      isHtml: endsWithHtml
    };
  }

  /** Determines if a value is truthy by our own definition. */
  private isTruthy(value: string) {
    const isFalse = [
      'false',
      'null',
      'undefined',
      '', // empty string
      'NaN', // Not a number
      '0', // zero
      '-0', // negative zero
      '0n' // BigInt zero
    ];
    return isFalse.includes(`${value}`) ? false : true;
  }

  /** Given an `{expression}`, returns the key and associated content from the element's dataset. */
  private parseExpression(value: string): { key: string; content: string } {
    const trimmedValue = value.trim();
    if (trimmedValue.startsWith('{') && trimmedValue.endsWith('}')) {
      const key = trimmedValue.slice(1, -1);
      return {
        key,
        content: this.dataset[key] || ''
      };
    }
    return { key: '', content: value };
  }

  /** Processes the associated template and renders it to the DOM. */
  public renderTemplate() {
    const root = this.getRootNode() as Document | ShadowRoot;
    const templateEl = root.getElementById(this.template) as HTMLTemplateElement;

    // No template was specified, so do nothing
    if (!this.template) return;

    // The specified template wasn't found
    if (!templateEl) {
      console.warn(`A template with an id of "${this.template}" could not be found in this document.`, this);
      return;
    }

    const doc = templateEl.content.cloneNode(true) as HTMLElement;

    // Loop through every element
    doc.querySelectorAll('*').forEach((el: Element) => {
      for (const attr of el.attributes) {
        // Handle boolean attributes starting with ?
        if (attr.name.startsWith('?')) {
          const { content } = this.parseExpression(attr.value);
          const attributeName = attr.name.slice(1);
          el.removeAttribute(attr.name);

          if (this.isTruthy(content)) {
            el.setAttribute(attributeName, '');
          }
          return;
        }

        // Handle regular attribute replacements
        const { key, content } = this.parseExpression(attr.value);
        if (key) {
          el.setAttribute(attr.name, content);
        }

        // Handle conditional attributes
        if (attr.name === 'if') {
          if (this.isTruthy(content)) {
            el.removeAttribute('if');
          } else {
            el.remove();
          }
        } else if (attr.name === 'unless') {
          if (this.isTruthy(content)) {
            el.remove();
          } else {
            el.removeAttribute('unless');
          }
        }
      }
    });

    // Process text nodes
    const walker = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT, null);
    const textNodes: Text[] = [];
    let node: Text | null;
    while ((node = walker.nextNode() as Text)) {
      textNodes.push(node);
    }

    textNodes.reverse().forEach(node => {
      const text = node.textContent || '';
      let result = text;
      let lastIndex = 0;
      const regex = /(?<!\\)\{([^}]+)\}/g;
      let match: RegExpExecArray | null;

      // Check if we have any unescaped expressions
      while ((match = regex.exec(text)) !== null) {
        const [fullMatch, placeholder] = match;
        const { key, isHtml } = this.isHtmlExpression(placeholder);
        const value = this.dataset[key] || '';

        if (isHtml) {
          // Handle HTML content by splitting into separate nodes
          const beforeText = text.slice(lastIndex, match.index);
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = value;

          // Insert text before the expression
          if (beforeText) {
            node.parentNode?.insertBefore(document.createTextNode(beforeText), node);
          }

          // Insert HTML content
          while (tempDiv.firstChild) {
            node.parentNode?.insertBefore(tempDiv.firstChild, node);
          }

          lastIndex = match.index + fullMatch.length;
        } else {
          // Simple text replacement
          result = result.replace(fullMatch, value);
        }
      }

      // Handle remaining text for non-HTML replacements or if no replacements were made
      if (!lastIndex) {
        // Remove the backslash from escaped expressions
        result = result.replace(/\\\{/g, '{');
        node.textContent = result;
      } else if (lastIndex < text.length) {
        // Add remaining text after last HTML replacement
        const remainingText = text.slice(lastIndex);
        node.parentNode?.insertBefore(document.createTextNode(remainingText), node);
      }

      // Remove original node if we did HTML replacements
      if (lastIndex > 0) {
        node.remove();
      }
    });

    // Inject the template
    if (this.replace) {
      this.replaceWith(doc);
      this.remove();
    } else {
      this.append(doc);
    }
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-stamp': QuietStamp;
  }
}
