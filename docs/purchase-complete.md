---
title: Thank you!
description: Thank you for purchasing a commercial license.
layout: page
isWide: true
noindex: true
bodyClass: with-grid
---

<!-- License -->
<div id="license-section" hidden>

Congratulations! You just purchased a commercial license for Quiet&nbsp;UI. Thanks for supporting the project — _I hope you build something incredible!_

<img class="whiskers-center-large" src="/assets/images/whiskers/celebrating.svg" alt="Whiskers celebrating with confetti">

**You can start using Quiet in your commercial application immediately.** These links will help you get squared away with other benefits.

<ul class="features-grid" aria-label="Features">
  <li>
    <a class="stretch" href="/commercial-license" target="_blank" data-no-external>
      <quiet-icon name="contract" style="color: #c5a231;"></quiet-icon><br>
      View license<br>
      <small>View a copy of your commercial license</small>
    </a>
  </li>
  <li>
    <a class="stretch" href="https://polar.sh/quietui/portal" target="_blank" data-no-external>
      <quiet-icon name="receipt" style="color: #e98d61;"></quiet-icon><br>
      Customer portal<br>
      <small>View past orders and print receipts</small>
    </a>
  </li>
  <li>
    <a class="stretch" href="https://polar.sh/quietui/portal" target="_blank" data-no-external>
      <quiet-icon name="brand-discord" style="color: #b394f4;"></quiet-icon><br>
      Join the private Discord<br>
      <small>Access is granted through the customer portal</small>
    </a>
  </li>
  <li>
    <a class="stretch" href="https://discord.com/channels/1397014626742304848/1397017539976106097" target="_blank" data-no-external>
      <quiet-icon name="headset" style="color: #58acf2;"></quiet-icon><br>
      Ask for help<br>
      <small>Request assistance through the private Discord</small>
    </a>
  </li>
  <li>
    <a class="stretch" href="https://www.npmjs.com/package/@quietui/quiet" target="_blank" data-no-external>
      <quiet-icon name="code" style="color: #848da0;"></quiet-icon><br>
      Get the code<br>
      <small>Download the latest from npm</small>
    </a>
  </li>
  <li>
    <a class="stretch" href="/docs" target="_blank" data-no-external>
      <quiet-icon name="book" style="color: #7db664;"></quiet-icon><br>
      Visit the docs<br>
      <small>Complete documentation including examples</small>
    </a>
  </li>
</ul>

Visit the [customer portal](https://polar.sh/quietui/portal) for order history, receipts, and Discord access.

</div>

<!-- Figma -->
<div id="figma-section" hidden>

You can download the Figma file in the customer portal!

==TODO==

</div>

<style>
  h1.title,
  h1.title ~ p {
    text-align: center;
    text-wrap: balance;
  }

  #license-section,
  #figma-section {
    p {
      text-align: center;
      text-wrap: balance;      
    }
  }
</style>

<script type="module">
  const params = new URLSearchParams(window.location.search);
  const purchaseType = params.get('purchase');

  if (purchaseType !== 'license' && purchaseType !== 'figma') {
    window.location.href = '/license';
  } else if (purchaseType === 'license') {
    document.getElementById('license-section').hidden = false;  
  } else if (purchaseType === 'figma') {
    document.getElementById('figma-section').hidden = false;
  }
</script>