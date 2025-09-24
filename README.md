# Quiet UI

![Quiet UI logo](https://pbs.twimg.com/profile_banners/1705198841094356992/1697645956/1500x500)

Quiet is a [source-available](https://quietui.org/license) user interface library for the modern Web. It features dozens of accessible, performant, and interoperable components along with an optional CSS reset to streamline development of websites and apps.

You might be curious to learn that Quiet's components aren't built with React, Vue, or any other framework. They're custom HTML elements, or [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), which means you can use them in plain ol' HTML pages as well as your favorite frameworks.

**There are two primary packages for this library:**

- [`@quietui/quiet`](https://www.npmjs.com/package/@quietui/quiet) - Use with frameworks and bundlers
- [`@quietui/quiet-browser`](https://www.npmjs.com/package/@quietui/quiet-browser) - Use directly in the browser and on CDNs

## What's in the box?

- 🧰 A collection of high quality components for building beautiful, accessible, and consistent user interfaces
- 🚀 An [optional] opinionated CSS reset to kick off new projects with beautiful base styles
- 🎨 Extreme customizability using plain ol' CSS
- 🐭 A built-in autoloader that detects components in your HTML — even ones you add dynamically — and loads them on the fly!

## Where can I…?

- [Get started using Quiet UI](https://quietui.org/)
- [Buy a commercial license](https://quietui.org/license)
- [Request a feature](https://github.com/quietui/quiet/discussions/categories/feature-requests)
- [Report a bug](https://github.com/quietui/quiet/issues/new/choose)
- [Ask for help](https://github.com/quietui/quiet/discussions/categories/help-support)
- [Visit the community forum](https://github.com/quietui/quiet/discussions)
- [Star the project on GitHub](https://github.com/quietui/quiet/stargazers)
- [Follow the project on Bluesky](https://bsky.app/profile/quietui.org)
- [Follow the project on Mastodon](https://mastodon.social/@quietui)
- [Follow the project on X](https://x.com/quiet_ui)

## Developer instructions

To launch the development server, use the following commands.

```sh
npm i
npm run start
```

This will launch a browser showing the docs. The browser will reload as you make changes to the project. When you're ready to create a production build, use the following command.

```sh
npm run build
```

The `dist` folder will contain the files you want.

There are a number of commands you can use to lint and test the library. For a full list of them, run the following command.

```sh
npm run
```
