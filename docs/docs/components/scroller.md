---
title: Scroller
layout: component
---

```html {.example}
<quiet-scroller id="scroller__overview">
  <table>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Color</th>
      <th>Breed</th>
      <th>Breed Description</th>
    </tr>
    <tr>
      <td>Sir Whiskertons III</td>
      <td>3</td>
      <td>Orange & White</td>
      <td>Maine Coon</td>
      <td>These gentle giants are known as the dogs of the cat world. Super friendly and fluffy, they'll follow you around like a furry shadow.</td>
    </tr>
    <tr>
      <td>Lady Pawington</td>
      <td>2</td>
      <td>Gray</td>
      <td>Russian Blue</td>
      <td>Elegant cats with plush, silvery coats. They're basically living stuffed animals that love to cuddle.</td>
    </tr>
    <tr>
      <td>Captain Beans</td>
      <td>1</td>
      <td>Black</td>
      <td>Bombay</td>
      <td>Mini panthers with golden eyes who think they own the place. These house tigers are total attention seekers.</td>
    </tr>
    <tr>
      <td>Princess Mochi</td>
      <td>4</td>
      <td>Cream</td>
      <td>Ragdoll</td>
      <td>These floppy cats go limp when you hold them, hence the name. Total sweethearts who love being carried around like babies.</td>
    </tr>
    <tr>
      <td>Duke Noodleton</td>
      <td>2</td>
      <td>Brown Tabby</td>
      <td>Bengal</td>
      <td>Wild-looking cats with leopard spots and endless energy. They'll turn your house into their personal jungle gym.</td>
    </tr>
  </table>  
</quiet-scroller>

<style>
  #scroller__overview {
    table {
      margin-block: 0;
    }

    th,
    td {
      white-space: nowrap;
    }

    th:nth-child(5),
    td:nth-child(5) {
      min-width: 50ch;
      white-space: wrap;
    }
  }
</style>
```

## Examples

### Adding content

Slot the content you want to make scrollable into the scroller element. If necessary, you can set a fixed width on your content or let it remain fluid. When the container causes overflow, the scroller will kick in automatically. This example is contrived to demonstrate this behavior.

```html {.example}
<quiet-scroller id="scroller__content">
  <div class="card">
    <p>Cats love to chase laser dots and yarn balls around the house, pouncing with surprising agility. Their whiskers help them navigate tight spaces, while their retractable claws keep them ready for playtime. Sometimes they zoom around at 3 AM for no reason, doing what cat owners call the "midnight zoomies."</p>
    <p>Purring isn't just for happiness — cats also purr when injured or stressed, as the vibrations may help with healing. A cat's sandpaper tongue has tiny hooks perfect for grooming their fur. When they slow-blink at you, it's actually a kitty kiss!</p>
    <p>Most cats spend up to 16 hours sleeping daily, often in strange positions or inconvenient spots like your keyboard. They're excellent jumpers, able to leap up to 6 times their length. Despite their independent reputation, many cats form strong bonds with their humans and other pets.</p>
    <p>A cat's meow is mainly for human communication — adult cats rarely meow at each other. They express themselves through body language, like tail positions and ear movements. Their superior night vision comes from special reflective cells, though they can't see in complete darkness.</p>
  </div>
</quiet-scroller>

<style>
  #scroller__content {
    .card {
      width: 1500px;
      padding: 1rem;

      p:last-child {
        margin-block-end: 0;
      }
    }
  }  
</style>
```

:::info
If you need to change the scroller's layout, e.g. to flex or grid, apply the appropriate styles to the `content` part, not the host element.
:::

### Styling the shadow

Use the `--shadow-color`, `--shadow-opacity`, and `--shadow-width` custom properties to style the shadows that appear when scrolling is possible. To customize the line that runs along the edge of the shadow, use the `--edge-width` and `--edge-color` custom properties.

```html {.example}
<quiet-scroller id="scroller__shadow">
  <div class="card">
    <p>A cat's hearing is remarkable - they can detect frequencies up to 64,000 Hz, far beyond human capabilities. Their flexible spine allows them to make incredible leaps and always land on their feet using an internal "righting reflex." Despite being obligate carnivores, many cats oddly enjoy nibbling on houseplants.</p> 
    <p>Cats communicate through over 100 different vocalizations, from chirps to trills. Their whiskers are precisely as wide as their bodies, helping them determine if they can fit through tight spaces. Kneading behavior, often called "making biscuits," is a leftover instinct from kittenhood.</p> 
    <p>The average house cat can run at speeds up to 30 mph in short bursts. They have an extra organ called the Jacobson's organ in their mouths, which helps them "taste" scents in the air. Many cats are actually lactose intolerant, despite popular media depicting them drinking milk.</p> 
    <p>A cat's brain structure is 90% similar to a human's, with nearly twice as many neurons controlling their cerebral cortex. Their eyes contain a reflective layer which amplifies light and creates that distinctive nighttime glow. Cats spend roughly 30% of their waking hours grooming themselves.</p>
  </div>
</quiet-scroller>

<style>
  #scroller__shadow {
    --edge-color: var(--quiet-primary-fill-mid);
    --edge-width: 1px;
    --shadow-color: var(--quiet-primary-fill-mid);
    --shadow-opacity: 15%;
    --shadow-width: 2rem;

    .card {
      width: 1500px;
      padding: 1rem;

      p:last-child {
        margin-block-end: 0;
      }
    }
  }  
</style>
```

### Scroll snapping

If you'd like to add [scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap) properties, apply them to the `content` part, not the host element, as shown in this example.

```html {.example}
<quiet-scroller id="scroller__snap">
  <div class="card" style="background: #3b82f6;">1</div>
  <div class="card" style="background: #ec4899;">2</div>
  <div class="card" style="background: #ef4444;">3</div>
  <div class="card" style="background: #8b5cf6;">4</div>
  <div class="card" style="background: #22c55e;">5</div>
  <div class="card" style="background: #10b981;">6</div>
  <div class="card" style="background: #14b8a6;">7</div>
  <div class="card" style="background: #0ea5e9;">8</div>
</quiet-scroller>

<style>
  #scroller__snap {
    &::part(content) {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      gap: 2rem;
      width: 100%;
      scroll-snap-type: x mandatory;
      scroll-padding: 0 1rem;
    }

    .card {
      flex: 1 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(50% - 2rem);
      height: 200px;
      border: none;
      border-radius: var(--quiet-border-radius);
      font-size: 72px;
      color: white;
      scroll-snap-align: start;
    }
  }
</style>
```
