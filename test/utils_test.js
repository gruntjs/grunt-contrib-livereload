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

  it('should re-write response write function', function (done) {
    var req = { url: '/' };
    var headers = {};
    var implicitHeaderCalled = false;
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
      write: function (string) {
        writeString = string;
      },
      setHeader: function (header, value) {
        headers[header] = value;
      },
      _implicitHeader: function () {
        implicitHeaderCalled = true;
      }
    };
    var next = function () {
      done();
    };
    utils.livereloadSnippet(req, res, next);
    res.write('<body></body>');
    // original write is called
    assert.ok(writeString.match(/livereload snippet/));
    assert.equal(headers['content-length'], 194);
    assert.ok(implicitHeaderCalled);
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
