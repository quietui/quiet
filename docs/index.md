---
title: Quiet UI
description: A hand-crafted UI library for the Web with a focus on accessibility, performance, longevity, and aesthetics.
layout: splash
---

<div class="splash">
<h1 class="visually-hidden">Quiet UI</h1>
<img class="only-light" src="/assets/images/wordmark-light.svg" alt="">
<img class="only-dark" src="/assets/images/wordmark-dark.svg" alt="">

<p class="subtitle">{{ description }}</p>

<p>
Professionally designed. Platform-built. Open source.
</p>

<div class="splash-actions">

<quiet-button href="/docs/" variant="primary" pill>
Get Started
</quiet-button>

<quiet-button href="https://github.com/quietui/quiet" pill>
View on GitHub
</quiet-button>

</div>

<div class="quick-start">
<small>Ready to jump in? Paste this into your <code>&lt;head&gt;</code> and go…</small>

```html
<link rel="stylesheet" href="{% cdnUrl '/dist/quiet.css' %}">
<script src="{% cdnUrl '/dist/quiet.loader.js' %}" type="module"></script>
```

</div>
</div>
