---
title: Running the Project
description: Learn how to develop and build the project locally.
layout: docs
---

To set up a local development environment, [fork the repo on GitHub](https://github.com/quietui/quiet/fork), clone it locally, and install its dependencies.

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/quiet
cd quiet
npm install
```

:::warn
Please read the [contribution guidelines](/docs/developers/contributing) before submitting a pull request.
:::

## Starting the dev server

Once you've cloned the repo, run the following command to launch the development server.

```sh
npm start
```

This will open a browser showing the docs. As you work, the browser will automatically reload.

## Building for production

When you're ready to create a production build, use the following command.

```sh
npm run build
```

The `dist` folder will contain the files you want.

There are a number of commands you can use to lint and test the library. For a full list of them, use `npm run`.

## Running tests

Quiet uses [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) to test in actual browsers. Once installed and built, the following command will launch the test runner.

```sh
npm run test
```

If you want to test a single component, pass the tag name without the `quiet-` prefix like this.

```sh
npm run test:component button
```

<img class="whiskers-center" src="/assets/images/whiskers/with-book.svg" alt="Whiskers the mouse doing a cartwheel">
