---
title: Localization
description: Use Quiet in your native tongue.
layout: docs
---

Quiet components are fully localized using a tiny in-house library called [Squeak](https://github.com/quietui/squeak). Squeak was designed specifically for custom elements. It uses the standard `lang` and `dir` attributes to determine which language and directionality to use, making it easy to plug into existing apps.

## Registering translations

The default language is English (US), which doesn't need to be registered. Additional languages can be registered by importing the appropriate translation files.

```js
import '/dist/translations/es.js';
```

Translations are self-registering, so simply importing them as shown above makes them available to use in your app. Available translations currently include:

<div class="two-columns">

- `en` - English (default)
- `de` - German
- `ru` - Russian
- `es` - Spanish

</div>

### Dynamic registrations

To register translations as needed instead of all at once, use the [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) syntax. This is useful when you're supporting multiple languages and don't want to load the extra bytes upfront.

```js
await import('/dist/translations/es.js');
```

Once registered, components will automatically update and display the appropriate terms.

## Changing the language

Once you've imported a translation, you can set the desired language by adding the appropriate language code to the `<html>` element.

```html
<html lang="es">
  ...
</html>
```

You can change the language at any time and components will automatically update. Directionality is also supported by setting the `dir` attribute.

```html
<html lang="ar" dir="rtl">
  ...
</html>
```

### Using multiple languages

You can use multiple languages on the same page. Start by setting the default language on `<html>` as shown above, then add the appropriate `lang` and `dir` attributes to the components you want to localize.

```html
<html lang="en">
  ...
  <quiet-spinner lang="ru"></quiet-spinner>
</html>
```

For performance reasons, the attributes must be set directly on the components. Setting them on ancestor elements will have no effect, as the platform [doesn't provide an efficient way](https://github.com/whatwg/html/issues/7039) to access this information programmatically.

## Contributing new translations

New translations and improvements can be [submitted through GitHub](https://github.com/quietui/quiet/tree/main/src/translations). Note that translations are authored in TypeScript, not XLIFF. However, you might be pleasantly surprised at how simple the syntax is.

If you're not comfortable making a pull request, feel free to [ask for help](https://github.com/quietui/quiet/discussions).

## Creating a custom translation

You can register your own translation by creating a new JavaScript or TypeScript file as shown below. TypeScript is recommended, as translations are strongly typed to help you identify missing or outdated terms.

Refer to the [default translation](https://github.com/quietui/quiet/tree/main/src/translations/en.ts) to see all terms that need to be translated.

<quiet-tab-list label="Select your flavor">
<quiet-tab slot="tab" panel="ts">TypeScript</quiet-tab>
<quiet-tab slot="tab" panel="js">JavaScript</quiet-tab>
<quiet-tab-panel name="ts">

```ts
import { registerTranslation } from '/dist/utilities/localize.js';
import type { Translation } from '/dist/utilities/localize.js';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  // ...
};

registerTranslation(translation);

export default translation;
```

</quiet-tab-panel>
<quiet-tab-panel name="js">

```js
import { registerTranslation } from '/dist/utilities/localize.js';

const translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  // ...
};

registerTranslation(translation);

export default translation;
```

</quiet-tab-panel>
</quiet-tab-list>

