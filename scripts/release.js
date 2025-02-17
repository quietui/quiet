import chalk from 'chalk';
import { execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { createInterface } from 'readline/promises';

async function ask(question) {
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await readline.question(`${question} (y/N) `);
    return answer.toLowerCase().startsWith('y');
  } finally {
    readline.close();
  }
}

async function release() {
  const isDryRun = process.argv.includes('--dry-run');
  const packageJsonPath = join(process.cwd(), 'package.json');
  const originalPackageJson = await readFile(packageJsonPath, 'utf-8');

  try {
    const packageData = JSON.parse(originalPackageJson);

    // A quick confirmation before we proceed...
    const typeOfRun = isDryRun ? '(dry run)' : 'to npm';
    if (!(await ask(`🐭 Publish Quiet UI v${packageData.version} ${typeOfRun}?`))) {
      console.log(chalk.gray('\nPublishing cancelled.\n'));
      return;
    }

    // Ask if the version/changelog has been updated
    if (!(await ask(`🧀 Have you bumped the version and updated the changelog?`))) {
      console.log(chalk.gray('\nPlease bump the version and update the changelog before publishing.\n'));
      return;
    }

    //
    // 1. Publish @quietui/quiet-browser (bundled for browsers + CDNs)
    //
    console.log('\nBuilding and publishing the bundled browser package...\n');
    execSync('node scripts/build.js --browser', { stdio: 'inherit' });

    // Run tests on the bundled dist (since WTR isn't setup to bundle)
    execSync('npm run test', { stdio: 'inherit' });

    // Temporarily modify package.json for the browser build
    const browserPackageData = { ...packageData };
    browserPackageData.name = '@quietui/quiet-browser';

    // Remove dev fields
    delete browserPackageData.scripts;
    delete browserPackageData.dependencies;
    delete browserPackageData.devDependencies;

    // Write the modified package.json file
    await writeFile(packageJsonPath, JSON.stringify(browserPackageData, null, 2));

    // Publish it to npm
    if (!isDryRun) {
      execSync('npm publish --access public', { stdio: 'inherit', env: { ...process.env, QUIET_UI_RELEASE: '1' } });
      console.log(chalk.green('✔ Published the browser package'));
    } else {
      console.log(chalk.yellow(`✔ Skipped publishing the browser package (dry run)`));
    }

    // Revert package.json
    await writeFile(packageJsonPath, originalPackageJson);

    //
    // 2. Publish @quietui/quiet (unbundled for npm + bundlers)
    //
    console.log('\nBuilding and publishing the unbundled npm package...\n');
    execSync('node scripts/build.js', { stdio: 'inherit' });

    // Publish it to npm
    if (!isDryRun) {
      execSync('npm publish --access public', { stdio: 'inherit', env: { ...process.env, QUIET_UI_RELEASE: '1' } });
      console.log(chalk.green('✔ Published the npm package'));
    } else {
      console.log(chalk.yellow('✔ Skipped publishing the npm package (dry run)'));
    }

    console.log(chalk.magenta('\n🐭 Successfully published both packages to npm:\n'));
    console.log(`   • @quietui/quiet-browser@${packageData.version}`);
    console.log(`   • @quietui/quiet@${packageData.version}\n`);
  } catch (error) {
    console.error(chalk.red(`\n✖ Publishing failed: ${error.message}`));

    // Attempt to restore the original package.json if an error occurred
    await writeFile(packageJsonPath, originalPackageJson);

    process.exit(1);
  }
}

release();
