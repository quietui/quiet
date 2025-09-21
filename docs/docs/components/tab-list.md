---
title: Tab List
layout: component
---

Tab lists follow the [ARIA APG tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) for accessibility. They are comprised of three different components. A single tab list surrounds one or more [tabs](/docs/components/tab) and their corresponding [tab panels](/docs/components/tab-panel). Each panel must have a unique `name`, and each tab must have a `panel` attribute that maps to a panel.

```html {.example}
<quiet-tab-list label="Select a tab">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second">Second</quiet-tab>
	<quiet-tab panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
</quiet-tab-list>
```

:::info
In the same way that images require `alt` text, you should add a `label` to every tab list. The label won't be displayed, but it will be announced by assistive devices.
:::

## Examples

### Setting the active tab

To make a specific tab show initially, or to programmatically activate a tab, set the `tab` attribute to the name of the desired panel.

```html {.example}
<quiet-tab-list label="Select a tab" tab="second">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second">Second</quiet-tab>
	<quiet-tab panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
</quiet-tab-list>
```

### Showing tabs at the bottom

Set the `placement` attribute to `bottom` to show tabs at the bottom.

```html {.example}
<quiet-tab-list label="Select a tab" placement="bottom">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second">Second</quiet-tab>
	<quiet-tab panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
</quiet-tab-list>
```

### Showing tabs at the start

Set the `placement` attribute to `start` to show tabs at the start. The tabs will automatically move to the opposite side in <abbr title="Right to left">RTL</abbr> languages.

```html {.example}
<quiet-tab-list label="Select a tab" placement="start">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second">Second</quiet-tab>
	<quiet-tab panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
</quiet-tab-list>
```

### Showing tabs at the end

Set the `placement` attribute to `end` to show tabs at the end. The tabs will automatically move to the opposite side in <abbr title="Right to left">RTL</abbr> languages.

```html {.example}
<quiet-tab-list label="Select a tab" placement="end">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second">Second</quiet-tab>
	<quiet-tab panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
</quiet-tab-list>
```

### Scrolling tabs

When the number of tabs exceeds the available space in a top or bottom placement, the tab container will scroll horizontally.

```html {.example}
<quiet-tab-list label="Select a tab">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second">Second</quiet-tab>
	<quiet-tab panel="third">Third</quiet-tab>
	<quiet-tab panel="fourth">Fourth</quiet-tab>
	<quiet-tab panel="fifth">Fifth</quiet-tab>
	<quiet-tab panel="sixth">Sixth</quiet-tab>
	<quiet-tab panel="seventh">Seventh</quiet-tab>
	<quiet-tab panel="eight">Eight</quiet-tab>
	<quiet-tab panel="ninth">Ninth</quiet-tab>
	<quiet-tab panel="tenth">Tenth</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
	<quiet-tab-panel name="fourth">Stealthy shadows in the moonlight, cats emerge for nocturnal adventures through gardens and alleyways. Their night vision reveals a secret world invisible to human eyes during daylight hours.</quiet-tab-panel>
	<quiet-tab-panel name="fifth">Cozy blanket burrows become the ultimate fortress for sleepy kitties seeking warmth. The rhythmic breathing of a napping cat creates the most soothing soundtrack for peaceful afternoons.</quiet-tab-panel>
	<quiet-tab-panel name="sixth">Laser pointer dots trigger ancient hunting instincts, sending cats into acrobatic displays of athleticism. Every red dot becomes the ultimate prey in this eternal game of chase and pounce.</quiet-tab-panel>
	<quiet-tab-panel name="seventh">Catnip-infused toys transform ordinary house cats into euphoric party animals rolling with unbridled joy. This magical herb unlocks a level of feline happiness that's absolutely contagious to witness.</quiet-tab-panel>
	<quiet-tab-panel name="eight">Scratching posts serve as both manicure stations and territorial markers for our feline friends. Each scratch communicates ownership while maintaining those razor-sharp claws in perfect hunting condition.</quiet-tab-panel>
	<quiet-tab-panel name="ninth">Cardboard boxes become luxury penthouses in the cat real estate market, regardless of size. Whether tiny or enormous, every box offers the perfect hideout for surveillance and surprise attacks.</quiet-tab-panel>
	<quiet-tab-panel name="tenth">Sunrise stretches and yoga poses demonstrate the incredible flexibility that makes cats natural contortionists. Their graceful movements inspire humans to embrace daily stretching routines for better health.</quiet-tab-panel>
</quiet-tab-list>
```

If you don't want the tabs to scroll, you can apply `flex-wrap: wrap` to the `tabs-content` part to allow them to wrap instead.

```html {.example}
<quiet-tab-list label="Select a tab" id="tabs-list__no-scroll">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second">Second</quiet-tab>
	<quiet-tab panel="third">Third</quiet-tab>
	<quiet-tab panel="fourth">Fourth</quiet-tab>
	<quiet-tab panel="fifth">Fifth</quiet-tab>
	<quiet-tab panel="sixth">Sixth</quiet-tab>
	<quiet-tab panel="seventh">Seventh</quiet-tab>
	<quiet-tab panel="eight">Eight</quiet-tab>
	<quiet-tab panel="ninth">Ninth</quiet-tab>
	<quiet-tab panel="tenth">Tenth</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
	<quiet-tab-panel name="fourth">Stealthy shadows in the moonlight, cats emerge for nocturnal adventures through gardens and alleyways. Their night vision reveals a secret world invisible to human eyes during daylight hours.</quiet-tab-panel>
	<quiet-tab-panel name="fifth">Cozy blanket burrows become the ultimate fortress for sleepy kitties seeking warmth. The rhythmic breathing of a napping cat creates the most soothing soundtrack for peaceful afternoons.</quiet-tab-panel>
	<quiet-tab-panel name="sixth">Laser pointer dots trigger ancient hunting instincts, sending cats into acrobatic displays of athleticism. Every red dot becomes the ultimate prey in this eternal game of chase and pounce.</quiet-tab-panel>
	<quiet-tab-panel name="seventh">Catnip-infused toys transform ordinary house cats into euphoric party animals rolling with unbridled joy. This magical herb unlocks a level of feline happiness that's absolutely contagious to witness.</quiet-tab-panel>
	<quiet-tab-panel name="eight">Scratching posts serve as both manicure stations and territorial markers for our feline friends. Each scratch communicates ownership while maintaining those razor-sharp claws in perfect hunting condition.</quiet-tab-panel>
	<quiet-tab-panel name="ninth">Cardboard boxes become luxury penthouses in the cat real estate market, regardless of size. Whether tiny or enormous, every box offers the perfect hideout for surveillance and surprise attacks.</quiet-tab-panel>
	<quiet-tab-panel name="tenth">Sunrise stretches and yoga poses demonstrate the incredible flexibility that makes cats natural contortionists. Their graceful movements inspire humans to embrace daily stretching routines for better health.</quiet-tab-panel>
</quiet-tab-list>

<style>
  quiet-tab-list#tabs-list__no-scroll::part(tabs-content) {
    flex-wrap: wrap;
  }
</style>
```

### Disabling

To disable a tab, add the `disabled` attribute to it. Since tabs use [automatic activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/), disabled tabs are not focusable but are still recognized by assistive devices as disabled tabs.

```html {.example}
<quiet-tab-list label="Select a tab">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second" disabled>Second (disabled)</quiet-tab>
	<quiet-tab panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
</quiet-tab-list>
```

### Lazy loading content

Quiet considers lazy loading tab content to be an anti-pattern but, when necessary, you can use the `quiet-tab-shown` event to do it.

```html {.example}
<quiet-tab-list label="Select a tab" id="tab-list__lazy">
	<quiet-tab panel="regular">Regular</quiet-tab>
	<quiet-tab panel="lazy">Lazy</quiet-tab>

	<quiet-tab-panel name="regular">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="lazy">
    <quiet-spinner label="Loading" style="display: block; margin-inline: auto;"></quiet-spinner>
  </quiet-tab-panel>
</quiet-tab-list>

<script>
  const tabList = document.getElementById('tab-list__lazy');
  const lazyPanel = tabList.querySelector('quiet-tab-panel[name="lazy"]');

  tabList.addEventListener('quiet-tab-shown', event => {
    if (event.detail.tab.panel === 'lazy' && !lazyPanel.hasAttribute('data-loaded')) {
      lazyPanel.setAttribute('data-loaded', '');

      // Some async operation...

      setTimeout(() => {
        lazyPanel.innerHTML = 'Surprise! A sleepy kitten just finished loading and is now ready for belly rubs and treats.';
      }, 2000);
    }
  });
</script>
```

### Making tabs closable

Avoid nesting buttons and other interactive elements inside of a tab, as it will cause assistive devices to work incorrectly. Instead, you can add buttons adjacent to tabs using the `tab` slot as shown in this example. When tabs are removable, you should also listen for the [[Delete]] key.

Note that we use `tabindex="-1"` on the close button to prevent it from interfering with normal tabbing. The button, however, is still accessible to virtual cursors.

```html {.example}
<quiet-tab-list label="Select a tab" id="tab-list__closable">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second">Second</quiet-tab>
  <quiet-button slot="tab" appearance="text" size="xs" icon-label="Close second tab" tabindex="-1">
    <quiet-icon name="x"></quiet-icon>
  </quiet-button>
	<quiet-tab panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
</quiet-tab-list>

<quiet-button disabled style="margin-block-start: 2rem;">Restore Tab</quiet-button>

<script>
  const tabList = document.getElementById('tab-list__closable');
  const firstTab = tabList.querySelector('quiet-tab[panel="first"]');
  const secondTab = tabList.querySelector('quiet-tab[panel="second"]');
  const secondPanel = tabList.querySelector('quiet-tab-panel[name="second"]');
  const closeButton = tabList.querySelector('quiet-button');
  const restoreButton = tabList.nextElementSibling;
  
  function closeTab() {
    closeButton.remove();
    secondTab.remove();
    secondPanel.remove();
    restoreButton.disabled = false;

    if (tabList.active === 'second') {
      tabList.active = 'third';
    }
  }

  function restoreTab() {
    firstTab.insertAdjacentElement('afterend', closeButton);
    firstTab.insertAdjacentElement('afterend', secondTab);
    tabList.append(secondPanel);
    restoreButton.disabled = true;
  }

  // Remove the tab when the close button is clicked
  closeButton.addEventListener('click', closeTab);

  // Remove the tab when delete is pressed
  secondTab.addEventListener('keydown', event => {
    if (event.key === 'Delete') {
      closeTab();
    }
  });
  
  // Restore the tab
  restoreButton.addEventListener('click', restoreTab);
</script>

<style>
  #tab-list__closable {
    quiet-button {
      position: relative;
      left: -1rem;
      font-size: .875rem;
      margin-inline-end: -.5rem;
    }
    
    quiet-button::part(button) {
      border-radius: var(--quiet-border-radius-md);
      height: 2rem;
    }
  }
</style>
```

### Styling tab lists

Tab lists come with a simple, minimal appearance. Feel free to customize them with your own styles.

```html {.example}
<quiet-tab-list label="Select a tab" class="tab-list__cards">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second">Second</quiet-tab>
	<quiet-tab panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
</quiet-tab-list>

<style>
  .tab-list__cards {
    border: solid 1px var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius-md);
    box-shadow: var(--quiet-shadow-softer);

    &::part(tabs) {
      padding-top: 0.5rem;
    }

    &::part(panels) {
      padding: 1.5rem 1rem;
    }

    quiet-tab {
      background-color: var(--quiet-paper-color);
      border: solid 1px var(--quiet-neutral-stroke-softer);
      border-start-start-radius: var(--quiet-border-radius-md);
      border-start-end-radius: var(--quiet-border-radius-md);
      color: var(--quiet-text-muted);
      padding-block: 0.75rem;
      margin-inline: 0.25rem;

      &:state(active) {
        background-color: var(--quiet-background-color);
      }
    }

    quiet-tab:first-of-type {
      margin-inline-start: 0.5rem;
    }

    quiet-tab:last-of-type {
      margin-inline-end: 0.5rem;
    }

    quiet-tab:state(active) {
      border-bottom-color: var(--quiet-background-color);
      color: var(--quiet-text-body);
    }

    &::part(panels) {
      border-top-width: 1px;
      margin-top: -1px;
    }
  }  
</style>
```

```html {.example}
<quiet-tab-list label="Select a tab" class="tab-list__segments">
	<quiet-tab panel="first">First</quiet-tab>
	<quiet-tab panel="second">Second</quiet-tab>
	<quiet-tab panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Whiskers twitching with curiosity, cats patrol their domain with silent paws and keen eyes. Every corner holds potential adventure or the perfect sunny spot for an afternoon nap.</quiet-tab-panel>
	<quiet-tab-panel name="second">Purring contentedly on warm windowsills, felines observe the world with ancient wisdom. Their graceful movements and mysterious expressions captivate humans across all cultures.</quiet-tab-panel>
	<quiet-tab-panel name="third">Playful pouncing and midnight zoomies reveal the wild hunter within every house cat. From cardboard boxes to feather toys, everything becomes an exciting opportunity for feline fun.</quiet-tab-panel>
</quiet-tab-list>

<style>
  .tab-list__segments {
    &::part(tabs) {
      justify-content: space-between;
      background-color: var(--quiet-neutral-fill-softer);
      border-radius: var(--quiet-border-radius-md);
      padding: .25rem;
    }

    quiet-tab {
      flex: 1 1 auto;
      justify-content: center;
      border: none;
      border-radius: var(--quiet-border-radius-md);
      color: var(--quiet-text-muted);
      padding-inline: 2rem;
      padding-block: .25rem;
      transition: 100ms background-color ease, 100ms color ease;
    }

    quiet-tab:first-child {
      margin-inline-start: 0;
    }

    quiet-tab:state(active) {
      border: none;
      background-color: var(--quiet-background-color);
      color: var(--quiet-text-body);
    }

    &::part(panels) {
      border: none;
      padding-block: 1rem;
      margin: 0;
    }
  }  
</style>
```