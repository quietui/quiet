---
title: Thank you!
description: Thank you for supporting Quiet UI!
layout: page
isWide: true
noindex: true
bodyClass: with-grid
---
<p class="purchased-insider">
  Congratulations! You're a Quiet Insider now! Thanks for supporting the project. Access to Discord is granted through the <a href="https://polar.sh/quietui/portal">customer portal</a>. <em>I hope you build something incredible!</em>
</p>

<p class="purchased-figma">
  Congratulations! You just purchased a license for the Figma Starter Kit. Thanks for supporting the project! — <em>I hope you build something incredible!</em>
</p>

<img class="whiskers-center-large" src="/assets/images/whiskers/celebrating.svg" alt="Whiskers celebrating with confetti">
  
These links will help you get squared away!

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
      <quiet-icon name="brand-discord" style="color: #5965f2;"></quiet-icon><br>
      Get help on the private Discord<br>
      <small>Access is granted through the customer portal</small>
    </a>
  </li>
  <li>
    <a class="stretch" href="https://github.com/quietui/quiet" target="_blank" data-no-external>
      <quiet-icon name="brand-github" style="color: #848da1;"></quiet-icon><br>
      Get the source code<br>
      <small>The full source is available on GitHub</small>
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
    Visit the <a href="https://polar.sh/quietui/portal" target="_blank">customer portal</a> for order history, downloads, receipts, and Discord access.
  </small>
</p>

<script>
  // Check URL parameters and redirect if neither discord nor figma is present
  const urlParams = new URLSearchParams(window.location.search);
  const hasInsider = urlParams.has('insider');
  const hasFigma = urlParams.has('figma');
  
  // Redirect to homepage if neither parameter is present
  if (!hasInsider && !hasFigma) {
    window.location.href = '/';
  }
  
  // Apply the appropriate class based on the parameter
  if (hasFigma) {
    document.documentElement.classList.add('figma');
  } else if (hasInsider) {
    document.documentElement.classList.add('insider');
  }
</script>

<style>
  /* Show/hide content based on purchase type */
  html:not(.figma) .purchased-figma,
  html:not(.insider) .purchased-insider {
    display: none;
  }
  
  /* Show insider content with ?insider */
  html.insider .purchased-insider {
    display: block;
  }
  
  /* Show figma content with ?figma */
  html.figma .purchased-figma {
    display: block;
  }
</style>