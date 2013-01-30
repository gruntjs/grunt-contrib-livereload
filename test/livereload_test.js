'use strict';
var grunt = require('grunt');

exports.livereload = {
  compile: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/');
    var expected = grunt.file.read('test/expected/');
    test.equal(actual, expected, 'should reload');

    test.done();
  }
};
