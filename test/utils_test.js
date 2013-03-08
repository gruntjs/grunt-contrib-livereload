'use strict';
var assert = require('assert');
var utils = require('../lib/utils');

describe('livereloadSnippet', function () {
  it('should call the next middleware', function (done) {
    var req = { url: '/' };
    var res = {};
    var next = function () {
      done();
    };
    utils.livereloadSnippet(req, res, next);
  });

  it('should re-write response end function', function (done) {
    var req = { url: '/' };
    var writeString = '';
    var res = {
      socket: {
        server: {
          address: function () {
            return {
              port: 12345
            };
          }
        }
      },
      end: function (string) {
        writeString = string;
      }
    };
    var next = function () {
      done();
    };
    utils.livereloadSnippet(req, res, next);
    res.end('<body>我能吞下玻璃而不伤身体。</body>','ascii');
    // original write is called
    assert.ok(writeString.match(/livereload snippet/));
  });

  it('should do nothing if requested page is not an HTML page', function (done) {
    var req = { url: '/favicon.ico' };
    var writeString = '';
    var res = {
      write: function (string) {
        writeString = string;
      }
    };
    var next = function () {
      done();
    };
    utils.livereloadSnippet(req, res, next);
    res.write('fred');
    assert.equal('fred', writeString);
  });
});
