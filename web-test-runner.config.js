import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { globbySync } from 'globby';
import os from 'os';

// Only run one browser per core
const cores = os.availableParallelism?.() ?? os.cpus.length;
const browsers = ['chromium', 'firefox', 'webkit'];
const concurrentBrowsers = Math.min(browsers.length, cores);
const concurrency = Math.max(Math.floor(cores / browsers.length), 1);

// https://modern-web.dev/docs/test-runner/cli-and-configuration/
export default {
  rootDir: '.',
  files: 'src/**/*.test.ts', // "default" group
  concurrency,
  concurrentBrowsers,
  nodeResolve: {
    exportConditions: ['production', 'default']
  },
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1
    }
  },
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'es2020'
    })
  ],
  browsers: browsers.map(product => playwrightLauncher({ product })),
  testRunnerHtml: testFramework =>
    `
<!DOCTYPE html>
<html lang="en-US">
  <head></head>
  <body>
    <link rel="stylesheet" href="dist/quiet.css">
    <script>
      window.process = {env: { NODE_ENV: "production" }}
    </script>
    <script type="module" src="${testFramework}"></script>
  </body>
</html>
  `.trim(),
  // Create a named group for every test file to enable running single tests. If a test file is `text-field.test.ts`
  // then you can run `npm run test -- --group text-field` to run only the text field tests.
  groups: globbySync('src/**/*.test.ts').map(path => {
    const groupName = path.match(/^.*\/(?<fileName>.*)\.test\.ts/).groups.fileName;
    return {
      name: groupName,
      files: path
    };
  })
};
