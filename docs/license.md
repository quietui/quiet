---
title: License
description: 
layout: page
section: license
---


<img class="whiskers only-light" src="/assets/images/whiskers/whiskers-neutral-light.svg" alt="Whiskers the mouse standing in a neutral position">
<img class="whiskers only-dark" src="/assets/images/whiskers/whiskers-neutral-dark.svg" alt="Whiskers the mouse standing in a neutral position">

<quiet-lorem-ipsum></quiet-lorem-ipsum>

TODO - pricing table showing free + paid + contact us options

<quiet-lorem-ipsum></quiet-lorem-ipsum>

<ul id="features-list" aria-label="Features">
  <li><quiet-icon name="cash-banknote" style="color: #7db664;"></quiet-icon><br>Simple pricing</li>
  <li><quiet-icon name="infinity" style="color: #b394f4;"></quiet-icon><br>Unlimited projects</li>
  <li><quiet-icon name="heart-handshake" style="color: #e886a7;"></quiet-icon><br>Top-tier support</li>
  <li><quiet-icon name="calendar" style="color: #58acf2;"></quiet-icon><br>One year of updates</li>
  <li><quiet-icon name="tools" style="color: #e98d61;"></quiet-icon><br>Professionally designed</li>
  <li><quiet-icon name="puzzle" style="color: #39baa4;"></quiet-icon><br>Works with all frameworks</li>
  <li><quiet-icon name="armchair" style="color: #989cff;"></quiet-icon><br>Add more seats any time</li>
  <li><quiet-icon name="rocket" style="color: #ec8786;"></quiet-icon><br>Start using instantly</li>
</ul>

## Frequently asked questions

<details name="faq">
  <summary>Do you offer support?</summary>
  Bugs should be <a href="https://github.com/quietui/quiet/issues">reported on GitHub</a> and questions can be asked in the <a href="https://github.com/quietui/quiet/discussions">public discussion forum</a>. Please purchase a commercial license if you need personal support from the maintainer.
</details>

<details name="faq">
  <summary>What is your refund policy?</summary>
  Refunds are offered up to 30 days from the date of purchase.
</details>

<details name="faq">
  <summary>Can I request a feature?</summary>
  Features can be requested in the <a href="https://github.com/quietui/quiet/discussions/categories/feature-requests">discussion forum</a>. Please search before posting to prevent duplicate requests. Use the 👍 reaction to vote for a feature.
</details>

<details name="faq">
  <summary>Can I change the tag names?</summary>
  Component tag names, e.g. <code>&lt;quiet-button&gt;</code>, cannot be changed without modifying the source code due to the way tags are referenced in code and styles. Attempting to change tag names, e.g. by extending the associated classes, will cause unexpected breakages and isn't a supported feature of the library.
</details>

<details name="faq">
  <summary>Can I use this library with a micro frontend?</summary>
  Because custom elements are registered globally, I don't recommend using Quiet in a micro frontend architecture <em>unless</em> you move it to the top of the stack. Avoid loading the library multiple times, as this will cause version conflicts and load more code than is necessary.
</details>

Can't find your question above? [Ask it here!](https://github.com/quietui/quiet/discussions)

<small class="copyright">
  Quiet UI is product of A Beautiful Site, LLC
  &copy;<quiet-date year="numeric"></quiet-date>
</small>


<style>
  #pricing-callout {
    background-color: var(--quiet-paper-color);
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: calc(var(--quiet-border-radius) * 6);
    box-shadow: var(--quiet-shadow-soft);
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
    }
  }

  #purchase-form {
    max-width: 360px;
    margin-inline: auto;
    margin-block-start: 2rem;

    quiet-select {
      &::part(label),
      &::part(description) {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        white-space: nowrap;
        clip-path: inset(50%);   
      }    
    }
  }

  #features-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 0;
    margin: 0;
    margin-block-end: 2rem;
   
    li {
      display: block;
      list-style: none;
      font-size: 1.125rem;
      text-align: center;
      line-height: 1.6;
      color: var(--quiet-text-muted);
      border-radius: 1rem;
      background: var(--quiet-neutral-fill-softer);
      box-shadow: var(--quiet-shadow-softer);
      padding: 1rem;
      margin: 0;

      quiet-icon {
        font-size: 2.5rem;
        stroke-width: 1.25px;
      }
    }
  }

  @media screen and (max-width: 650px) {
    #features-list {
      gap: 1rem;

      li {
        font-size: 1rem;
      }

      &::first-letter {
        font-size: 1rem;
      }
    }
  }

  .copyright {
    display: block;
    color: var(--quiet-text-muted);
    text-align: center;
    margin-block-end: 2rem;
  }
</style>