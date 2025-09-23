---
title: Random Content
layout: component
---

Perfect for showcasing rotating testimonials, featured products, helpful tips, or inspirational quotes, keeping content fresh and engaging without overwhelming users or repeating the same material.

```html {.example}
<quiet-random-content unique style="display: flex; flex-direction: column; gap: 1rem;" id="random__overview">
  <quiet-card class="testimonial">
    <quiet-avatar image="https://images.unsplash.com/photo-1672487209629-4d52e0c043d0?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      "The new scratching post is perfect! I sharpen my claws on it every morning."
      <cite>– Meowy McGee</cite>
    </div>
  </quiet-card>
  <quiet-card class="testimonial">
    <quiet-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      "Those catnip toys make me go absolutely bonkers!
      <cite>– Princess Mittens</cite>
    </div>
  </quiet-card>
  <quiet-card class="testimonial">
    <quiet-avatar image="https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      "Finally, a food that meets my refined palate."
      <cite>– Sir Fluffington</cite>
    </div>
  </quiet-card>
  <quiet-card class="testimonial">
    <quiet-avatar image="https://images.unsplash.com/photo-1735820474275-dd0ff4f28d71?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      "The automatic feeder ensures my 3 AM breakfast is always on time.
      <cite>– Shadow</cite>
    </div>
  </quiet-card>
  <quiet-card class="testimonial">
    <quiet-avatar image="https://images.unsplash.com/photo-1504384558400-c1347a7bd18f?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      "One day I'll catch that red dot, mark my words."
      <cite>– Captain Paws</cite>
    </div>
  </quiet-card>
  <quiet-card class="testimonial">
    <quiet-avatar image="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      "I've been sleeping 20 hours a day instead of my usual 18!"
      <cite>– Luna Belle</cite>
    </div>
  </quiet-card>
  <quiet-card class="testimonial">
    <quiet-avatar image="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      "I no longer need to demand fresh water from the tap every hour."
      <cite>– Duchess Whiskertons</cite>
    </div>
  </quiet-card>
  <quiet-card class="testimonial">
    <quiet-avatar image="https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      "I survey my kingdom from the top of the fridge daily."
      <cite>– King Mewington III</cite>
    </div>
  </quiet-card>  
</quiet-random-content>

<quiet-button>Randomize</quiet-button>

<script>
  const randomContent = document.getElementById('random__overview');
  const button = randomContent.nextElementSibling;

  button.addEventListener('click', () => {
    randomContent.randomize();
  });
</script>

<style>
  #random__overview {
    max-width: 420px;
    margin-block-end: 1.5rem;

    quiet-card::part(body) {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      font-size: 0.9375em;
    }

    .testimonial {
      quiet-avatar {
        --size: 5rem;
        flex-shrink: 0;
      }

      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      cite {
        display: block;
        text-align: right;
        font-size: 0.875rem;
        color: #666;
        margin-top: 0.5rem;
      }
    }
  }
</style>
```

## Examples

### Providing content

You can provide virtually any type of HTML element, as long as they are _direct descendants_. Simply slot the elements into the host as shown below.

The host element uses [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents) by default, which allows parent styles to pass through to the child elements, essentially making the host element "invisible" from a layout perspective.

```html
<quiet-random-content>
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
  <div class="box">D</div>
</quiet-random-content>
```

### Setting the number of items

Use the `items` attribute to display multiple random items at once. This is useful for showing a rotating selection of content like featured products or testimonials.

```html {.example}
<div id="random__items">
  <quiet-random-content items="2">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
    <div class="box">4</div>
    <div class="box">5</div>
    <div class="box">6</div>
    <div class="box">7</div>
    <div class="box">8</div>
    <div class="box">9</div>
    <div class="box">10</div>
  </quiet-random-content>

  <quiet-slider label="Items" value="2" min="1" max="5" with-markers with-tooltip></quiet-slider>
</div>

<script>
  const container = document.getElementById('random__items');
  const randomContent = container.querySelector('quiet-random-content');
  const slider = container.querySelector('quiet-slider');
  
  slider.addEventListener('input', () => {
    randomContent.items = slider.value;
  });
</script>

<style>
  #random__items {
    quiet-random-content {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-block-end: 1.5rem;
    }

    .box {
      width: 100px;
      height: 100px;
      background-color: var(--quiet-primary-fill-mid);
      border-radius: var(--quiet-border-radius-md);
      color: var(--quiet-neutral-text-on-soft);
      font-size: 1.5rem;
      font-weight: var(--quiet-font-weight-semibold);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
```

### Styling the container

The component uses [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents) by default, but you can override this behavior and use a flex or grid layout if you prefer.

```html {.example}
<quiet-random-content items="4" id="random__styling">
  <img 
    src="https://images.unsplash.com/photo-1628612380382-e6204e135307?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="An orange kitten meows while perched on a stone wall"
  >
  <img 
    src="https://images.unsplash.com/photo-1595252849939-1ec8070a354a?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A multicolored cat walking through the grass stops to look at the camera"
  >
  <img 
    src="https://images.unsplash.com/photo-1583399704033-3db671c65f5c?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A white fluffy kitten lays comfortably on the arm of a chair"
  >
  <img 
    src="https://images.unsplash.com/photo-1625060241508-22488e1e9264?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A gray tabby lays in a bed and looks out past the camera"
  >
  <img 
    src="https://images.unsplash.com/photo-1692901573513-41cda579d689?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A black and white kitten lays on its bed and looks at the camera"
  >
  <img 
    src="https://images.unsplash.com/photo-1622273414093-27fd902ac078?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A young gray tabby lays on the steps and yawns"
  >
  <img 
    src="https://images.unsplash.com/photo-1504384558400-c1347a7bd18f?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A gray cat lays in the light of a window at night"
  >
  <img 
    src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A Himalayan cat with bright blue eyes smells the air"
  >
  <img 
    src="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A tabby looks into the distance on a blue sky backdrop"
  >
  <img 
    src="https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="An orange and white cat lays in a wicker basket"
  >
</quiet-random-content>

<style>
  #random__styling {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
</style>
```

You can render random content inline by setting `display: inline`.

```html {.example}
<div id="random__inline">
  I'm just a
  <quiet-random-content style="display: inline;" unique>
    <span>cat</span>
    <span>kitten</span>
    <span>fluffy beast</span>
    <span>purr machine</span>
  </quiet-random-content>
  on a mission!
  <br><br>
  <quiet-button>Randomize</quiet-button>
</div>

<script>
  const container = document.getElementById('random__inline');
  const randomContent = container.querySelector('quiet-random-content');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    randomContent.randomize();
  });
</script>

<style>
  #random__inline {
    display: inline;
  }
</style>
```

### Showing items in sequence

You can set the `mode` attribute to `sequence` to display items in order rather than randomly. Each time you call `randomize()`, the component advances to the next set of items in the sequence.

```html {.example}
<div id="random__sequential">
  <quiet-random-content mode="sequence" items="2">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
    <div class="box">4</div>
    <div class="box">5</div>
    <div class="box">6</div>
    <div class="box">7</div>
    <div class="box">8</div>
    <div class="box">9</div>
  </quiet-random-content>
  
  <quiet-button>Next Set</quiet-button>
</div>

<script>
  const container = document.getElementById('random__sequential');
  const randomContent = container.querySelector('quiet-random-content');
  const button = container.querySelector('quiet-button');
  
  button.addEventListener('click', () => {
    randomContent.randomize();
  });
</script>

<style>
  #random__sequential {
    quiet-random-content {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      margin-block-end: 1.5rem;
    }

    .box {
      width: 100px;
      height: 100px;
      background-color: var(--quiet-primary-fill-mid);
      border-radius: var(--quiet-border-radius-md);
      color: var(--quiet-neutral-text-on-soft);
      font-size: 1.5rem;
      font-weight: var(--quiet-font-weight-semibold);
      display: flex;
      align-items: center;
      justify-content: center;
    }    
  }
</style>
```
