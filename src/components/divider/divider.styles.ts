import { css } from 'lit';

export default css`
  :host {
    --color: var(--quiet-neutral-stroke-soft);
    --thickness: var(--quiet-border-width);
    --spacing: 1rem;

    background: var(--color);
    border-radius: 9999px;
  }

  :host([aria-orientation='horizontal']) {
    display: block;
    width: 100%;
    height: var(--thickness);
    margin-inline: 0;
    margin-block: var(--spacing);
  }

  :host([aria-orientation='vertical']) {
    display: inline-block;
    width: var(--thickness);
    height: 100%;
    margin-inline: var(--spacing);
    margin-block: 0;
  }
`;
