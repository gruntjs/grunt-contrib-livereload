/*
 * grunt-contrib-livereload
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Author, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('livereload', 'Livereload assets in the browser', function() {
    var options = this.options();

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(f) {

    });
  });
};
