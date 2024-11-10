---
title: Sponsor
description: Sponsor the project for support and sponsor-only benefits.
layout: page
isWide: true
section: sponsor
---

Quiet can be used for free under the MIT license. Unfortunately, I can't offer free support for every user, but if you want personal support and priority bug fixes, [you can sponsor the project](https://github.com/sponsors/quietui) to unlock all of the sponsor-only benefits shown below.

<div class="sponsor-tiers" style="margin-block-start: 2.5rem;">
  <div class="sponsor-tier">
    <quiet-icon class="sponsor-tier-icon" name="code" style="color: #7db664;"></quiet-icon>
    <h3 data-no-anchor>Coder</h3><br>
    <ul>
      <li><s>Maintainer support</s></li>
      <li><s>Priority bug fixes</s></li>
      <li><s>Sponsors-only forums</s></li>
      <li><s>Sponsors badge</s></li>
      <li><s>Attribution on website</s></li>
      <li>MIT license</li>
    </ul>
    <quiet-button pill href="https://github.com/quietui/quiet/" target="_blank">
      <quiet-icon slot="start" name="brand-github"></quiet-icon>
      Get the code
    </quiet-button>
  </div>

  <div class="sponsor-tier">
    <quiet-icon class="sponsor-tier-icon" name="heart-handshake" style="color: #7577c5;"></quiet-icon>
    <h3 data-no-anchor>Sponsor</h3><br>
    <ul>
      <li>Maintainer support</li>
      <li>Priority bug fixes</li>
      <li>Sponsors-only forums</li>
      <li>Sponsors badge</li>
      <li>Attribution on website</li>
      <li>MIT license</li>
    </ul>
    <quiet-button variant="primary" appearance="outline" pill href="#" target="_blank">
      <quiet-icon slot="start" family="filled" name="heart"></quiet-icon>
      Sponsor
    </quiet-button>
  </div>

  <div class="sponsor-tier">
    <quiet-icon class="sponsor-tier-icon" name="comet" style="color: #c5a231;"></quiet-icon>
    <h3 data-no-anchor>Stargazer</h3><br>
    <ul>
      <li>Completely free</li>
      <li>Only takes a click</li>
      <li>Raises awareness</li>
      <li>Legitimizes the project</li>
      <li>Good karma</li>
      <li>Makes the cats happy</li>
    </ul>
    <quiet-button pill href="https://github.com/quietui/quiet/stargazers" target="_blank">
      <quiet-icon slot="start" name="brand-github"></quiet-icon>
      Star on GitHub
    </quiet-button>
  </div>  
</div>

<ul class="features-grid" aria-label="Features">
  <li><quiet-icon name="send" style="color: #58acf2;"></quiet-icon><br>Support from the maintainer</li>
  <li><quiet-icon name="bug" style="color: #e98d61;"></quiet-icon><br>Priority bug fixes</li>
  <li><quiet-icon name="circle-dashed-check" style="color: #e886a7;"></quiet-icon><br>Sponsors badge on GitHub</li>
  <li><quiet-icon name="key" style="color: #c5a231;"></quiet-icon><br>Access to sponsors-only forums</li>
  <li><quiet-icon name="puzzle" style="color: #b394f4;"></quiet-icon><br>Works with all frameworks</li>
  <li><quiet-icon name="school" style="color: #7db664;"></quiet-icon><br>Learn once, use forever</li>
</ul>

<div style="display: flex; gap: 1rem; justify-content: center;">
  <quiet-button variant="primary" size="lg" pill href="https://github.com/sponsors/quietui" target="_blank" style="margin-block-start: var(--quiet-content-spacing);">
    <quiet-icon slot="start" name="lock-open"></quiet-icon>
    Unlock sponsor-only access
  </quiet-button>
</div>

---

## Frequently asked questions

<details name="faq">
  <summary>Do you offer support?</summary>
  Yes. You can <a href="https://github.com/sponsors/quietui">sponsor Quiet on GitHub</a> to unlock access to a <a href="https://github.com/quietui/sponsors/discussions">sponsors-only discussion forum</a> where you can get help directly from me, the maintainer, as well as other members of the community. I typically respond within 24 hours.
</details>

<details name="faq">
  <summary>Can I cancel my sponsorship?</summary>
  Yes. You can cancel your sponsorship any time, but you will lose access to the sponsors-only benefits when the sponsorship period expires.
</details>

<details name="faq">
  <summary>How can I report a bug?</summary>
  Bugs should be <a href="https://github.com/quietui/quiet/issues">reported on GitHub</a>. Priority is given to sponsors, but cannot be guaranteed. For best results, please include a minimal reproduction with your report.
</details>

<details name="faq">
  <summary>Can I request a feature?</summary>
  Features can be requested in the <a href="https://github.com/quietui/quiet/discussions/categories/feature-requests">discussion forum</a>. Please search before posting to prevent duplicate requests. Use the 👍 reaction to vote.
</details>

<details name="faq">
  <summary>Can I change the tag names?</summary>
  Component tag names, e.g. <code>&lt;quiet-button&gt;</code>, cannot be changed without modifying the source code due to the way tags are referenced in code and styles. Attempting to change tag names, e.g. by extending the associated classes, will cause unexpected breakages and isn't a supported feature of the library.
</details>

<details name="faq">
  <summary>Can I use this library with a micro frontend?</summary>
  Because custom elements are registered globally, I don't recommend using Quiet in a micro frontend architecture <em>unless</em> you move it to the top of the stack. Avoid loading the library multiple times, as this will cause version conflicts and load more code than is necessary.
</details>

<small class="copyright">
  Quiet UI is product of A Beautiful Site, LLC
  &copy;<quiet-date year="numeric"></quiet-date>
</small>

<style>
  .copyright {
    display: block;
    color: var(--quiet-text-muted);
    text-align: center;
    margin-block-end: 2rem;
  }
</style>