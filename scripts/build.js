import browserSync from 'browser-sync';
import chalk from 'chalk';
import { execSync } from 'child_process';
import esbuild from 'esbuild';
import { mkdir, readFile, rm } from 'fs/promises';
import getPort, { portNumbers } from 'get-port';
import { globby } from 'globby';
import ora from 'ora';
import { dirname, join, relative } from 'path';
import process from 'process';
import copy from 'recursive-copy';
import { fileURLToPath } from 'url';
import { distDir, docsDir, rootDir, runScript, siteDir, SkipQueue } from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const changeQueue = new SkipQueue(500);
const isBrowserBuild = process.argv.includes('--browser');
const isDeveloping = process.argv.includes('--develop');
const iconDir = join(distDir, 'assets/icons');
const spinner = ora({ text: 'Quiet UI', color: 'magenta' }).start();
const packageData = JSON.parse(await readFile(join(rootDir, 'package.json'), 'utf-8'));
const version = packageData.version;
const currentYear = new Date().getFullYear();
let buildContext;

/**
 * Runs the full build.
 */
async function buildAll() {
  const start = Date.now();

  try {
    spinner.info(`Quiet UI v${version}`);

    await cleanup();
    await generateManifest();
    await generateIcons();
    await generateTypes();
    await generateLlmData();
    await generateStyles();
    await generateBuild();
    await generateDocs();

    const time = (Date.now() - start) / 1000 + 's';
    spinner.succeed(`The build is complete ${chalk.gray(`(finished in ${time})`)}`);
  } catch (err) {
    spinner.fail();
    console.log(chalk.red(`\n${err}`));
  }
}

/** Empties the dist directory. */
async function cleanup() {
  spinner.start('Cleaning up dist');

  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  spinner.succeed();
}

/**
 * Analyzes components and generates the custom elements manifest file.
 */
function generateManifest() {
  spinner.start('Generating CEM');

  try {
    execSync('npx cem analyze --config "custom-elements-manifest.js"');
  } catch (error) {
    console.error(`\n\n${error.message}`);
  }

  spinner.succeed();

  return Promise.resolve();
}

/**
 * Downloads and copies icons to the assets directory.
 */
async function generateIcons() {
  const dirToCopy = join(rootDir, 'node_modules/@tabler/icons/icons');
  const licenseToCopy = join(rootDir, 'node_modules/@tabler/icons/LICENSE');
  const iconsJson = join(rootDir, 'node_modules/@tabler/icons/icons.json');

  spinner.start('Packaging icons');

  await rm(iconDir, { recursive: true, force: true });
  await mkdir(iconDir, { recursive: true });
  await copy(dirToCopy, iconDir);
  await copy(licenseToCopy, join(iconDir, 'LICENSE'));
  await copy(iconsJson, join(distDir, 'icons.json'));

  spinner.succeed();

  return Promise.resolve();
}

/**
 * Copies theme stylesheets to the dist.
 */
async function generateStyles() {
  spinner.start('Copying stylesheets');

  await copy(join(rootDir, 'src/themes'), join(distDir, 'themes'), { overwrite: true });

  spinner.succeed();

  return Promise.resolve();
}

/**
 * Runs TypeScript to generate types.
 */
function generateTypes() {
  spinner.start('Running the TypeScript compiler');

  try {
    execSync(`npx tsc --project ./tsconfig.prod.json --outdir "${distDir}"`);
  } catch (error) {
    // Report the error, but don't break the build
    spinner.fail(`TypeScript reported problems:\n\n${chalk.red(error.stdout.toString().trim())}\n`);
  }

  spinner.succeed();

  return Promise.resolve();
}

/**
 * Runs the script to generate training data for LLMs.
 */
function generateLlmData() {
  spinner.start('Generating llms.txt');

  try {
    execSync(`node ./scripts/llms.js`);
  } catch (error) {
    // Report the error, but don't break the build
    spinner.fail(`Error:\n\n${chalk.red(error.stdout.toString().trim())}\n`);
  }

  spinner.succeed();

  return Promise.resolve();
}

/**
 * Runs esbuild to generate the final dist.
 */
async function generateBuild() {
  spinner.start('Bundling with esbuild');

  const config = {
    format: 'esm',
    target: 'es2020',
    logLevel: 'silent',
    entryPoints: await globby('./src/**/*.ts', {
      ignore: ['**/*.test.ts']
    }),
    outdir: distDir,
    chunkNames: 'chunks/[name].[hash]',
    conditions: isDeveloping ? ['development'] : undefined,
    define: {
      'process.env.NODE_ENV': '"production"' // required by Floating UI
    },
    bundle: isBrowserBuild,
    banner: {
      js: `/*! Required Notice: Copyright ${currentYear} A Beautiful Site, LLC - https://quietui.org */`
    },
    legalComments: 'none',
    splitting: isBrowserBuild
  };

  try {
    if (isDeveloping) {
      // Incremental builds for dev
      buildContext = await esbuild.context(config);
      await buildContext.rebuild();
    } else {
      // One-time build for production
      await esbuild.build(config);
    }
  } catch (error) {
    // Report the error, but don't break the build
    spinner.fail(`esbuild reported problems:\n\n${chalk.red(error)}\n`);
    return;
  }

  spinner.succeed();
}

/**
 * Incrementally rebuilds the source files. Must be called only after `generateBuild()` has been called.
 */
async function regenerateBuild() {
  try {
    spinner.start('Re-bundling with esbuild');
    await buildContext.rebuild();
  } catch (error) {
    spinner.fail();
    console.log(chalk.red(`\n${error}`));
  }

  spinner.succeed();
}

/**
 * Generates the documentation site.
 */
async function generateDocs() {
  spinner.start('Writing the docs');

  // 11ty
  const output = (await runScript(join(__dirname, 'docs.js'), isDeveloping ? ['--develop'] : undefined))
    // Cleanup the output
    .replace('[11ty]', '')
    .replace(' seconds', 's')
    .replace(/\(.*?\)/, '')
    .toLowerCase()
    .trim();

  // Copy assets
  await copy(join(docsDir, 'assets'), join(siteDir, 'assets'), { overwrite: true });

  // Copy dist (production only)
  if (!isDeveloping) {
    await copy(distDir, join(siteDir, 'dist'));
  }

  spinner.succeed(`Writing the docs ${chalk.gray(`(${output}`)})`);
}

// Initial build
await buildAll();

if (!isDeveloping) {
  console.log(); // just a newline for readability
}

// Launch the dev server
if (isDeveloping) {
  spinner.start('Launching the dev server');

  const bs = browserSync.create();
  const port = await getPort({ port: portNumbers(4000, 4999) });
  const url = `http://localhost:${port}/`;
  const reload = () => {
    spinner.start('Reloading browser');
    bs.reload();
    spinner.succeed();
  };

  // Launch browser sync
  bs.init(
    {
      startPath: '/',
      port,
      logLevel: 'silent',
      logPrefix: '[quietui]',
      logFileChanges: true,
      notify: false,
      single: false,
      ghostMode: false,
      server: {
        baseDir: siteDir,
        routes: {
          '/dist': './dist'
        }
      },
      callbacks: {
        ready: (_err, instance) => {
          // 404 errors
          instance.addMiddleware('*', async (req, res) => {
            if (req.url.toLowerCase().endsWith('.svg')) {
              // Make sure SVGs error out in dev instead of serve the 404 page
              res.writeHead(404);
            } else {
              try {
                const notFoundTemplate = await readFile(join(siteDir, '404.html'), 'utf-8');
                res.writeHead(404);
                res.write(notFoundTemplate || 'Page Not Found');
              } catch {
                // We're probably disconnected for some reason, so fail gracefully
              }
            }

            res.end();
          });
        }
      }
    },
    () => {
      spinner.succeed();
      console.log(`\n🐭 The dev server is running at ${chalk.magenta(url)}\n`);
    }
  );

  // Rebuild and reload when source files change
  bs.watch('src/**/!(*.test).*').on('change', async filename => {
    // Queue the change event to prevent race conditions
    await changeQueue.add(async () => {
      spinner.info(`File modified ${chalk.gray(`(${relative(rootDir, filename)})`)}`);

      try {
        const isTestFile = filename.includes('.test.ts');
        const isJsStylesheet = filename.includes('.styles.ts');
        const isCssStylesheet = filename.includes('.css');
        const isComponent =
          filename.includes('components/') &&
          filename.includes('.ts') &&
          !isJsStylesheet &&
          !isCssStylesheet &&
          !isTestFile;

        // Re-bundle when relevant files change
        if (!isTestFile && !isCssStylesheet) {
          await regenerateBuild();
        }

        // Copy stylesheets when CSS files change
        if (isCssStylesheet) {
          await generateStyles();
        }

        // Regenerate metadata when components change
        if (isComponent) {
          await generateManifest();
          await generateDocs();
        }

        reload();
      } catch (err) {
        console.error(chalk.red(err));
      }
    });
  });

  // Rebuild the docs and reload when the docs change
  bs.watch(`${docsDir}/**/*.*`).on('change', async filename => {
    // Queue the change event to prevent race conditions
    await changeQueue.add(async () => {
      spinner.info(`File modified ${chalk.gray(`(${relative(rootDir, filename)})`)}`);
      await generateDocs();
      reload();
    });
  });
}

//
// Cleanup everything when the process terminates
//
function terminate() {
  if (buildContext) {
    buildContext.dispose();
  }

  if (spinner) {
    spinner.stop();
  }

  process.exit();
}

process.on('exit', () => terminate());
process.on('SIGHUP', () => terminate());
process.on('SIGINT', () => terminate());
process.on('SIGTERM', () => terminate());
