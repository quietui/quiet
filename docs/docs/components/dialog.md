---
title: Dialog
layout: component
---

```html {.example}
<quiet-dialog id="dialog__overview">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Dialog
  </h3>

  <p>Curious cats explore every corner of their domain, gracefully leaping from windowsills to countertops, always seeking new adventures.</p>
  
  <quiet-button slot="footer" data-dialog="close" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button data-dialog="open dialog__overview">Show dialog</quiet-button>
```

## Examples

### Opening and closing dialogs

You can open and close a dialog programmatically by obtaining a reference to it and setting the `open` property to `true` or `false`, respectively.

```js
const dialog = document.querySelector('quiet-dialog');

// Open the dialog
dialog.open = true;

// Close the dialog
dialog.open = false;
```

However, it's often more convenient for a button to control the dialog _without_ additional scripting. In this case, you can add the `data-dialog="open *"` attribute to any button in the document, where `*` is the target dialog's `id`.

Similarly, you can add `data-dialog="close"` to any button inside a dialog to close it.

```html {.example}
<quiet-dialog id="dialog__opening">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Opening and closing
  </h3>

  <p>The button you clicked has <code>data-dialog="open <em>id</em>"</code> so it opens the dialog that has a matching ID.</p>
  <p>The button below has <code>data-dialog="close"</code> so clicking it will close the dialog.</p>

  <quiet-button slot="footer" data-dialog="close" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button data-dialog="open dialog__opening">Show dialog</quiet-button>
```

### With header

Place elements into the `header` slot to add content at the start of the dialog.

```html {.example}
<quiet-dialog id="dialog__header">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    With header
  </h3>

  <p>A playful kitten chases a red laser dot across the room, pouncing with determination while its tail twitches with excitement.</p>
</quiet-dialog>

<quiet-button data-dialog="open dialog__header">Show dialog</quiet-button>
```

### With footer

Place elements into the `footer` slot to add actions or other supplemental information at the end of the dialog.

```html {.example}
<quiet-dialog id="dialog__footer">
  <p>Gentle purrs fill the room as a content cat naps in a warm sunbeam, dreaming of chasing butterflies in the garden.</p>

  <quiet-button slot="footer" data-dialog="close" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button data-dialog="open dialog__footer">Show dialog</quiet-button>
```

### Light dismissal

When clicking outside of a dialog, it will normally pulse briefly to draw the user's attention. If you want these clicks to dismiss the dialog instead, use the `light-dismiss` attribute.

```html {.example}
<quiet-dialog light-dismiss id="dialog__light">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Light dismissal
  </h3>

  <p>Clicking outside the dialog will cause it to close.</p>

  <quiet-button slot="footer" data-dialog="close" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button data-dialog="open dialog__light">Show dialog</quiet-button>
``` 

### Customizing actions

By default, a close button is provided as a single action in the dialog's header. You can add your own header actions by slotting text buttons into the `actions` slot. Note that adding your own actions will remove the default close button.

```html {.example}
<quiet-dialog id="dialog__customizing">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Actions
  </h3>

  <quiet-button slot="actions" appearance="text" icon-label="Settings">
    <quiet-icon name="settings"></quiet-icon>
  </quiet-button>

  <quiet-button slot="actions" appearance="text" icon-label="Open in a new window">
    <quiet-icon name="external-link"></quiet-icon>
  </quiet-button>

  <quiet-button slot="actions" appearance="text" icon-label="Close" data-dialog="close">
    <quiet-icon name="x"></quiet-icon>
  </quiet-button>

  <p>Graceful cats leap through sunny windows. Their sleek whiskers twitch as they watch birds flutter past their perch.</p>
  
  <quiet-button slot="footer" data-dialog="close" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button data-dialog="open dialog__customizing">Show dialog</quiet-button>
```

:::info
The `actions` slot is only available when the header is enabled.
:::

### Changing the placement

By default, dialogs appear in the center of the screen. To make the dialog slide in from the side of the screen like a drawer, set the `placement` attribute to `start`, `end`, `top`, `bottom`, or `full`.

```html {.example}
<quiet-dialog id="dialog__placement">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Placement
  </h3>

  <p>Two mischievous cats prowl the kitchen countertops at midnight. Their glowing eyes search for forgotten treats and adventures.</p>

  <quiet-button slot="footer" data-dialog="close" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<div class="code-example-flex-wrap">
  <quiet-button data-placement="start">Start</quiet-button>
  <quiet-button data-placement="end">End</quiet-button>
  <quiet-button data-placement="top">Top</quiet-button>
  <quiet-button data-placement="bottom">Bottom</quiet-button>
  <quiet-button data-placement="full">Full</quiet-button>
</div>

<script>
  const dialog = document.getElementById('dialog__placement');
  const container = dialog.nextElementSibling;

  container.addEventListener('click', event => {
    if (event.target.closest('quiet-button')) {
      dialog.placement = event.target.getAttribute('data-placement');
      dialog.open = true;
    }
  });
</script>
```

:::info
The `--width` custom property has no effect on dialogs with `top` and `bottom` placements. Similarly, the `--height` custom property has no effect on dialogs with `start` and `end` placements. Neither have an effect on dialogs with the `full` placement.
:::

### Changing the size

The `--width` and `--height` custom properties control the default width and height of the dialog, respectively. On smaller screens, the dialog will shrink to fit the viewport.

```html {.example}
<quiet-dialog id="dialog__width" style="--width: 800px;">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Size
  </h3>

  <p>Lobortis feugiat vivamus at augue eget arcu dictum. Nulla at volutpat diam ut venenatis tellus in metus vulputate. Venenatis tellus in metus vulputate eu scelerisque felis.</p>
  <p>Et malesuada fames ac turpis egestas maecenas pharetra. Eu lobortis elementum nibh tellus molestie nunc. Nisl purus in mollis nunc sed id semper risus in. Ultricies mi quis hendrerit dolor magna eget. Venenatis cras sed felis eget velit aliquet sagittis.</p>

  <quiet-button slot="footer" data-dialog="close" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button data-dialog="open dialog__width">Show dialog</quiet-button>
```

### Scrolling dialogs

Dialogs with overflowing content will expand as the viewport allows before scrolling. By design, the header and footer will remain visible so users don't get confused and have an easy way to exit the dialog.

```html {.example}
<quiet-dialog id="dialog__scrolling" reset-scroll>
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    The Chronicles of Cats
  </h3>

  <p>In the cozy corner of a sunlit room, a mysterious tabby cat named Shadow prowls with silent grace. Her whiskers twitch as she surveys her domain, a master of stealth and elegance. The morning light catches her fur, creating a mesmerizing dance of golden highlights across her perfectly groomed coat.</p>
  <p>Nearby, a mischievous kitten named Pixel bounces from cushion to cushion, defying gravity with each leap. His tiny paws barely touch one surface before he's airborne again, a blur of energy and enthusiasm. The curtains flutter in his wake, marking his path of playful destruction.</p>
  <p>In the kitchen windowsill, wise old Mr. Whiskers observes the garden with half-closed eyes. Birds flit past, catching his attention, but he merely twitches an ear – he's long past his bird-chasing days. Instead, he focuses on the important task of soaking up the warm sunshine, occasionally stretching out one paw in perfect contentment.</p>
  <p>Luna, the elegant Siamese, practices her opera on the highest shelf of the bookcase. Her melodious complaints about dinner being four hours away echo through the house. She's convinced that her humans simply don't understand the concept of proper feeding schedules – clearly, anytime is dinner time.</p>
  <p>Under the dining room table, partners in crime Socks and Mittens plot their next kitchen raid. Their synchronized tail swishes betray their excitement as they plan the optimal route to the treats stored in the highest cabinet. Their previous attempts may have failed, but cats are nothing if not persistent.</p>
  <p>Out in the garden, adventurous explorer Captain Whiskers maps uncharted territory behind the rose bushes. Each rustle of leaves could hide a potential adversary – or worse, a cucumber. He approaches each step with military precision, his battle-scarred ear twitching at every sound.</p>
  <p>Back inside, the newest family member, a tiny rescue named Pixel, discovers the joy of cardboard boxes. The expensive cat bed lies ignored as she claims a simple shipping box as her castle. Her purrs of contentment vibrate through the cardboard walls of her newfound kingdom.</p>
  
  <quiet-button slot="footer" data-dialog="close" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button data-dialog="open dialog__scrolling">Show dialog</quiet-button>
```

:::info
By default, dialogs will maintain their scroll position when closed. Use the `reset-scroll` attribute to tell the dialog to reset scrolling each time it's closed.
:::

### Setting focus on open

To move focus to a specific form control when the dialog opens, add the [`autofocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus) attribute to it.

```html {.example}
<quiet-dialog id="dialog__focus">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Autofocus
  </h3>

  <quiet-text-field autofocus placeholder="Enter something"></quiet-text-field>

  <quiet-button slot="footer" data-dialog="close" variant="primary">Close</quiet-button>
</quiet-dialog>

<quiet-button data-dialog="open dialog__focus">Show dialog</quiet-button>
```

### Preventing the dialog from closing

You can stop the dialog from closing by preventing the `quiet-before-close` event. The dialog will briefly animate to draw the user's attention.

You can check `event.detail.source` to see which element triggered the dialog to close, such as a button. If the source is the dialog itself, you can assume that the user has pressed [[Escape]] or the dialog has been closed programmatically.

```html {.example}
<quiet-dialog id="dialog__prevent">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Try closing me
  </h3>

  <p>Only clicking the last button will close this dialog. Not even the <kbd>Escape</kbd> key will save you!</p>

  <quiet-button slot="footer" data-dialog="close">
    I won't close it
  </quiet-button>
  
  <quiet-button slot="footer" data-dialog="close" variant="primary">
    Only I will close it
  </quiet-button>
</quiet-dialog>

<quiet-button data-dialog="open dialog__prevent">Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('dialog__prevent');
  const closeButton = dialog.querySelector('quiet-button:last-of-type');

  dialog.addEventListener('quiet-before-close', event => {
    if (event.detail.source !== closeButton) {
      event.preventDefault();
    }
  });
</script>
```

:::info
For best results, avoid using this feature unless something severe will result from the user not making an explicit choice, e.g. data loss.
:::

### Styling dialogs

Dialogs come with a simple, minimal appearance. Feel free to customize them with your own styles. Here's a quick way to turn a dialog into an action sheet that works great on mobile devices.

```html {.example}
<quiet-dialog class="dialog__action-sheet" placement="bottom" id="dialog__styling">
  <quiet-button data-dialog="close" pill>Cancel</quiet-button>
  <quiet-button variant="destructive" pill data-dialog="close">Delete</quiet-button>
</quiet-dialog>

<quiet-button variant="destructive" data-dialog="open dialog__styling">Delete</quiet-button>

<style>
  quiet-dialog.dialog__action-sheet::part(dialog) {
    background: transparent;
    box-shadow: none;
  }
  
  quiet-dialog.dialog__action-sheet::part(body) {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    align-self: center;
    gap: 1rem;
}
</style>
```

<!-- For the examples -->
<style>
  quiet-dialog > p:last-of-type {
    margin-block-end: 0;
  }
</style>