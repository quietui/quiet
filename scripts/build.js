import { deleteAsync } from 'del';
import { dirname, join, relative } from 'path';
import { distDir, docsDir, rootDir, runScript, siteDir } from './utils.js';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { mkdir, readFile, unlink } from 'fs/promises';
import { replace } from 'esbuild-plugin-replace';
import browserSync from 'browser-sync';
import chalk from 'chalk';
import copy from 'recursive-copy';
import esbuild from 'esbuild';
import getPort, { portNumbers } from 'get-port';
import ora from 'ora';
import process from 'process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDeveloping = process.argv.includes('--develop');
const iconDir = join(distDir, 'assets/icons');
const spinner = ora({ text: 'Quiet UI', color: 'magenta' }).start();
const packageData = JSON.parse(await readFile(join(rootDir, 'package.json'), 'utf-8'));
const version = JSON.stringify(packageData.version.toString());
let buildContext;

/**
 * Runs the full build.
 */
async function buildAll() {
  try {
    await cleanup();
    await generateManifest();
    await generateIcons();
    await generateTypes();
    await generateBundle();
    await generateDocs();
    spinner.succeed('The build is complete');
  } catch (error) {
    spinner.fail();
    console.log(chalk.red(`\n${error}`));
  }
}

/** Empties the dist directory. */
async function cleanup() {
  spinner.start('Cleaning up dist');

  await deleteAsync(distDir);
  await mkdir(distDir, { recursive: true });

  spinner.succeed();
}

/**
 * Analyzes components and generates the custom elements manifest file.
 */
function generateManifest() {
  spinner.start('Generating CEM');

  try {
    execSync('cem analyze --config "custom-elements-manifest.js"');
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
  const dirToCopy = join(rootDir, 'node_modules/heroicons');
  const filesToRemove = ['package.json', 'README.md'];

  spinner.start('Packaging icons');

  await deleteAsync(iconDir);
  await mkdir(iconDir, { recursive: true });
  await copy(dirToCopy, iconDir);
  await Promise.all(filesToRemove.map(file => unlink(join(iconDir, file))));

  spinner.succeed();

  return Promise.resolve();
}

/**
 * Runs TypeScript to generate types.
 */
function generateTypes() {
  spinner.start('Running the TypeScript compiler');

  try {
    execSync(`tsc --project ./tsconfig.prod.json --outdir "${distDir}"`);
  } catch (error) {
    return Promise.reject(error.stdout);
  }

  spinner.succeed();

  return Promise.resolve();
}

/**
 * Runs esbuild to generate the final dist.
 */
async function generateBundle() {
  spinner.start('Bundling with esbuild');

  const config = {
    format: 'esm',
    target: 'es2020',
    entryPoints: [
      //
      // IMPORTANT: Entry points MUST be mapped in package.json => exports
      //
      // Utilities
      './src/quiet.ts',
      // Autoloader + utilities
      './src/quiet.loader.ts',
      // Individual components
      ...(await globby('./src/components/**/!(*.(style|test)).ts'))
    ],
    outdir: distDir,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      'process.env.NODE_ENV': '"production"' // required by Floating UI
    },
    bundle: true,
    legalComments: 'none',
    splitting: true,
    plugins: [replace({ __QUIET_VERSION__: version })]
  };

  if (isDeveloping) {
    // Incremental builds for dev
    buildContext = await esbuild.context(config);
    await buildContext.rebuild();
  } else {
    // One-time build for production
    esbuild.build(config);
  }

  spinner.succeed();
}

/**
 * Incrementally rebuilds the source files. Must be called only after `generateBundle()` has been called.
 */
async function regenerateBundle() {
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

  spinner.succeed(`Writing the docs ${chalk.gray(`(${output}`)})`);
}

// Initial build
await buildAll();

// Launch the dev server
if (isDeveloping) {
  spinner.start('Launching the dev server');

  const bs = browserSync.create();
  const port = await getPort({ port: portNumbers(4000, 4999) });
  const browserSyncConfig = {
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
    }
  };
  const reload = () => {
    spinner.start('Reloading browser');
    bs.reload();
    spinner.succeed();
  };

  // Launch browser sync
  bs.init(browserSyncConfig, () => {
    const url = `http://localhost:${port}`;
    spinner.succeed();
    console.log(`\n🐭 The dev server is running at ${chalk.magenta(url)}\n`);
  });

  // Rebuild and reload when source files change
  bs.watch('src/**/!(*.test).*').on('change', async filename => {
    spinner.info(`File modified ${chalk.gray(`(${relative(rootDir, filename)})`)}`);

    try {
      const isTestFile = filename.includes('.test.ts');
      const isStylesheet = filename.includes('.styles.ts');
      const isComponent = filename.includes('components/') && filename.includes('.ts') && !isStylesheet && !isTestFile;

      // Re-bundle when relevant files change
      if (!isTestFile) {
        await regenerateBundle();
      }

      // Regenerate metadata when components change
      if (isComponent) {
        await generateManifest();
      }

      reload();
    } catch (err) {
      console.error(chalk.red(err));
    }
  });

  // Rebuild the docs and reload when the docs change
  bs.watch(`${docsDir}/**/*.*`).on('change', async filename => {
    spinner.info(`File modified ${chalk.gray(`(${relative(rootDir, filename)})`)}`);
    await generateDocs();
    reload();
  });

  // Warn when the 11ty config file changes
  bs.watch(join(docsDir, '.eleventy.js')).on('change', () => {
    spinner.warn('The 11ty config file has changed. Restart required!');
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

process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);
