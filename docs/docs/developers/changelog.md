---
title: Changelog
description: Every release ships with a changelog entry that shows what's new.
layout: docs
---

This page describes the changes that happen throughout the library from version to version. It's important to note that Quiet is not [anchored to a major version](https://www.abeautifulsite.net/posts/anchoring-software-to-major-versions/). Breaking changes will be made when necessary and a new major version will be released to reflect them. When breaking changes do happen, they'll be clearly marked with [breaking] so you can upgrade with minimal friction. 

Components marked [stable] are well-tested, ready for production, and less likely to see breaking changes. Components marked [experimental] are offered as explorations to gather feedback. Experimental components are less stable and may receive breaking changes or be removed from the library without a major version bump.

---

## Releases

### 1.3.0

<small>October 16, 2025</small>

- Quiet UI is now open source and available under the MIT License

### 1.2.0

<small>October 12, 2025</small>

- Added support for link buttons using `<a class="quiet-button">` in Restyle
- Added missing border and background styles for `<iframe>` in Restyle
- Added the `pie` appearance to `<quiet-progress>`
- Fixed a bug in `<quiet-slider>` that allowed the tooltip position to get out of sync [issue:12]
- Fixed initial focus when `<quiet-dialog>` opens [issue:16]
- Fixed a bug in `<quiet-popover>` that caused clicks inside the popover to close it when used inside a shadow root [issue:17]

### 1.1.1

<small>September 25, 2025</small>

- Fixed the default value of `--quiet-form-control-font-size-xl` so it's not a fractional font size
- Fixed the tag color in `<quiet-combobox>` so they're visible in the filled appearance
- Fixed a bug in `<quiet-combobox>` that allowed the browser's autocomplete menu to appear
- Fixed CodePen demos so they include the theme, Restyle, utilities, and dark mode
- Fixed a bug in Restyle where text in the `<summary>` element would overlap the chevron

### 1.1.0

<small>September 22, 2025</small>

- Added the `<quiet-random-content>` utility component
- Added styles for `<q>` and `<cite>` elements in Restyle
- Improved `<summary>` styles so the hit area extends the full width of the container

### 1.0.1 – 1.0.3

<small>September 20, 2025</small>

- Fixed a bug in the unbundled distribution that caused some files to not be included
- Removed splitting from the browser distribution
- Fixed publishing goofs

### 1.0.0

<small>September 20, 2025</small>

This is the first public release of Quiet UI, which includes:

- More than 80 framework agnostic components
- A modern theme with dark mode
- An optional CSS reset
- Helpful CSS utilities
- Ready-to-use AI component intelligence
- A focus on accessibility, longevity, performance, and simplicity

<small><em><a href="https://x.com/pants/status/1912832380794003928">The next brushstroke could change everything.</a></em></small>
