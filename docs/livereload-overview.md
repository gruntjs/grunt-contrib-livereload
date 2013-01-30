# grunt-contrib-livereload [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-livereload.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-livereload)

> Reload assets live in the browser

## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-livereload --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md

## Introduction

`grunt-contrib-livereload` is composed of 2 tasks:
* one to setup a local server that will serve the needed js file and the wesocket that will control your browser (`livereload-start`)
* one to trigger the reload of the browser(s) (`livereload`)

Additionally a connect middleware is available to insert on the fly in your HTML page the snippet of javascript that will start he connect to the livereload server.

This task support multi-browser: all the browsers listening on the tiny-lr port will be reloaded at the same time.

Note that `grunt-contrib-livereload` is designed to use [grunt-regarde](https://github.com/yeoman/grunt-regarde) instead `grunt-contrib-watch` (mainly due to shortcomings in the `watch` task which doesn't give access to changed files because it spawns tasks in subprocesses.)

## The livereload-start task

This task starts a server in the background. This server (implemented thanks to [mklabs/tiny-lr](https://github.com/mklabs/tiny-lr)) will mainly in our case:
* serve the `livereload.js`
* act as a websocket server: each browser that opens a websocket to this server will be refreshed

By default thsi server listens on port 35729, but this can be changed through the `port` options.

## The livereload task
This task needs to be called to trigger a reload. It must be passed the list of files that have changed (i.e. `livereload:foo.txt:bar.txt`)

## The middleware
A connect middleware (`livereloadSnippet`) is delivered as an helper (located in `grunt-contrib-livereload/lib/utils`). This middleware must be the first one inserted.

It will insert on the fly, in your HTML, the needed snippet of javascript that will setup the connection to the `tiny-lr` server.

```html
<!-- livereload snippet -->
          <script>document.write('<script src=\"http://'
           + (location.host || 'localhost').split(':')[0]
           + ':" + port + "/livereload.js?snipver=1\"><\\/script>')
          </script>
```
