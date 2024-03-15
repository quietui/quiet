---
title: Tab List
layout: component
---

Tab lists are comprised of three different components. A single tab list surrounds one or more [tabs](/docs/components/tab) and their corresponding [tab panels](/docs/components/tab-panel). Each panel must have a unique `name`, and each tab must have `slot="tab"` and a `panel` attribute that maps to a panel.

```html {.example}
<quiet-tab-list label="Select a tab">
	<quiet-tab slot="tab" panel="first">First</quiet-tab>
	<quiet-tab slot="tab" panel="second">Second</quiet-tab>
	<quiet-tab slot="tab" panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="second">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="third">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
</quiet-tab-list>
```

:::info
In the same way that images require `alt` text, you should add a `label` to every tab list. The label won't be displayed, but it will be announced by assistive devices.
:::

## Examples

### Setting the active tab

To make a specific tab show initially, or to programmatically activate a tab, set the `active` attribute to the name of the desired panel.

```html {.example}
<quiet-tab-list label="Select a tab" active="second">
	<quiet-tab slot="tab" panel="first">First</quiet-tab>
	<quiet-tab slot="tab" panel="second">Second</quiet-tab>
	<quiet-tab slot="tab" panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="second">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="third">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
</quiet-tab-list>
```

### Showing tabs at the bottom

Set the `placement` attribute to `bottom` to show tabs at the bottom.

```html {.example}
<quiet-tab-list label="Select a tab" placement="bottom">
	<quiet-tab slot="tab" panel="first">First</quiet-tab>
	<quiet-tab slot="tab" panel="second">Second</quiet-tab>
	<quiet-tab slot="tab" panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="second">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="third">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
</quiet-tab-list>
```

### Showing tabs at the start

Set the `placement` attribute to `start` to show tabs at the start. The tabs will automatically move to the opposite side in <abbr title="Right to left">RTL</abbr> languages.

```html {.example}
<quiet-tab-list label="Select a tab" placement="start">
	<quiet-tab slot="tab" panel="first">First</quiet-tab>
	<quiet-tab slot="tab" panel="second">Second</quiet-tab>
	<quiet-tab slot="tab" panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="second">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="third">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
</quiet-tab-list>
```

### Showing tabs at the end

Set the `placement` attribute to `end` to show tabs at the end. The tabs will automatically move to the opposite side in <abbr title="Right to left">RTL</abbr> languages.

```html {.example}
<quiet-tab-list label="Select a tab" placement="end">
	<quiet-tab slot="tab" panel="first">First</quiet-tab>
	<quiet-tab slot="tab" panel="second">Second</quiet-tab>
	<quiet-tab slot="tab" panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="second">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="third">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
</quiet-tab-list>
```

### Scrolling tabs

When the number of tabs exceeds the available space in a top or bottom placement, the tab container will scroll horizontally.

```html {.example}
<quiet-tab-list label="Select a tab">
	<quiet-tab slot="tab" panel="first">First</quiet-tab>
	<quiet-tab slot="tab" panel="second">Second</quiet-tab>
	<quiet-tab slot="tab" panel="third">Third</quiet-tab>
	<quiet-tab slot="tab" panel="fourth">Fourth</quiet-tab>
	<quiet-tab slot="tab" panel="fifth">Fifth</quiet-tab>
	<quiet-tab slot="tab" panel="sixth">Sixth</quiet-tab>
	<quiet-tab slot="tab" panel="seventh">Seventh</quiet-tab>
	<quiet-tab slot="tab" panel="eight">Eight</quiet-tab>
	<quiet-tab slot="tab" panel="ninth">Ninth</quiet-tab>
	<quiet-tab slot="tab" panel="tenth">Tenth</quiet-tab>

	<quiet-tab-panel name="first">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="second">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="third">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
	<quiet-tab-panel name="fourth">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="fifth">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="sixth">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
	<quiet-tab-panel name="seventh">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="eight">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="ninth">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
	<quiet-tab-panel name="tenth">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
</quiet-tab-list>
```

:::info
If you don't want the tabs to scroll, you can apply `flex-wrap: wrap` to the `tabs` part to force them to wrap instead.
:::

### Disabling tabs

To disable a tab, add the `disabled` attribute to it. Since tabs use [automatic activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/), disabled tabs are not focusable but are still recognized by assistive devices as disabled tabs.

```html {.example}
<quiet-tab-list label="Select a tab">
	<quiet-tab slot="tab" panel="first">First</quiet-tab>
	<quiet-tab slot="tab" panel="second" disabled>Second (disabled)</quiet-tab>
	<quiet-tab slot="tab" panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="second">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="third">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
</quiet-tab-list>
```

### Lazy loading content

Quiet considers lazy loading tab content to be an anti-pattern but, when necessary, you can use the `quiet-tab-shown` event to do it.

```html {.example}
<quiet-tab-list label="Select a tab" id="tab-list__lazy">
	<quiet-tab slot="tab" panel="regular">Regular</quiet-tab>
	<quiet-tab slot="tab" panel="lazy">Lazy</quiet-tab>

	<quiet-tab-panel name="regular">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
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
        lazyPanel.innerHTML = 'I was loaded after the tab was shown.';
      }, 2000);
    }
  });
</script>
```

### Making tabs closable

Avoid nesting buttons and other interactive elements inside of a tab, as it will cause assistive devices to work incorrectly. Instead, you can add buttons adjacent to tabs using `slot="tab"`.

Note that we use `tabindex="-1"` on the close button to prevent it from interfering with normal tabbing. The button, however, is still accessible to virtual cursors.

```html {.example}
<quiet-tab-list label="Select a tab" id="tab-list__closable">
	<quiet-tab slot="tab" panel="first">First</quiet-tab>
	<quiet-tab slot="tab" panel="second">Second</quiet-tab>
  <quiet-button slot="tab" variant="text" icon-label="Close second tab" tabindex="-1">
    <quiet-icon name="x-mark" family="micro"></quiet-icon>
  </quiet-button>
	<quiet-tab slot="tab" panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="second">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="third">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
</quiet-tab-list>

<quiet-button disabled style="margin-block-start: 2rem;">Restore Tab</quiet-button>

<script>
  const tabList = document.getElementById('tab-list__closable');
  const closeButton = tabList.querySelector('quiet-button');
  const secondTab = tabList.querySelector('quiet-tab[panel="second"]');
  const secondPanel = tabList.querySelector('quiet-tab-panel[name="second"]');
  const restoreButton = tabList.nextElementSibling;
  
  // Remove the tab
  closeButton.addEventListener('quiet-click', () => {
    closeButton.remove();
    secondTab.remove();
    secondPanel.remove();
    restoreButton.disabled = false;

    if (tabList.active === 'second') {
      tabList.active = 'first';
    }
  });

  // Restore the tab
  restoreButton.addEventListener('quiet-click', () => {
    const firstTab = tabList.querySelector('quiet-tab[panel="first"]');

    firstTab.insertAdjacentElement('afterend', closeButton);
    firstTab.insertAdjacentElement('afterend', secondTab);
    tabList.append(secondPanel);
    restoreButton.disabled = true;
  });
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
      border-radius: 50%;
      height: 2rem;
    }
  }
</style>
```

### Styling tab lists

Tab lists come with a simple, minimal appearance. Feel free to customize them with your own styles. Here are some variations, for inspiration.

```html {.example}
<!-- Cards -->
<quiet-tab-list label="Select a tab" class="tab-list-cards">
	<quiet-tab slot="tab" panel="first">First</quiet-tab>
	<quiet-tab slot="tab" panel="second">Second</quiet-tab>
	<quiet-tab slot="tab" panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="second">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="third">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
</quiet-tab-list>

<br><br>

<!-- Pills -->
<quiet-tab-list label="Select a tab" class="tab-list-pills">
	<quiet-tab slot="tab" panel="first">First</quiet-tab>
	<quiet-tab slot="tab" panel="second">Second</quiet-tab>
	<quiet-tab slot="tab" panel="third">Third</quiet-tab>

	<quiet-tab-panel name="first">Lobortis mattis aliquam faucibus purus in massa tempor. Eu lobortis elementum nibh tellus molestie nunc non blandit. Ultrices sagittis orci a scelerisque purus.</quiet-tab-panel>
	<quiet-tab-panel name="second">Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</quiet-tab-panel>
	<quiet-tab-panel name="third">Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Mattis enim ut tellus elementum. Ultrices dui sapien eget mi proin sed libero.</quiet-tab-panel>
</quiet-tab-list>

<style>
  /* Cards */
  .tab-list-cards {
    quiet-tab {
      border: solid 1px var(--quiet-neutral-stroke-softer);
      border-start-start-radius: var(--quiet-border-radius);
      border-start-end-radius: var(--quiet-border-radius);
      color: var(--quiet-neutral-colored-text);
      padding-block: .75rem;
      margin-inline: 2px;
    }

    quiet-tab:first-child {
      margin-inline-start: 0;
    }

    quiet-tab[data-state-active] {
      border-bottom-color: var(--quiet-background-color);
      color: var(--quiet-body-color);
    }

    &::part(panels) {
      border-top-width: 1px;
      margin-top: -1px;
    }
  }

  /* Pills */
  .tab-list-pills {
    &::part(tabs) {
      justify-content: space-between;
      background-color: var(--quiet-neutral-fill-softer);
      border-radius: var(--quiet-border-radius);
      padding: .25rem;
    }

    quiet-tab {
      flex: 1 1 auto;
      justify-content: center;
      border: none;
      border-radius: calc(var(--quiet-border-radius) * .75);
      color: var(--quiet-neutral-colored-text);
      padding-inline: 2rem;
      padding-block: .25rem;
      transition: 100ms background-color ease, 100ms color ease;
    }

    quiet-tab:first-child {
      margin-inline-start: 0;
    }

    quiet-tab[data-state-active] {
      border: none;
      background-color: var(--quiet-background-color);
      color: var(--quiet-body-color);
    }

    &::part(panels) {
      border: none;
      padding-block: 1rem;
      margin: 0;
    }
  }  
</style>
```
