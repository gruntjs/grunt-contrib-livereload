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
      grunt.log.error('Server is not started. Please do call livereload-start prior to any other task.');
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

  grunt.registerTask('livereload-start', 'Setup livereload to alert your browser when a file has changed', function () {
    // Start a websocket server in the background
    server = utils.startLRServer(grunt, this.async());

    // listen for watch events
    grunt.event.on('watch', function(action, data){
      if ('changed' !== action) {
        return;
      }
      var files = Array.isArray(data) ? data : [data];
      grunt.log.verbose.writeln('... Reloading ' + grunt.log.wordlist(files) + ' ...');
      server.changed({body:{files: files}});
    });

  });
};
