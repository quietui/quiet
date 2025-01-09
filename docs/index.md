---
title: Quiet UI
description: A hand-crafted UI library for the Web focusing on accessibility, longevity, performance, and simplicity.
layout: splash
---

<div class="splash">
<h1 class="visually-hidden">Quiet UI</h1>

{% include 'splash-image.njk' %}

<p class="subtitle">A hand-crafted UI library for the Web</p>

<p>Focusing on accessibility, longevity, performance, and simplicity</p>

<div class="splash-actions">

<quiet-button href="/docs/" variant="primary" size="xl" pill>
Get started
</quiet-button>

<quiet-button href="/about" size="xl" pill>
About this project
</quiet-button>

</div>
</div>

<div class="below-splash">

<h2 data-no-anchor>Quick start</h2>

Copy and paste the following code into the `<head>` section of any HTML document. The autoloader will fetch components from the CDN as you add components to the DOM. 

```html
<!-- Quiet theme + autoloader -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">
<script type="module" src="{% cdnUrl '/dist/quiet.loader.js' %}"></script>

<!-- Optional CSS reset -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/restyle.css' %}">
```

<div 
  style="
    display: flex;
    flex-wrap: wrap;
    gap: 1rem; 
    justify-content: center; 
    margin-block: 2rem 4rem;
  "
>
  <quiet-button variant="primary" size="lg" appearance="outline" pill href="/docs">
    Installation guide
  </quiet-button>

  <quiet-button variant="primary" size="lg" appearance="outline" pill href="/docs/using-components">
    Using components
  </quiet-button>
</div>

<h2 data-no-anchor>What's in the box?</h2>

<ul class="features-grid">
  <li>
    <a class="stretch" href="/docs/using-components">
      <quiet-icon name="packages" style="color: #b394f4;"></quiet-icon><br>
      {{ componentCount }} high-quality, accessible, interoperable UI components
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
</ul>

<img class="whiskers-center only-light" src="/assets/images/whiskers/whiskers-whistling-light.svg" alt="Whiskers the mouse walking and whistling">
<img class="whiskers-center only-dark" src="/assets/images/whiskers/whiskers-whistling-dark.svg" alt="Whiskers the mouse walking and whistling">

<small class="copyright">
  Quiet UI is a project of A Beautiful Site, LLC
  &copy;<quiet-date year="numeric"></quiet-date>
</small>

</div>