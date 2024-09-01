---
title: License
description: 
layout: page
section: sponsor
---

<img class="whiskers only-light" src="/assets/images/whiskers/whiskers-neutral-light.svg" alt="Whiskers the mouse standing in a neutral position">
<img class="whiskers only-dark" src="/assets/images/whiskers/whiskers-neutral-dark.svg" alt="Whiskers the mouse standing in a neutral position">

Quiet is an open source project made available under the terms of the [GNU Lesser General Public License v3.0](https://www.tldrlegal.com/license/gnu-lesser-general-public-license-v3-lgpl-3) ("LGPL"). This means you can:

- **Use it in commercial and non-commercial software** without having to release your own source code.
- **Modify the library** for your own needs as long as you distribute the changes under the same license.
- **Distribute the library** as part of your application, as long as any changes to the library are made available under the same license.

If you're developing a commercial application and would like to use Quiet without the restrictions of the LGPL, you can purchase a commercial license.

## Commercial licenses

Commercial licenses are available starting at $200 USD. ==This is a one-time cost== for unlimited projects and zero LGPL restrictions. A discount is offered when multiple seats are purchased at the same time. Please [review the full license](TODO) prior to making a purchase.

:::info
**Ask yourself this:** how long would it take to build all of this yourself? Quiet is less than a day's wage for most software engineers, and it's yours forever!

[“Shut up and take my money!”](#pricing-callout)
:::

<div style="max-width: fit-content; margin: 1rem auto;">
  <ul class="two-columns unstyled-list" style="font-size: 1.125em; line-height: 3;">
    <li>💵 One-time payment</li>
    <li>♾️ Unlimited projects</li>
    <li>⛓️‍💥 No LGPL restrictions</li>
    <li>🗓️ All future versions</li>
    <li>🎨 Professionally designed</li>
    <li>⏳ Platform-based for longevity</li>
    <li>💺 Add more seats any time</li>
    <li>🚀 Start using instantly</li>
  </ul>
</div>

<div id="pricing-callout">
<div class="quote">
  <img 
    src="https://gravatar.com/avatar/bf1b3b95fd5b096a3592247c29667b33?s=400" 
    alt="Cory's avatar"
  >
  <div>
  <p>It would take most organizations over a year to build everything you can get instantly with Quiet. Time is the most valuable resource we have, and it's hard to put a price on it.</p>
  <p><strong>For a limited time, I'm offering commercial licenses for <mark>only $200 per seat!</mark></strong></p>
  <p style="margin-block-end: 0;">Buy it once and it's yours forever.</p>

  <quiet-select id="seats-select" label="Number of seats" size="lg" pill>
    <optgroup label="Small teams">
      <option name="1">1 seat – $200</option>
      <option name="2">2 seats – $300</option>
      <option name="3">3 seats – $400</option>
      <option name="4">4 seats – $500</option>
      <option name="5">5 seats – $600</option>
    </optgroup>
    <optgroup label="Organizations">
      <option name="10">10 seats – $1,000</option>
      <option name="25">25 seats – $3,500</option>
      <option name="50">50 seats – $7,000</option>
      <option name="100">100 seats – $15,000</option>
    </optgroup>
    <optgroup label="Need more?">
      <option disabled>Please inquire about larger packages</option>
    </optgroup>
  </quiet-select>

  <quiet-button variant="primary" size="lg" pill href="TODO" target="_blank">
    Purchase
  </quiet-button>
  </div>
  <img 
    src="/assets/images/heart.png" 
    alt="Cory's avatar"
    class="not-mobile"
  >
</div>
</div>

## Frequently asked questions

Can't find your question below? [Ask it here!](https://github.com/quietui/quiet/discussions)

<details name="faq">
  <summary>Forever is a long time…are you sure?</summary>
  Yes. And the price has been intentionally set to less than the estimated <abbr title="Lifetime Value">LTV</abbr> of an average user. I don't need a lambo — just help me keep this thing going. 🫡
</details>

<details name="faq">
  <summary>Can I use Quiet for my design system?</summary>
  Yes, but you will need a commercial license if you don't wish to make your modifications available under the LGPL.
</details>

<details name="faq">
  <summary>Do you offer a free trial?</summary>
  You can use the open source version of Quiet in a non-production environment to determine if it's a good fit for your needs. A commercial license is required before deploying the software to production unless you fully comply with the LGPL.
</details>

<details name="faq">
  <summary>What is a "seat?"</summary>
  In the context of licensing, a "seat" is any user who designs, develops, and/or works with the library's HTML, CSS, or JavaScript on a regular basis. For example, a small team with one designer and two developers would purchase a license for three seats.
</details>

<details name="faq">
  <summary>Can I buy more seats later?</summary>
  You can purchase additional seats using the form on this page. However, the discount for additional seats cannot be combined into subsequent purchases.
</details>

<details name="faq">
  <summary>Will my license continue to work for new major versions?</summary>
  All licenses purchased today will work for all future versions of the library. If pricing changes in the future, licenses purchased before said changes will be grandfathered in.
</details>

<details name="faq">
  <summary>What is your refund policy?</summary>
  Refunds are offered up to 30 days from the date of purchase. I want you to be happy! Remember that you can try it before you buy it!
</details>

<details name="faq">
  <summary>Do you offer support?</summary>
  I actively work on bugs, improve the library, and answer questions from the community. However, a commercial license isn't a guarantee of support. I ask that bugs be <a href="https://github.com/quietui/quiet/issues">reported on GitHub</a> and support questions be asked in the <a href="https://github.com/quietui/quiet/discussions">discussion forum</a> for the benefit of the community. I will always do my best to help and prioritize important bugs.
</details>

<details name="faq">
  <summary>How do I request a feature?</summary>
  Features can be requested in the <a href="https://github.com/quietui/quiet/discussions/categories/feature-requests">discussion forum</a>. Please search before posting to avoid creating a duplicate request.
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
  #pricing-callout {
    background-color: var(--quiet-paper-color);
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: calc(var(--quiet-border-radius) * 6);
    box-shadow: var(--quiet-shadow-softer);
    text-align: center;
    padding: 2rem;
    margin-block: calc(var(--quiet-content-spacing) * 1.5);
    scale: 1.025;

    .quote {
      display: flex;
      align-items: start;
      gap: 2rem;
      font-size: 1.0625rem;
    }

    quiet-select {
      margin-block-start: 2rem;
      margin-block-end: 1rem;
    }

    quiet-button {
      width: 100%;
    }

    img {
      max-width: 5rem;
      height: auto;
      border-radius: 50%;
    }

    @media screen and (max-width: 959px) {
      & .quote {
        flex-direction: column;
        align-items: center;
      }

      & quiet-button {
        max-width: 80%;
      }
    }
  }

  #seats-select {
    margin-block-start: 2rem;
  }

  #seats-select::part(label),
  #seats-select::part(description) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);      
  }

  .copyright {
    display: block;
    color: var(--quiet-text-muted);
    text-align: center;
    margin-block-end: 2rem;
  }
</style>