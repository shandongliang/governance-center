#!/usr/bin/env node
const ncp = require('ncp').ncp;
const mkdirp = require('mkdirp');
const join = require('path').join;
const chalk = require('chalk');
const rimraf = require('rimraf');

const rootDir = process.cwd();
const newWebDir = join(rootDir,'\pandora-web');
// step1：clear folder
rimraf(newWebDir,(err)=>{
  if(err){
    return console.error(err);
  }
  console.log(chalk.blue('clear folder success!'));
  // step2：create folder  
  mkdirp(newWebDir,(err)=>{
    if(err){
      return console.error(err);
    }
    console.log(chalk.blue('create folder success!'));
    // step3：copy folder and copy file
    let folders = ['assets','build','config','src','.babelrc','gulpfile.js','package.json'];
    for(let i=0,len=folders.length;i<len;i++){
      let folterItem = folders[i];
      let destPath = join(newWebDir, folterItem);
      let sourcePath = join(rootDir, folterItem);
      ncp(sourcePath, destPath, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    }
    console.log('generate folder and file finished!');
    // step4：copy src_security_ns to pandora-web\src
    // let destPath = join(newWebDir, '\src');
    // let sourcePath = join(rootDir, '\src_security_ns');
    // ncp(sourcePath, destPath, (err) => {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log('generate src_security_ns finished!');
    // });
  });
});

