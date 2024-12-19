---
title: Flip Card
layout: component
---

Flip cards span the full width of their container, by default. The height is determined by the content you slot in. The card will grow to fit the content of the front or back side, whichever is greater.

```html {.example}
<quiet-flip-card id="flip-card__overview" style="max-width: 300px;">
  <div slot="front">
    What did the cat say when it lost its toys?
    <button type="button" data-flip-card="toggle">flip</button>
  </div>
  <div slot="back">
    You've cat to be kitten me right meow!
    <button type="button" data-flip-card="toggle">flip again</button>
  </div>
</quiet-flip-card>

<button type="button" data-flip-card="front flip-card__overview">Front</button>
<button type="button" data-flip-card="back flip-card__overview">Back</button>
<button type="button" data-flip-card="toggle flip-card__overview">Toggle</button>
```

## Examples

### Flipping cards

You can flip a flip card programmatically by obtaining a reference to it and setting the `flipped` property to `true` or `false`.

```js
const flipCard = document.querySelector('quiet-flip-card');

// Flip it over
flipCard.flipped = true;

// Flip it back
flipCard.flipped = false;
```

However, it's often more convenient for a button to control the flip card _without_ additional scripting. In this case, you can add the `data-flip-card="toggle *"` attribute to any button in the document, where `*` is the target flip card's `id`. To ensure the button always flips to a certain side, use `data-flip-card="front *"` or `data-flip-card="back *"`. If the button is _inside_ a flip card, the ID can be omitted.

```html {.example}
<quiet-flip-card id="flip-card__flipping" style="max-width: 300px;">
  <quiet-card with-media with-footer slot="front">
    <img slot="media" src="https://images.unsplash.com/photo-1515073883629-5e2924e3e106?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A tabby kitten sleeps next to a toy mouse.">
    There's nothing more delightful than watching a curious kitten explore the world with big, innocent eyes and tiny, playful paws.
    <quiet-button slot="footer" variant="primary">I agree</quiet-button>
    <quiet-button slot="footer">Learn more</quiet-button>
  </quiet-card>
  <div slot="back">Uh oh</div>
</quiet-flip-card>

<style>
  #flip-card__flipping div[slot] {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
</style>

<button type="button" data-flip-card="front flip-card__flipping">Front</button>
<button type="button" data-flip-card="back flip-card__flipping">Back</button>
<button type="button" data-flip-card="toggle flip-card__flipping">Toggle</button>
```

### Flipping vertically

Set the `direction` attribute to `vertical` to flip the card vertically.

```html {.example}
<quiet-flip-card direction="vertical">
  <div slot="front">I'm a card</div>
  <div slot="back">I'm the backside of the card</div>
</quiet-flip-card>
```

### Styling flip cards

TODO

```html {.example}
<quiet-flip-card id="flip-card__playing">
  <div slot="front"><span class="visually-hidden">Flip me over to see which card I am</span></div>
  <div slot="back">
    <span class="corner">A<br><quiet-icon name="heart" family="filled"></quiet-icon></span>
    <span class="corner">A<br><quiet-icon name="heart" family="filled"></quiet-icon></span>
    <quiet-icon label="Ace of hearts" name="heart" family="filled"></quiet-icon>
  </div>
</quiet-flip-card>

<style>
  #flip-card__playing {
    width: 150px;
    height: 230px;

    &::part(card) {
      border-radius: 1rem;
    }

    &::part(front) {
      background-color: #366BE8;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='82' height='82' viewBox='0 0 120 120'%3E%3Cpolygon fill='%233B82F6' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/%3E%3C/svg%3E");
    }

    &::part(back) {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      background-color: white;
      color: #b91c1c;
      line-height: 1;
    }

    .corner {
      display: flex;
      flex-direction: column;
      font-size: 1.5rem;
      justify-content: center;
      align-items: center;

      quiet-icon {
        font-size: 1.25rem;
      }
    }

    .corner:nth-child(1) {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
    }

    .corner:nth-child(2) {
      position: absolute;
      bottom: 0.75rem;
      right: 0.75rem;
      scale: 1 -1;
    }
  }
</style>
```
