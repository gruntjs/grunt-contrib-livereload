/*
 * grunt-contrib-livereload
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Author, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // watch task
    watchActual: {
      test: {
        options: {
          nospawn: true
        },
        files: ['tasks/*.js', 'test/*.js', 'lib/*.js'],
        tasks: []
      }
    },

    // Unit tests.
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },

      all: { src: 'test/**/*.js' }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.renameTask('watch', 'watchActual');

  grunt.registerTask('watch', [
    'livereload-start',
    'watchActual'
  ]);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['simplemocha']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);
};
