import { css } from 'lit';

export default css`
  :host {
    flex: 0 0 100%;
    height: 100%;
    border-radius: var(--quiet-border-radius);
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  #content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;
