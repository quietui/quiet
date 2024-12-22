---
title: Flip Card
layout: component
---

```html {.example}
<quiet-flip-card id="flip-card__overview">
  <quiet-card>
    <quiet-avatar image="https://images.unsplash.com/photo-1672487209629-4d52e0c043d0?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <h3 class="name">Meowy McGee</h3>
    <div class="tagline">Freedom's just another word for nothing left to lose.</div>
    <div class="buttons">
      <quiet-button data-flip-card="toggle">
        <quiet-icon slot="start" name="edit"></quiet-icon>
        Edit
      </quiet-button>
    </div>
  </quiet-card>

  <quiet-card slot="back">
    <form>
      <quiet-text-field label="Name" name="name" value="Bobby McGee" autofocus></quiet-text-field>
      <quiet-text-area label="Tagline" name="tagline" value="Freedom's just another word for nothing left to lose."></quiet-text-area>
      <div class="buttons">
        <quiet-button type="submit" variant="primary">
          Update
        </quiet-button>
      </div>
    </form>
  </quiet-card>
</quiet-flip-card>

<script>
  const flipCard = document.getElementById('flip-card__overview');
  const form = flipCard.querySelector('form');
  const nameTextField = form.querySelector('quiet-text-field[name="name"]');
  const tagLineTextArea = form.querySelector('quiet-text-area[name="tagline"]');

  form.addEventListener('submit', event => {
    flipCard.querySelectorAll('.name').forEach(el => el.textContent = nameTextField.value);
    flipCard.querySelectorAll('.tagline').forEach(el => el.textContent = tagLineTextArea.value);
    flipCard.flipped = !flipCard.flipped;
    event.preventDefault();
  });
</script>

<style>
  #flip-card__overview {
    max-width: 20rem;

    /* Front */
    quiet-card:not([slot="back"]) {
      &::part(body) {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        gap: 0.5rem;
      }

      quiet-avatar {
        --size: 5rem;
      }

      .name {
        margin-block: 0;
      }

      .tagline {
        margin-block-end: 1rem;
      }
    }

    /* Back */
    quiet-card[slot="back"] {
      background: var(--quiet-paper-color);

      &::part(body) {
        margin-block: auto;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
    }

    .buttons {
      text-align: center;
    }        
  }
</style>
```

## Examples

### Flip card basics

Flip cards span the full width of their container, by default. The height is determined by the content you slot in. The flip card will grow to fit the content of the front or back side, whichever is greater.

The most basic flip card requires two child elements. Content in the default slot will be shown on the card's front side and content in the `back` slot will be shown on the card's back side.

```html
<quiet-flip-card>
  <div>Front content</div>
  <div slot="back">Back content</div>
</quiet-flip-card>
```

Flip cards work with any content, but they work exceptionally well with [cards](/docs/components/card).

### Flipping the card

You can flip a flip card programmatically by obtaining a reference to it and setting the `flipped` property to `true` or `false`.

```js
const flipCard = document.querySelector('quiet-flip-card');

// Flip the card
flipCard.flipped = true;

// Flip it back
flipCard.flipped = false;
```

However, it's often more convenient for a button to control the flip card _without_ additional scripting. In this case, you can add the `data-flip-card="toggle *"` attribute to any button in the document, where `*` is the target flip card's `id`. If the button is inside of a flip card, the ID can be omitted.

```html {.example}
<quiet-flip-card id="flip-card__toggle">
  <quiet-card>Front content</quiet-card>
  <quiet-card slot="back">Back content</quiet-card>
</quiet-flip-card>

<quiet-button data-flip-card="toggle flip-card__toggle">
  Toggle
</quiet-button>

<style>
  #flip-card__toggle {
    max-width: 20rem;
    margin-block-end: 1rem;
  }
</style>
```

To flip card to a specific side, use `data-flip-card="front *"` or `data-flip-card="back *"`. Again, the ID can be omitted if the button is inside the flip card.

```html {.example}
<quiet-flip-card id="flip-card__sides">
  <quiet-card>Front content</quiet-card>
  <quiet-card slot="back">Back content</quiet-card>
</quiet-flip-card>

<quiet-button data-flip-card="front flip-card__sides">
  Show the front
</quiet-button>

<quiet-button data-flip-card="back flip-card__sides">
  Show the back
</quiet-button>

<style>
  #flip-card__sides {
    max-width: 20rem;
    margin-block-end: 1rem;
  }
</style>
```

### Changing the orientation

Use the `orientation` attribute to set the flip animation to `horizontal` (default) or `vertical`.

```html {.example}
<quiet-flip-card orientation="vertical" style="max-width: 300px;" id="flip-card__vertical">
  <quiet-card>
    <img src="https://images.unsplash.com/photo-1734654901149-02a9a5f7993b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A beautiful food dish surrounded by kibbles">
    <h3>Kitty Bowl</h3>
    <p>Our signature dinner plate.</p>
    <p><strong>$9.99</strong></p>
    <button type="button" data-flip-card="toggle">View features</button>
  </quiet-card>
  <quiet-card slot="back">
    <h3>Features</h3>
    <ul>
      <li><quiet-icon name="check"></quiet-icon> Stylish design</li>
      <li><quiet-icon name="check"></quiet-icon> Durable ceramic</li>
      <li><quiet-icon name="check"></quiet-icon> Easy to clean</li>
      <li><quiet-icon name="check"></quiet-icon> Dishwasher safe</li>
      <li><quiet-icon name="check"></quiet-icon> Perfect for treats</li>
      <li><quiet-icon name="check"></quiet-icon> Made in the USA</li>
    </ul>
    <quiet-button data-flip-card="toggle" icon-label="Close" appearance="text">
      <quiet-icon name="x"></quiet-icon>
    </quiet-button>
  </quiet-card>
</quiet-flip-card>

<style>
  #flip-card__vertical {
    quiet-card  {
      padding: 1.5rem;
      text-align: center;

      p {
        margin-block-end: 1rem;
      }
    }
  
    img {
      width: 100%;
      height: auto;
      border-radius: 0.5rem;
    }
  
    ul {
      margin: 1rem 0;
    }

    li {
      list-style: none;
    }

    li quiet-icon {
      color: #60914a;
      vertical-align: -2px;
    }

    quiet-card[slot="back"] {
      &::part(body) {
        margin: auto 0;
      }

      quiet-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }
    }
  }
</style>
```

### Setting focus on flip

Use the `autofocus` attribute to assign focus to a specific element when the flip card turns over.

```html {.example}
<quiet-flip-card id="flip-card__autofocus">
  <quiet-card>
    Flip the card to observe autofocus. The text field will receive focus as soon as you flip it.
  </quiet-card>

  <quiet-card slot="back">
    <quiet-text-field label="Enter a value" autofocus></quiet-text-field>
  </quiet-card>
</quiet-flip-card>

<quiet-button data-flip-card="toggle flip-card__autofocus">
  Flip
</quiet-button>

<style>
  #flip-card__autofocus {
    max-width: 20rem;
    margin-block-end: 1rem;
  }
</style>
```

### Centering content vertically

If you're using [cards](/docs/components/card), you can vertically center the shorter side with a few lines of CSS applied to the card's `body` part.

```html {.example}
<quiet-flip-card id="flip-card__centering">
  <quiet-card>
    Front content, nicely centered
  </quiet-card>
  <quiet-card slot="back">
    Lorem iaculis aenean venenatis conubia vivamus eros himenaeos egestas. Facilisi suspendisse ultrices natoque aliquet et nibh venenatis fames. Facilisi tempor pellentesque auctor ligula fusce.
  </quiet-card>
</quiet-flip-card>

<quiet-button data-flip-card="toggle flip-card__centering">
  Flip
</quiet-button>

<style>
  #flip-card__centering {
    max-width: 20rem;
    margin-block-end: 1rem;

    quiet-card::part(body) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
```
