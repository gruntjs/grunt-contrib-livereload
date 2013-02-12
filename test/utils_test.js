'use strict';
var assert = require('assert');
var utils = require('../lib/utils');
var http = require('http');
var grunt = require('grunt');

describe('utils', function () {
  it('livereloadSnippet should be obsolete', function () {
    assert.throws(utils.livereloadSnippet, /Deprecated method/);
  });

  it('fallback_reload should trigger reload', function (done) {

    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end();
      assert.equal(req.url, '/changed?files=/');
      done();
    }).listen(35729);

    utils.fallback_reload(["/"], grunt);
  });

});
