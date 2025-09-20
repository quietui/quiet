import chalk from 'chalk';

//
// NOTE: the release script sets this ENV to publish both packages programmatically
//
if (!process.env.QUIET_UI_RELEASE) {
  console.log(chalk.magenta('\n🐭 Please use the private publish script in @quietui/publish to publish releases.\n'));

  // Exit with error to prevent publishing
  process.exit(1);
}
