---
title: Running the Project
description:
layout: docs
---

To set up a local development environment, [fork the repo on GitHub](https://github.com/quietui/quiet/fork), clone it locally, and install its dependencies.

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/quiet
cd quiet
npm install
```

Once you've cloned the repo, run the following command to launch the development server.

```sh
npm run start
```

This will launch a browser showing the docs. The browser will reload as you make changes to the project.

## Production Builds

When you're ready to create a production build, use the following command.

```sh
npm run build
```

The `dist` folder will contain the files you want.

There are a number of commands you can use to lint and test the library. For a full list of them, run the following command.

```sh
npm run
```

## Testing

TODO
