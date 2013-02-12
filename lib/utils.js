'use strict';
var Server = require('tiny-lr');
var path = require('path');
var http = require('http');

var utils = module.exports;

var port = 35729;

utils.startLRServer = function startLRServer(grunt, done) {
  var _ = grunt.util._;
  var _server;

  var options = _.defaults(grunt.config('livereload') || {}, {
    port: 35729
  });

  _server = new Server();
  grunt.log.writeln('... Starting Livereload server on ' + options.port + ' ...');
  port = options.port;

  _server.listen(options.port, done);
  return _server;
};

//fallback method
utils.fallback_reload = function(files, grunt) {
  var _ = grunt.util._;
  var options = _.defaults(grunt.config('livereload') || {}, {
    port: 35729
  });

  var url = "http://127.0.0.1:" + options.port + "/changed?files=" + encodeURI(files.join(","));
  http.get(url).on('error', function(e) {
    grunt.log.error('Server is not started. Please do call livereload-start prior to any other task.');
  });
}

utils.livereloadSnippet = function livereloadSnippet() {
  throw Error("Deprecated method");
};
