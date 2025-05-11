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

Scrollers can accommodate virtually any content type within their container. By default, they handle horizontal overflow with scrolling. It might be necessary to specify a width or height on your container element to prevent unwanted wrapping and ensure proper scrolling behavior.

```html {.example}
<quiet-scroller id="scroller__content">
  <div class="card" style="width: 1500px;">
    <p>Cats love to chase laser dots and yarn balls around the house, pouncing with surprising agility. Their whiskers help them navigate tight spaces, while their retractable claws keep them ready for playtime. Sometimes they zoom around at 3 AM for no reason, doing what cat owners call the "midnight zoomies."</p>
    <p>Purring isn't just for happiness — cats also purr when injured or stressed, as the vibrations may help with healing. A cat's sandpaper tongue has tiny hooks perfect for grooming their fur. When they slow-blink at you, it's actually a kitty kiss!</p>
    <p>Most cats spend up to 16 hours sleeping daily, often in strange positions or inconvenient spots like your keyboard. They're excellent jumpers, able to leap up to 6 times their length. Despite their independent reputation, many cats form strong bonds with their humans and other pets.</p>
    <p>A cat's meow is mainly for human communication — adult cats rarely meow at each other. They express themselves through body language, like tail positions and ear movements. Their superior night vision comes from special reflective cells, though they can't see in complete darkness.</p>
  </div>
</quiet-scroller>

<style>
  #scroller__content {
    .card {
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

### Changing the orientation

Scrollers default to a horizontal orientation. To create a vertical scroller, set the `orientation` attribute to `vertical`. The scroller will adapt to the available space, or you can constrain its height with a wrapper or by setting a height directly.

```html {.example}
<div style="height: 300px;">
  <quiet-scroller id="scroller__vertical" orientation="vertical">
    <div class="card">
      <p style="margin-block-start: 0;">Cats have whiskers not only on their muzzles, but also above their eyes, on their chins, and on the backs of their front legs. These whiskers help them navigate tight spaces and monitor air currents.</p>
      <p>Cats have a third eyelid called a "haw" or nictitating membrane. This clear eyelid helps protect their eyes while maintaining visibility, especially during hunting or fights.</p>
      <p>A cat's heart beats nearly twice as fast as a human heart, at 110 to 140 beats per minute. Their quick metabolism supports their naturally active lifestyle.</p>
      <p>Cats can rotate their ears 180 degrees using 32 different muscles. This allows them to pinpoint the exact location of sounds without moving their heads.</p>
      <p>A cat's nose print is unique, just like a human's fingerprint, with no two cats having the same pattern of bumps and ridges.</p>
      <p>A cat can jump up to six times its length in a single bound, making them exceptional jumpers compared to their size. Their powerful hind legs contain extra muscles specifically designed for jumping.</p>
      <p>Cats can make over 100 different vocal sounds, while dogs can only make about 10. Their vocalizations include purrs, meows, chirps, trills, growls, and hisses.</p>
      <p>Most cats have no taste buds for sweetness. They lack the gene that codes for the sweet taste receptor, making them indifferent to sugary foods.</p>
      <p>A cat can change its meow to manipulate humans. They develop specific meows to communicate different needs, essentially training their owners to respond.</p>
      <p style="margin-block-end: 0;">Cats can drink seawater in survival situations. Their kidneys are so efficient they can filter out the salt and use the water content.</p>
    </div>
  </quiet-scroller>
</div>

<style>
  #scroller__vertical {
    .card {
      padding: 1rem;
      
      h3 {
        margin-top: 0;
      }
      
      p:last-child {
        margin-bottom: 0;
      }
    }
  }  
</style>
```

### Hiding the scrollbar

Add the `without-scrollbar` attribute to prevent the scrollbar from being visible.

```html {.example}
<quiet-scroller id="scroller__hiding" without-scrollbar>
  <div class="card">
    <p>Cats are expert hunters with sharp reflexes and incredible patience. They can spend hours watching prey before making their move. Their whiskers act as precision sensors, detecting even the slightest air movements around them.</p>
    <p>When sleeping, cats curl into tight balls to conserve body heat and protect vital organs. This instinctive position dates back to their wild ancestors who needed to stay warm and safe while resting.</p>
    <p>A cat's purr vibrates at a frequency that can promote healing and bone growth. This may explain why cats with broken bones heal faster than many other animals. Their therapeutic purr ranges from 25 to 150 Hertz.</p>
    <p>House cats share 95.6% of their genetic makeup with tigers, despite the enormous size difference. This close relationship is evident in their similar behaviors, from scent marking to stalking techniques.</p>
  </div>
</quiet-scroller>

<style>
  #scroller__hiding {
    .card {
      width: 1200px;
      padding: 1rem;
      
      p:last-child {
        margin-block-end: 0;
      }
    }
  }  
</style>
```

:::warn
Using this option will affect users' ability to scroll on certain devices.
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
    --edge-color: var(--quiet-primary-fill-soft);
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
