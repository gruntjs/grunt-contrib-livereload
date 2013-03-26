/*
 * grunt-contrib-livereload
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Author, contributors
 * Licensed under the MIT license.
 */

'use strict';
var utils = require('../lib/utils');
var server;

module.exports = function (grunt) {
  grunt.registerTask('livereload', 'dummy livereload task', function () {
    var files;

    if (!server) {
      return;
    }

    if (!grunt.regarde) {
      // Seems like this task has not been triggered by grunt-regarde
      // We will rely on watch's event dispatch
      return;
    }

    if (grunt.regarde.changed.length === 0) {
      grunt.log.verbose.writeln('No file changed.');
      return;
    }

    files = grunt.regarde.changed;

    grunt.log.verbose.writeln('... Reloading ' + grunt.log.wordlist(files) + ' ...');
    server.changed({
      body: {
        files: files
      }
    });
  });

  // all changed files
  var filesChanged = [];
  // If a reload operation is already queued
  var reloadOp = false;

  grunt.registerTask('livereload-start', 'Setup livereload to alert your' +
    ' browser when a file has changed', function () {
    // Start a websocket server in the background
    server = utils.startLRServer(grunt, this.async());

    // listen for watch events
    grunt.event.on('watch', onWatch);
  });

  /**
   * Callback for "watch" event.
   *
   * @param  {string} action The action triggered.
   * @param  {string} data The file changed.
   */
  function onWatch(action, data) {
    if ('changed' !== action) {
      return;
    }

    var files = Array.isArray(data) ? data : [data];
    grunt.log.writeln('... Queued for Reload ' + grunt.log.wordlist(files) + ' ...');

    // queue up
    filesChanged = filesChanged.concat(files);

    if (reloadOp) {
      return;
    }
    reloadOp = true;

    setTimeout(lazyReload, 300);
  }

  /**
   * Trigger Live Reload, reset switches.
   *
   */
  function lazyReload() {
    grunt.log.writeln('... Reloading!');
    server.changed({body:{files: filesChanged}});
    filesChanged = [];
    reloadOp = false;
  }
};
