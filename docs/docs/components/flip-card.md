---
title: Flip Card
layout: component
---

Flip cards span the full width of their container, by default. The height is determined by the content you slot in. The card will grow to fit the content of the front or back side, whichever is greater.

```html {.example}
<quiet-flip-card style="max-width: 300px;">
  <div slot="front">
    What did the cat say when it lost its toys?
  </div>
  <div slot="back">
    You've cat to be kitten me right meow!
  </div>
</quiet-flip-card>
```

## Examples

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
    <quiet-icon name="letter-a"></quiet-icon>
    <quiet-icon name="letter-a"></quiet-icon>
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
    }

    quiet-icon:nth-child(1) {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      font-size: 2rem;
    }

    quiet-icon:nth-child(2) {
      position: absolute;
      font-size: 2rem;
      bottom: 0.75rem;
      right: 0.75rem;
    }
  }
</style>
```
