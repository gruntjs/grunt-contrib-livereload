'use strict';
var Server = require('tiny-lr');
var path = require('path');
var url = require('url');

var utils = module.exports;

var port = 35729;
var https = false;
var proxyPort = null;

utils.startLRServer = function startLRServer(grunt, done) {
  var _ = grunt.util._;
  var _server;

  var options = _.defaults(grunt.config('livereload') || {}, {
    port: 35729,
    https: false,
    proxyPort: null
  });

  _server = new Server();
  grunt.log.writeln('... Starting Livereload server on ' + options.port + ' ...');
  port = options.port;
  https = options.https;
  proxyPort = options.proxyPort;

  _server.listen(options.port, done);
  return _server;
};

utils.getSnippet = function () {
  /*jshint quotmark:false */
  var s = https ? 's' : '';
  var p = proxyPort ? proxyPort : port;
  var snippet = [
          "<!-- livereload snippet -->",
          "<script>document.write('<script src=\"http" + s + "://'",
          " + (location.host || 'localhost').split(':')[0]",
          " + ':" + p + "/livereload.js?snipver=1&port=" + port + "\">'",
          " + '<\\/script>')",
          "</script>",
          ""
          ].join('\n');
  return snippet;
};

//
// This function returns a connect middleware that will insert a snippet
// of JavaScript needed to connect to the livereload server
//
// Usage:
// First require the needed module
// var lrSnippet = require('livereload/lib/utils').livereloadSnippet;
//
// Then in your grunt-contrib-connect config:
//
// server: {
//   dist: {
//     middleware: function() {
//       return [lrSnippet, folderMount('dist')]
//     }
//   },
//   test: {
//     middleware: function() {
//       return [lrSnippet(grunt), folderMount('dist')]
//     }
//   }
// }
utils.livereloadSnippet = function livereloadSnippet(req, res, next) {
  var writeHead = res.writeHead;
  var end = res.end;
  var filepath = url.parse(req.url).pathname;

  filepath = filepath.slice(-1) === '/' ? filepath + 'index.html' : filepath;

  if (path.extname( filepath ) !== '.html' && res.send === undefined) {
    return next();
  }

  res.push = function (chunk) {
    res.data = (res.data || '') + chunk;
  };

  // Bypass write until end
  var inject = res.write = function (string, encoding) {
    if (string !== undefined) {
      var body = string instanceof Buffer ? string.toString(encoding) : string;

      res.push(body.replace(/<\/body>/, function (w) {
        return utils.getSnippet() + w;
      }));
    }

    return true;
  };

  // Prevent headers from being finalized
  res.writeHead = function() {};

  // Write everything at the end
  res.end = function (string, encoding) {
    inject(string, encoding);

    // Restore writeHead
    res.writeHead = writeHead;

    if (res.data !== undefined ) {
      if (!res._header) {
        res.setHeader('content-length', Buffer.byteLength(res.data, encoding));
      }

      end.call(res, res.data, encoding);
    }
  };

  next();
};
