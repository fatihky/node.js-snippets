var path = require('path');
var exts = ['.js', '.css'];

function filter(input) {
  if (!Array.isArray(input))
    return map(input);
  return input.map(map).join('\n');
}

function map(input) {
  var ext = path.extname(input);
  if (exts.indexOf(ext) < 0)
    return input;
  if (ext === '.js') {
    return '<script src="js/' + input + '"></script>'
  }
  if (ext === '.css') {
    return '<link rel="stylesheet" href="' + input +'"/>';
  }
  return input;
}

filter.safe = true;

module.exports = filter;
