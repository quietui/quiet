---
title: Dialog
layout: component
---

```html {.example}
<quiet-dialog with-header with-footer id="overview__dialog">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Lorem ipsum
  </h3>

  Lorem dolor sed viverra ipsum. Nisl rhoncus mattis rhoncus urna neque viverra justo nec.
  
  <quiet-button slot="footer" data-dialog="dismiss" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button>Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('overview__dialog');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('quiet-click', () => {
    dialog.open = true;
  });
</script>
```

## Examples

### With header

Add the `with-header` attribute and place elements into the `header` slot to add content at the start of the dialog.

```html {.example}
<quiet-dialog with-header id="header__dialog">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Lorem ipsum
  </h3>

  Lorem dolor sed viverra ipsum. Nisl rhoncus mattis rhoncus urna neque viverra justo nec.
</quiet-dialog>

<quiet-button>Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('header__dialog');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('quiet-click', () => {
    dialog.open = true;
  });
</script>
```

### With footer

Add the `with-footer` attribute and place elements into the `footer` slot to add actions or other supplemental information at the end of the dialog.

```html {.example}
<quiet-dialog with-footer id="footer__dialog">
  Lorem dolor sed viverra ipsum. Nisl rhoncus mattis rhoncus urna neque viverra justo nec.

  <quiet-button slot="footer" data-dialog="dismiss" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button>Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('footer__dialog');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('quiet-click', () => {
    dialog.open = true;
  });
</script>
```

### Dismissing the dialog

You can dismiss the dialog programmatically by setting the `open` property to `false`. However, it's often convenient to have a button close the dialog without additional scripting. In that case, you can add the `data-dialog="dismiss"` attribute to any button within the dialog.

```html {.example}
<quiet-dialog with-header with-footer id="dismissing__dialog">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Dismiss me
  </h3>

  The button below has <code>data-dialog="dismiss"</code> so it will close when you click on it.

  <quiet-button slot="footer" data-dialog="dismiss" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button>Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('dismissing__dialog');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('quiet-click', () => {
    dialog.open = true;
  });
</script>
``` 

### Light dismissal

When clicking outside of a dialog, it will normally pulse briefly to draw the user's attention. If you want these clicks to dismiss the dialog instead, use the `light-dismiss` attribute.

```html {.example}
<quiet-dialog light-dismiss with-header with-footer id="light__dialog">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Lorem ipsum
  </h3>

  Clicking outside the dialog will cause it to close.

  <quiet-button slot="footer" data-dialog="dismiss" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button>Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('light__dialog');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('quiet-click', () => {
    dialog.open = true;
  });
</script>
``` 

### Customizing actions

By default, a close button is provided as a single action in the dialog's header. You can add your own header actions by slotting text buttons into the `actions` slot. Note that adding your own actions will remove the default close button.

```html {.example}
<quiet-dialog with-header with-footer id="customizing__dialog">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Lorem ipsum
  </h3>

  <quiet-button slot="actions" variant="text" icon-label="Settings">
    <quiet-icon name="settings"></quiet-icon>
  </quiet-button>

  <quiet-button slot="actions" variant="text" icon-label="Open in a new window">
    <quiet-icon name="external-link"></quiet-icon>
  </quiet-button>

  Lorem dolor sed viverra ipsum. Nisl rhoncus mattis rhoncus urna neque viverra justo nec.

  <quiet-button slot="footer" data-dialog="dismiss" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button>Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('customizing__dialog');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('quiet-click', () => {
    dialog.open = true;
  });
</script>
```

:::info
The `actions` slot is only available when the header is enabled using the `with-header` attribute.
:::

### Changing the placement

By default, dialogs appear in the center of the screen. To make the dialog slide in from the side of the screen like a drawer, set the `placement` attribute to `start`, `end`, `top`, or `bottom`.

```html {.example}
<quiet-dialog with-header with-footer id="placement__dialog">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Lorem ipsum
  </h3>

  Nec nam aliquam sem et tortor consequat id porta nibh. Amet risus nullam eget felis eget nunc.

  <quiet-button slot="footer" data-dialog="dismiss" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<div>
  <quiet-button data-placement="start">Start</quiet-button>
  <quiet-button data-placement="end">End</quiet-button>
  <quiet-button data-placement="top">Top</quiet-button>
  <quiet-button data-placement="bottom">Bottom</quiet-button>
</div>

<script>
  const dialog = document.getElementById('placement__dialog');
  const container = dialog.nextElementSibling;

  container.addEventListener('quiet-click', event => {
    dialog.placement = event.target.getAttribute('data-placement');
    dialog.open = true;
  });
</script>
```

:::info
The `--width` custom property has no effect on dialogs with `top` and `bottom` placements. Similarly, the `--height` custom property has no effect on dialogs with `start` and `end` placements.
:::

### Changing the size

The `--width` and `--height` custom properties control the default width and height of the dialog, respectively. On smaller screens, the dialog will shrink to fit the viewport.

```html {.example}
<quiet-dialog id="width__dialog" with-header with-footer style="--width: 800px;">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Lorem ipsum
  </h3>

  <p>Lobortis feugiat vivamus at augue eget arcu dictum. Nulla at volutpat diam ut venenatis tellus in metus vulputate. Venenatis tellus in metus vulputate eu scelerisque felis.</p>
  <p style="margin-block-end: 0;">Et malesuada fames ac turpis egestas maecenas pharetra. Eu lobortis elementum nibh tellus molestie nunc. Nisl purus in mollis nunc sed id semper risus in. Ultricies mi quis hendrerit dolor magna eget. Venenatis cras sed felis eget velit aliquet sagittis.</p>

  <quiet-button slot="footer" data-dialog="dismiss" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button>Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('width__dialog');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('quiet-click', () => {
    dialog.open = true;
  });
</script>
```

### Scrolling dialogs

Dialogs with overflowing content will expand as the viewport allows before scrolling. By design, the header and footer will remain visible so users don't get confused and have an easy way to exit the dialog.

```html {.example}
<quiet-dialog id="scrolling__dialog" with-header with-footer>
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Lorem ipsum
  </h3>

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue ut lectus arcu bibendum at varius. Mattis molestie a iaculis at erat pellentesque. At in tellus integer feugiat scelerisque varius. Donec pretium vulputate sapien nec sagittis aliquam. Non consectetur a erat nam at lectus urna duis convallis. Molestie at elementum eu facilisis sed odio morbi quis. Libero id faucibus nisl tincidunt eget nullam non nisi. Sed velit dignissim sodales ut eu sem integer vitae. Suspendisse sed nisi lacus sed viverra.</p>
  <p>Nec nam aliquam sem et tortor consequat id porta nibh. Amet risus nullam eget felis eget nunc. At urna condimentum mattis pellentesque id nibh tortor. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et. Ipsum faucibus vitae aliquet nec ullamcorper. Felis eget velit aliquet sagittis id consectetur purus. Ac turpis egestas maecenas pharetra convallis posuere morbi. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Posuere sollicitudin aliquam ultrices sagittis orci. Tincidunt augue interdum velit euismod. Aliquet enim tortor at auctor urna nunc. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Massa enim nec dui nunc mattis enim ut. At urna condimentum mattis pellentesque id. Feugiat in ante metus dictum at tempor commodo. Ac turpis egestas integer eget aliquet nibh. Odio euismod lacinia at quis risus. Ut sem viverra aliquet eget.</p>
  <p>Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Ac felis donec et odio. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Gravida quis blandit turpis cursus. Vulputate ut pharetra sit amet aliquam id diam maecenas. Augue ut lectus arcu bibendum at varius. Posuere morbi leo urna molestie at. Ut porttitor leo a diam. Id aliquet lectus proin nibh nisl condimentum id. Nunc mattis enim ut tellus. Fermentum leo vel orci porta. Sit amet nisl purus in mollis nunc. Quis eleifend quam adipiscing vitae.</p>
  <p>Faucibus pulvinar elementum integer enim. Bibendum at varius vel pharetra vel turpis nunc eget. Amet est placerat in egestas erat imperdiet sed. Eu non diam phasellus vestibulum lorem sed risus ultricies tristique. Ut tellus elementum sagittis vitae et leo duis. Amet mattis vulputate enim nulla aliquet porttitor lacus. Vitae et leo duis ut diam quam. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat. Et malesuada fames ac turpis egestas maecenas pharetra. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit.</p>
  <p>Sapien et ligula ullamcorper malesuada proin. Nulla facilisi cras fermentum odio eu. Lacus suspendisse faucibus interdum posuere lorem. Ac turpis egestas integer eget aliquet. Id nibh tortor id aliquet. Non quam lacus suspendisse faucibus interdum posuere. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Tellus elementum sagittis vitae et leo duis ut diam quam. Lobortis scelerisque fermentum dui faucibus in ornare quam. Et malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt.</p>
  <p>In ante metus dictum at. Eget sit amet tellus cras adipiscing. Hendrerit gravida rutrum quisque non. Mattis pellentesque id nibh tortor id aliquet lectus. Velit ut tortor pretium viverra. Ut tortor pretium viverra suspendisse potenti. Urna molestie at elementum eu. Vel risus commodo viverra maecenas accumsan lacus vel. Eget dolor morbi non arcu risus quis varius quam quisque. Orci porta non pulvinar neque laoreet suspendisse. Eros donec ac odio tempor orci. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Eget gravida cum sociis natoque penatibus et magnis. Non blandit massa enim nec dui nunc mattis enim.</p>
  <p style="margin-block-end: 0;">In nibh mauris cursus mattis molestie. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Maecenas pharetra convallis posuere morbi leo urna molestie at. Nunc aliquet bibendum enim facilisis gravida neque convallis. In nulla posuere sollicitudin aliquam ultrices. At lectus urna duis convallis convallis tellus. Sapien nec sagittis aliquam malesuada bibendum. In massa tempor nec feugiat nisl pretium fusce. Enim sit amet venenatis urna cursus eget nunc scelerisque viverra. Venenatis cras sed felis eget velit aliquet sagittis. Ultrices neque ornare aenean euismod. Malesuada nunc vel risus commodo viverra maecenas accumsan. Donec pretium vulputate sapien nec. Massa ultricies mi quis hendrerit dolor magna eget est.</p>

  <quiet-button slot="footer" data-dialog="dismiss" variant="primary">
    Close
  </quiet-button>
</quiet-dialog>

<quiet-button>Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('scrolling__dialog');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('quiet-click', () => {
    dialog.open = true;
  });
</script>
```

### Setting focus on open

To move focus to a specific form control when the dialog opens, use the [`autofocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus) global attribute.

```html {.example}
<quiet-dialog id="focus__dialog" with-header with-footer>
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Lorem ipsum
  </h3>

  <quiet-text-field autofocus placeholder="Enter something"></quiet-text-field>

  <quiet-button slot="footer" data-dialog="dismiss" variant="primary">Close</quiet-button>
</quiet-dialog>

<quiet-button>Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('focus__dialog');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('quiet-click', () => {
    dialog.open = true;
  });

  dialog.addEventListener('quiet-visible', () => {
    dialog.querySelector('input').focus();
  });
</script>
```

### Preventing the dialog from closing

You can stop the dialog from closing by preventing the `quiet-close` event. The dialog will briefly animate to draw the user's attention.

You can check `event.detail.source` to see which element triggered the dialog to close, such as a button. If the source is the dialog itself, you can assume that the user has pressed [[Escape]] or the dialog has been closed programmatically.

```html {.example}
<quiet-dialog with-header with-footer id="prevent__dialog">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">
    Try closing me
  </h3>

  Only clicking the last button will close this dialog. Not even the <kbd>Escape</kbd> key will save you!

  <quiet-button slot="footer" data-dialog="dismiss">
    I won't close it
  </quiet-button>
  
  <quiet-button slot="footer" data-dialog="dismiss" variant="primary">
    Only I will close it
  </quiet-button>
</quiet-dialog>

<quiet-button>Show dialog</quiet-button>

<script>
  const dialog = document.getElementById('prevent__dialog');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('quiet-button:last-of-type');

  openButton.addEventListener('quiet-click', () => {
    dialog.open = true;
  });

  dialog.addEventListener('quiet-close', event => {
    if (event.detail.source !== closeButton) {
      event.preventDefault();
    }
  });
</script>
```

:::info
For best results, avoid using this feature unless something severe will result from the user not making an explicit choice, e.g. data loss.
:::
