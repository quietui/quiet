---
title: Quiet UI
description: A UI library for the Web with a focus on accessibility, longevity, performance, and simplicity.
layout: splash
bodyClass: with-grid
---

<div class="splash">
<h1 class="quiet-vh">Quiet UI</h1>

{% include 'splash-image.njk' %}

<p class="subtitle">A UI library for the Web</p>

<p class="focusing-on">Focusing on accessibility, longevity, performance, and simplicity</p>

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

<div class="below-splash">

<h2 data-no-anchor>What's in the box?</h2>

<ul class="features-grid">
  <li>
    <a class="stretch" href="/components">
      <quiet-icon name="packages" style="color: #b394f4;"></quiet-icon><br>
      {{ components.length }} open source, accessible, and interoperable UI components
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

Copy and paste the following code into the `<head>` section of any HTML document. The autoloader will fetch components from the public CDN as you add them to the DOM.

```html
<!-- Quiet theme + autoloader -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">
<script type="module" src="{% cdnUrl '/dist/quiet.loader.js' %}"></script>

<!-- Optional CSS reset -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/restyle.css' %}">
```

Or you can [import components manually](/docs/#manually-importing) using npm.

<div class="quick-start">
  <quiet-button size="lg" appearance="outline" pill href="/docs">
    Installation guide
  </quiet-button>
  <quiet-button size="lg" appearance="outline" pill href="/support">
    Help &amp; Support
  </quiet-button>
</div>

<!-- Testimonials -->
<quiet-mesh-gradient class="testimonials-cover">
  <div class="testimonials" aria-label="What people are saying">
    <div class="testimonial">
      <q>Quiet UI is probably the cleanest component library I've come across</q>
      <cite>Wayne R.</cite>
    </div>
    <div class="testimonial">
      <q>This is incredible work</q>
      <cite><a href="https://news.ycombinator.com/item?id=45370766">lazerbones</a></cite>
    </div>
    <div class="testimonial">
      <q>I can tell someone who knows the game built this</q>
      <cite><a href="https://mastodon.social/@getflourish/115274647515104862">getflourish</a></cite>
    </div>
    <div class="testimonial">
      <q>This is incredible and deserves so many more upvotes</q>
      <cite><a href="https://www.reddit.com/r/webdev/s/9R0sVmaUyF">Inaccurate-</a></cite>
    </div>
    <div class="testimonial">
      <q>Awesome components library</q>
      <cite><a href="https://news.ycombinator.com/item?id=45419789">sccomps</a></cite>
    </div>
    <div class="testimonial">
      <q>I'm amazed!</q>
      <cite><a href="https://x.com/src_rip/status/1971935947936989597">srcrip</a></cite>
    </div>
    <div class="testimonial">
      <q>It's so beautifully crafted</q>
      <cite><a href="https://news.ycombinator.com/item?id=45425109">rancar2</a></cite>
    </div>
    <div class="testimonial">
      <q>It's very inspirational to see someone really sweating the details and crafting something with love and care like this</q>
      <cite><a href="https://github.com/quietui/quiet/discussions/13">allmarkedup</a></cite>
    </div>
    <div class="testimonial">
      <q>So nice and polished</q>
      <cite><a href="https://bsky.app/profile/jeroen.wtf/post/3m24wnfrmxs2j">jeroen.wtf</a></cite>
    </div>
    <div class="testimonial">
      <q>Not bad at all</q>
      <cite><a href="https://x.com/webreflection/status/1973113747930792405">WebReflection</a></cite>
    </div>
    <div class="testimonial">
      <q>Wow Quiet UI looks amazing 🔥</q>
      <cite><a href="https://x.com/rodydavis/status/1981096188956090597">rodydavis</a></cite>
    </div>
    <div class="testimonial">
      <q>Slick af</q>
      <cite><a href="https://www.reddit.com/r/webdev/comments/1o9wm2f/comment/nkdjulx/">TacoWaffleSupreme</a></cite>
    </div>
    <div class="testimonial">
      <q>Whoa this is beautiful!</q>
      <cite><a href="https://bsky.app/profile/josef.dev/post/3m3q27urejc2o">josef.dev</a></cite>
    </div>
    <div class="testimonial">
      <q>I'm seriously considering making this the default component set for all side projects going forward</q>
      <cite><a href="https://daverupert.com/2025/10/quiet-ui/">Dave Rupert</a></cite>
    </div>
    <div class="testimonial">
      <q>I really love it and the theme is amazing</q>
      <cite><a href="https://x.com/kennethrohde/status/1981098244064367091">kennethrohde</a></cite>
    </div>
    <div class="testimonial">
      <q>This is beautiful work here</q>
      <cite><a href="https://mastodonapp.uk/@mathampson/115394708271897906">mathampson</a></cite>
    </div>
  </div>
</quiet-mesh-gradient>

<img class="whiskers-center" src="/assets/images/whiskers/arms-crossed.svg" alt="Whiskers the mouse standing with arms crossed">
  
<small class="copyright">
  Quiet UI is a project of A&nbsp;Beautiful&nbsp;Site,&nbsp;LLC
  &copy;<quiet-date year="numeric"></quiet-date>
</small>

</div>
