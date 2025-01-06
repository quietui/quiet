---
title: Keyboard Shortcut
layout: component
---

```html {.example}
<quiet-keyboard-shortcut keys="$command K"></quiet-keyboard-shortcut>
```

## Examples

### Basic usage

Set the `key` attribute to a string containing the space-separated keys you want to display in the shortcut. Do not include [delimiters](#customizing-the-delimiter), as they will be added automatically.

You can use any of the following keywords to show platform-specific keys.

| Keyword      | Mac | Others    |
|--------------|-----|-----------|
| `$command`   | ⌘   | CTRL      |
| `$control`   | ⌃   | CTRL      |
| `$option`    | ⌥   | ALT       |
| `$shift`     | ⇧   | SHIFT     |
| `$escape`    | ⎋   | ESC       |
| `$enter`     | ↩   | ↩         |
| `$backspace` | ⌫   | BACKSPACE |
| `$delete`    | ⌦   | DEL       |
| `$tab`       | ⇥   | ⇥         |
| `$up`        | ↑   | ↑         |
| `$down`      | ↓   | ↓         |
| `$left`      | ←   | ←         |
| `$right`     | →   | →         |

```html {.example}
<quiet-keyboard-shortcut keys="$option $command B"></quiet-keyboard-shortcut>
```

:::info
Note that `$cmd` and `$option` map to "CTRL" and "ALT" on non-Mac platforms. This is a common practice, but not guaranteed for all shortcuts.
:::

### Platform-specific shortcuts

To show platform-specific shortcuts, use the `windows`, `mac`, and `linux` attributes. These will override the `key` attribute, but only on the respective platforms.

```html {.example}
<quiet-keyboard-shortcut
  keys="$command $shift A"
  mac="$shift $command A"
></quiet-keyboard-shortcut>
```

### Adding a label

By default, screen readers will announce the shortcut text as-is. To set a custom label for assistive devices, use the `label` attribute.

```html {.example}
<quiet-keyboard-shortcut
  label="Press command or control + Q to quit"
  keys="$command Q"
></quiet-keyboard-shortcut>
```

### Setting the platform

Use the `platform` attribute to show shortcuts for a specific platform, regardless of the user's operating system. The default value is `auto`, which will attempt to automatically detect the user's operating system.

```html {.example}
<div id="keyboard-shortcut__platform">
  <p>
    <quiet-keyboard-shortcut 
      platform="mac"
      mac="$shift $command M"
      windows="$command $shift W"
      linux="$command $shift L"
    ></quiet-keyboard-shortcut>
  </p>

  <quiet-radio label="Platform" value="mac">
    <quiet-radio-item value="mac">Mac</quiet-radio-item>
    <quiet-radio-item value="windows">Windows</quiet-radio-item>
    <quiet-radio-item value="linux">Linux</quiet-radio-item>
  </quiet-radio>
</div>

<script>
  const container = document.getElementById('keyboard-shortcut__platform');
  const shortcut = container.querySelector('quiet-keyboard-shortcut');
  const radio = container.querySelector('quiet-radio');

  // Update the platform
  radio.addEventListener('quiet-input', () => {
    shortcut.platform = radio.value;
  });
</script>
```

### Customizing the delimiter

By default, the delimiter is automatically determined by the platform (no character for Mac and "+" for others). To change it, set the `delimiter` attribute to the character you want to insert between each key.

```html {.example}
<quiet-keyboard-shortcut 
  keys="$command $shift A" 
  delimiter="·"
></quiet-keyboard-shortcut>
```

### Changing the appearance

By default, the keyboard shortcut is styled with `<kbd>` styles. Set the `appearance` attribute to `unstyled` to make it look like plain text.

```html {.example}
Press 
<quiet-keyboard-shortcut 
  keys="$command K"
  appearance="unstyled"
></quiet-keyboard-shortcut>
to search.
```
