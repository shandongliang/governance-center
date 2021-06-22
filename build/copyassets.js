#!/usr/bin/env node
const ncp = require('ncp');
const mkdirp = require('mkdirp');
const join = require('path').join;
const chalk = require('chalk');

const program = require('commander');

program
  .option('-d, --destinationPath <path>', 'output path')
  .option('-s, --sourcePath <staticPath>', 'source path')
  .parse(process.argv);


function build(args, callback) {
  console.log(chalk.blue('copy static folder begin'));

  const destinationPath = join(args.cwd, args.destinationPath);
  const sourcePath = join(args.cwd, args.sourcePath);
  console.log(chalk.blue(`from: ${chalk.yellow(sourcePath)}  to: ${chalk.yellow(destinationPath)}`));
  mkdirp(destinationPath, function (err) {
    if (err) {
      console.error(err);
    }
    ncp(sourcePath, destinationPath, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(chalk.blue('copy static folder done'));
      return null;
    });
  });
}

program.cwd = process.cwd();
build(program, function () {
  process.exit(0);
})