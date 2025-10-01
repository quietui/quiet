---
title: Changelog
description: Every release ships with a changelog entry that shows what's new.
layout: docs
---

This page describes the changes that happen throughout the library from version to version. It's important to note that Quiet is not [anchored to a major version](https://www.abeautifulsite.net/posts/anchoring-software-to-major-versions/). Breaking changes will be made when necessary and a new major version will be released to reflect them. When breaking changes do happen, they'll be clearly marked with [breaking] so you can upgrade with minimal friction. 

Components marked [stable] are well-tested, ready for production, and less likely to see breaking changes. Components marked [experimental] are offered as explorations to gather feedback. Experimental components are less stable and may receive breaking changes or be removed from the library without a major version bump.

## Release alerts {.quiet-vh}

<form 
  class="js-cm-form whiskers-email" 
  id="subForm"
  action="https://www.createsend.com/t/subscribeerror?description=" 
  method="post" 
  data-id="A61C50BEC994754B1D79C5819EC1255C1B31244D333BF1BA7C7110C86FE7CF7856BEBB1CE5FB5F305E491256458DDB0D84C7F6E7E798917706F78CD30AA744D5"
>
  <img src="/assets/images/whiskers/with-sign.svg" alt="Whiskers holding a sign in front of himself">
  <div class="whiskers-email-controls">
    <!-- cspell:disable -->
    <quiet-text-field
      id="fieldEmail"
      class="quiet-light js-cm-email-input qa-input-email"
      name="cm-tydiudd-tydiudd" 
      type="email" 
      label="Email"
      maxlength="200"
      placeholder="you@example.com" 
      appearance="unstyled"
      autocomplete="Email"
      required
    ></quiet-text-field>    
    <!-- cspell:enable -->
    <quiet-button icon-label="Sign up" type="submit" variant="primary" size="sm">
      <quiet-icon name="send"></quiet-icon>
    </quiet-button>
  </div>
  <small>
    <strong>Get notified when new releases drop!</strong><br>
    No spam. Easy unsubscribe.
  </small>
</form>
<script type="text/javascript" src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js"></script>

---

## Releases

### Unreleased

- Added support for link buttons using `<a class="quiet-button">` to Restyle

### 1.1.1 🐜

- Fixed the default value of `--quiet-form-control-font-size-xl` so it's not a fractional font size
- Fixed the tag color in `<quiet-combobox>` so they're visible in the filled appearance
- Fixed a bug in `<quiet-combobox>` that allowed the browser's autocomplete menu to appear
- Fixed CodePen demos so they include the theme, Restyle, utilities, and dark mode
- Fixed a bug in Restyle where text in the `<summary>` element would overlap the chevron

### 1.1.0 🎲

- Added the `<quiet-random-content>` utility component
- Added styles for `<q>` and `<cite>` elements in Restyle
- Improved `<summary>` styles so the hit area extends the full width of the container

### 1.0.1 – 1.0.3 🔨

- Fixed a bug in the unbundled distribution that caused some files to not be included
- Removed splitting from the browser distribution

### 1.0.0 🧀

<small>August 1, 2025</small>

This is the first public release of Quiet UI, which includes:

- More than 80 framework agnostic components
- A modern theme with dark mode
- An optional CSS reset
- Helpful CSS utilities
- Ready-to-use AI component intelligence
- A focus on accessibility, longevity, performance, and simplicity

<small><em><a href="https://x.com/pants/status/1912832380794003928">The next brushstroke could change everything.</a></em></small>
