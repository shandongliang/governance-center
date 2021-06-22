const path = require('path');
const { readFileSync } = require('fs');


exports.resolve = (dir) => {
  return path.resolve(__dirname, '..', dir)
}

exports.getPkg = () => {
  const cwd = process.cwd();
  const pkgFile = path.resolve(cwd, 'package.json');
  return JSON.parse(readFileSync(pkgFile, 'utf-8'));
}
