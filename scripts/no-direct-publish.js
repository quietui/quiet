import chalk from 'chalk';

//
// NOTE: the release script sets this ENV to publish both packages programmatically
//
if (!process.env.QUIET_UI_RELEASE) {
  console.log(chalk.magenta('\n🐭 Please use one of the following scripts to publish:\n'));
  console.log(chalk.gray('  • npm run release'));
  console.log(chalk.gray('  • npm run release:dry-run\n'));

  // Exit with error to prevent publishing
  process.exit(1);
}
