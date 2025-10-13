---
title: Thank you!
description: Thank you for purchasing a commercial license.
layout: page
isWide: true
noindex: true
bodyClass: with-grid
---

<p class="purchased-license">
Congratulations! You just purchased a commercial license for Quiet&nbsp;UI. Thanks for supporting the project — <em>I hope you build something incredible!</em>
</p>

<p class="purchased-figma">
Congratulations! You just purchased a license for the Figma Starter Kit. Thanks for supporting the project! — <em>I hope you build something incredible!</em>
</p>

<img class="whiskers-center-large" src="/assets/images/whiskers/celebrating.svg" alt="Whiskers celebrating with confetti">

These links will help you get squared away with your new license and benefits.

<ul class="features-grid" aria-label="Features">
  <li>
    <a class="stretch" href="https://polar.sh/quietui/portal" target="_blank" data-no-external>
      <quiet-icon name="receipt" style="color: #4a97f4;"></quiet-icon><br>
      Customer portal<br>
      <small>View past orders and print receipts</small>
    </a>
  </li>
  <li>
    <a class="stretch" href="https://polar.sh/quietui/portal" target="_blank" data-no-external>
      <quiet-icon name="brand-discord" style="color: #b394f4;"></quiet-icon><br>
      Get help on the private Discord<br>
      <small>Access is granted through the customer portal</small>
    </a>
  </li>
  <li>
    <a class="stretch" href="https://polar.sh/quietui/portal" target="_blank" data-no-external>
      <quiet-icon name="package" style="color: #e98d61;"></quiet-icon><br>
      Download the files<br>
      <small>Downloads are available in the customer portal</small>
    </a>
  </li>
  <li>
    <a class="stretch" href="https://www.npmjs.com/package/@quietui/quiet" target="_blank" data-no-external>
      <quiet-icon name="brand-npm" style="color: #ef5755;"></quiet-icon><br>
      Get the code on npm<br>
      <small>Install instantly via npm</small>
    </a>
  </li>
</ul>

<p style="text-align: center; text-wrap: balance; margin-block: 2.5rem 2rem;">
  <small>
    Visit the <a href="https://polar.sh/quietui/portal" target="_blank">customer portal</a> for order history, receipts, downloads, and Discord access.
  </small>
</p>

<script>
  // Check for ?figma in URL
  const urlParams = new URLSearchParams(window.location.search);
  document.documentElement.classList.toggle('figma', urlParams.has('figma'));
</script>

<style>
  html:not(.figma) .purchased-figma,
  html.figma .purchased-license {
    display: none;
  }
</style>