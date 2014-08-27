// note: path have to be full path (ex: /home/user/app/dynamic-module.js) not short (ex: "./dynamic-module")

// thanks to: http://stackoverflow.com/a/5114805/1576270

/*
  Example usage:
  var dynamic_load = require('./dynamic-load');
  var config = require('./config');
  dynamic_load('/path/to/config.js', function(res){
    config = res;
  });
*/

var chokidar = require('chokidar');

module.exports = function(path, cb)
{
  if(typeof path != "string")
    throw "Path must be a string";

  if(typeof cb != "function")
    throw "Callback must be a function";

  var watcher = chokidar.watch(path);
  watcher.on('change', function(path)
  {
    delete require.cache[path];
    cb(require(path));
  });
};
