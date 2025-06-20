---
title: Quiet UI
description: A hand-crafted UI library for the Web with a focus on accessibility, longevity, performance, and simplicity.
layout: splash
bodyClass: with-grid
---

<div class="splash">
<h1 class="quiet-vh">Quiet UI</h1>

{% include 'splash-image.njk' %}

<p class="subtitle">A hand-crafted UI library for the Web</p>

<p>Focusing on accessibility, longevity, performance, and simplicity</p>

<div class="splash-actions">

<quiet-button href="/docs/" variant="primary" size="xl" pill>
Installation
</quiet-button>

<quiet-button href="/components" size="xl" pill>
Browse components
</quiet-button>

</div>

<quiet-icon id="more-hint" label="Scroll down" name="chevron-down"></quiet-icon>
</div>

<div id="below-the-fold" class="below-splash">

<h2 data-no-anchor>What's in the box?</h2>

<ul class="features-grid">
  <li>
    <a class="stretch" href="/components">
      <quiet-icon name="packages" style="color: #b394f4;"></quiet-icon><br>
      {{ components.length }} high-quality, accessible, and interoperable UI components
    </a>
  </li>
  <li>
    <a class="stretch" href="/docs/theming">
      <quiet-icon name="palette" style="color: #e98d61;"></quiet-icon><br>
      Modern theme with light and dark mode that can adapt to any brand
    </a>
  </li>
  <li>
    <a class="stretch" href="/docs/restyle">
      <quiet-icon name="seedling" style="color: #7db664;"></quiet-icon><br>
      Optional CSS reset for jump-starting new apps with consistent styles
    </a>
  </li>
  <li>
    <a class="stretch" href="/docs/localization">
      <quiet-icon name="language" style="color: #58acf2;"></quiet-icon><br>
      Localized components with translations in multiple languages
    </a>
  </li>  
  <li>
    <a class="stretch" href="/docs/css-utilities">
      <quiet-icon name="tools" style="color: #ee6383;"></quiet-icon><br>
      A handful of CSS utilities to make common things easier
    </a>
  </li>  
  <li>
    <a class="stretch" href="/docs/ai">
      <quiet-icon name="sparkles" style="color: #dbb31d;"></quiet-icon><br>
      Empower AI assistants with ready-to-use component intelligence
    </a>
  </li>  
</ul>

<h2 data-no-anchor>Quick start</h2>

Copy and paste the following code into the `<head>` section of any HTML document. The autoloader will fetch components from the CDN as you add them to the DOM.

```html
<!-- Quiet theme + autoloader -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">
<script type="module" src="{% cdnUrl '/dist/quiet.loader.js' %}"></script>

<!-- Optional CSS reset -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/restyle.css' %}">
```

<div class="quick-start">
  <quiet-button size="lg" appearance="outline" pill href="/docs">
    Installation guide
  </quiet-button>
  
  <quiet-button size="lg" appearance="outline" pill href="/support">
    Help &amp; support
  </quiet-button>
</div>

<img class="whiskers-center" src="/assets/images/whiskers/arms-crossed.svg" alt="Whiskers the mouse standing with arms crossed">

<small class="copyright">
  Quiet UI is a project of A&nbsp;Beautiful&nbsp;Site,&nbsp;LLC
  &copy;<quiet-date year="numeric"></quiet-date>
</small>

</div>