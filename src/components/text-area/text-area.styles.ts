import { css } from 'lit';

export default css`
  /* Normal */
  #visual-box.normal {
    padding-inline: 0;

    #text-box {
      padding-inline: 0.75em;
    }
  }

  /* Filled */
  #visual-box.filled {
    padding-inline: 0;

    #text-box {
      padding-inline: 0.75em;
    }
  }

  /* Sizes */
  #visual-box.xs #text-box {
    padding-block: 0.2em;
  }

  #visual-box.sm #text-box {
    padding-block: 0.35em;
  }

  #visual-box.md #text-box {
    padding-block: 0.7em;
  }

  #visual-box.lg #text-box {
    padding-block: 0.5em;
  }

  #visual-box.xl #text-box {
    padding-block: 0.55em;
  }

  /* Resizing */
  #visual-box.resize-none #text-box,
  #visual-box.resize-auto #text-box {
    resize: none;
  }

  #visual-box.resize-vertical #text-box {
    resize: vertical;
  }
`;
