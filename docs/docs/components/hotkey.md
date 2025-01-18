---
title: Hotkey
layout: component
---

```html {.example}
<quiet-hotkey keys="$command K"></quiet-hotkey>
```

## Examples

### Basic usage

Set the `key` attribute to a string containing the space-separated keys you want to display in the hotkey. Do not include [delimiters](#customizing-the-delimiter), as they will be added automatically.

You can use any of the following keywords to show platform-specific keys.

| Keyword      | Mac | Others    |
|--------------|-----|-----------|
| `$command`   | ⌘   | Ctrl      |
| `$control`   | ⌃   | Ctrl      |
| `$option`    | ⌥   | Alt       |
| `$shift`     | ⇧   | Shift     |
| `$escape`    | Esc | Esc       |
| `$enter`     | ↩   | ↩         |
| `$backspace` | ⌫   | ⌫         |
| `$delete`    | ⌦   | ⌦         |
| `$tab`       | ⇥   | ⇥         |
| `$up`        | ↑   | ↑         |
| `$down`      | ↓   | ↓         |
| `$left`      | ←   | ←         |
| `$right`     | →   | →         |

```html {.example}
<quiet-hotkey keys="$option $command B"></quiet-hotkey>
```

:::info
Note that `$cmd` and `$option` map to "CTRL" and "ALT" on non-Mac platforms. This is a common practice, but not guaranteed for all keyboard shortcuts.
:::

### Platform-specific shortcuts

To show platform-specific hotkeys, use the `windows`, `mac`, and `linux` attributes. These will override the `keys` attribute, but only on the respective platforms.

```html {.example}
<quiet-hotkey
  keys="$command $shift A"
  mac="$shift $command A"
></quiet-hotkey>
```

### Adding a label

By default, screen readers will announce the hotkey text as-is. To set a custom label for assistive devices, use the `label` attribute.

```html {.example}
<quiet-hotkey
  label="Press command or control + Q to quit"
  keys="$command Q"
></quiet-hotkey>
```

### Setting the platform

Use the `platform` attribute to show hotkeys for a specific platform, regardless of the user's operating system. The default value is `auto`, which will attempt to automatically detect the user's operating system.

```html {.example}
<div id="hotkeys__platform">
  <p>
    <quiet-hotkey 
      platform="mac"
      mac="$shift $command M"
      windows="$command $shift W"
      linux="$command $shift L"
    ></quiet-hotkey>
  </p>

  <quiet-radio label="Platform" value="mac">
    <quiet-radio-item value="mac">Mac</quiet-radio-item>
    <quiet-radio-item value="windows">Windows</quiet-radio-item>
    <quiet-radio-item value="linux">Linux</quiet-radio-item>
  </quiet-radio>
</div>

<script>
  const container = document.getElementById('hotkeys__platform');
  const hotkey = container.querySelector('quiet-hotkey');
  const radio = container.querySelector('quiet-radio');

  // Update the platform
  radio.addEventListener('quiet-input', () => {
    hotkey.platform = radio.value;
  });
</script>
```

### Customizing the delimiter

By default, the delimiter is automatically determined by the platform (no character for Mac and "+" for others). To change it, set the `delimiter` attribute to the character you want to insert between each key.

```html {.example}
<quiet-hotkey 
  keys="$command $shift A" 
  delimiter="·"
></quiet-hotkey>
```

### Changing the appearance

By default, the keyboard hotkey is styled with `<kbd>` styles. Set the `appearance` attribute to `unstyled` to make it look like plain text. To target individual keys, use the `key` and `keyword` parts.

```html {.example}
Press 
<quiet-hotkey 
  keys="$command K"
  appearance="unstyled"
></quiet-hotkey>
to search.
```

### Styling keys and keywords

Use the `key` and `keyword` parts to change the styles of individual characters.

```html {.example}
Press 
<quiet-hotkey 
  keys="$command K"
  id="hotkeys__styling"
></quiet-hotkey>
to search.

<style>
  quiet-hotkey#hotkeys__styling {
    &::part(keyword) {
      color: dodgerblue;
    }

    &::part(key) {
      color: deeppink;
    }
  }
</style>
```