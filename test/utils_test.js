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
      end: function (string) {
        implicitHeaderCalled = true;
        writeString += string;
      },
      write: function (string) {
        writeString += string;
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
    res.write('<body>我能吞下玻璃而不伤身体。</body>');
    res.end();

    // original write is called
    assert.ok(writeString.match(/livereload snippet/));
    assert.equal(headers['content-length'], 230);
    assert.ok(implicitHeaderCalled);
  });

  it('should support Express response send function', function (done) {
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
      end: function (string) {
        implicitHeaderCalled = true;
        writeString += string;
      },
      setHeader: function (header, value) {
        headers[header] = value;
      },
      _implicitHeader: function () {
        implicitHeaderCalled = true;
      }
    };
    res.send = function (body) {
      res.end(body);
    };
    var next = function () {
      done();
    };
    utils.livereloadSnippet(req, res, next);
    res.send('<body>我能吞下玻璃而不伤身体。</body>');

    // original write is called
    assert.ok(writeString.match(/livereload snippet/));
    assert.equal(headers['content-length'], 230);
    assert.ok(implicitHeaderCalled);
  });


  it('should send correct content-length for html containing multi byte', function(done) {
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
      end: function () {
        implicitHeaderCalled = true;
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
    res.write('<h1>Foo</h1><p>Multibyte characters here: ääää ööööö åååååå</p><p>Some html here</p>');
    res.end();
    // original write is called
    assert.equal(headers['content-length'], 99);
    assert.ok(implicitHeaderCalled);
  });

  it('should send correct length after piped writes', function (done) {
    var req = { url: '/' };
    var headers = {};
    var header = false;
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
      on: function() {},
      once: function() {},
      removeListener: function() {},
      emit: function() {},
      writable: true,
      write: function (string) {
        writeString = string;
      },
      writeHeader: function () {
        header = true;
      },
      setHeader: function (header, value) {
        assert.ok(header);
        headers[header] = value;
      }
    };

    var next = function () {};
    var stream = require('fs').createReadStream('test/fixtures/index.html');

    res.end = function () {
      if (!implicitHeaderCalled) {
        assert.equal(headers['content-length'], 73557);
        done();
      }
      implicitHeaderCalled = true;
    };

    utils.livereloadSnippet(req, res, next);
    stream.pipe(res);
  });

  it('should send correct content-length after multiple writes', function(done) {
    var req = { url: '/' };
    var headers = {};
    var header = false;
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
      end: function () {
        implicitHeaderCalled = true;
      },
      write: function (string) {
        writeString = string;
      },
      writeHeader: function () {
        header = true;
      },
      setHeader: function (header, value) {
        assert.ok(header);
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
    res.write('<h1>Foo</h1>');
    res.write('<p>Multibyte characters here: ääää ööööö åååååå</p>');
    res.write('<p>Some html here</p>');
    res.end();
    // original write is called
    assert.equal(headers['content-length'], 99);
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
