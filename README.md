# grunt-contrib-livereload [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-livereload.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-livereload)

> Reload assets live in the browser



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-livereload --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-livereload');
```




## Livereload task
_Run this task with the `grunt livereload` command._

grunt-contrib-livereload is composed of two tasks:

* `livereload-start`: sets up a local server that will serve the needed js file and the wesocket that will control your browser
* `livereload`: triggers the browser reload

Additionally a Connect middleware is available to inject a JS snippet into the page to that will connect the browser to the livereload server.

This task support multiple browsers, which means all the browsers listening on the livereload port will be reloaded at the same time.

Note that grunt-contrib-livereload is designed to use [grunt-regarde](https://github.com/yeoman/grunt-regarde) instead grunt-contrib-watch (mainly due to shortcomings in the `watch` task which doesn't give access to changed files because it spawns tasks in subprocesses.)


#### The livereload-start task

This task starts a server ([tiny-lr](https://github.com/mklabs/tiny-lr)) in the background, which will:
* serve the `livereload.js`
* act as a websocket server: each browser that opens a websocket to this server will be refreshed

By default the server listens on port 35729, but this can be changed through the `port` options.


#### The livereload task

This task needs to be called to trigger a reload. It must be passed the list of files that have changed (i.e. `livereload:foo.txt:bar.txt`)


#### The middleware

A connect middleware (`livereloadSnippet`) is delivered as an helper (located in `grunt-contrib-livereload/lib/utils`). This middleware must be the first one inserted.

It will be inserted on the fly in your HTML and will connect back to the livereload server.

```html
<!-- livereload snippet -->
<script>document.write('<script src=\"http://'
+ (location.host || 'localhost').split(':')[0]
+ ':" + port + "/livereload.js?snipver=1\"><\\/script>')
</script>
```

### Options

#### port

Type: `integer`
Default: `35729`

The port the livereload server should listen on.

#### Example config

```javascript
'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')]
          }
        }
      }
    },
    // Configuration to be run (and then tested)
    regarde: {
      fred: {
        files: '*.txt',
        tasks: ['livereload']
      }
    }

  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
};
```


## Release History

 * 2013-02-16   v0.1.1   Ensure Gruntfile.js is included on npm.
 * 2013-02-14   v0.1.0   First official release for Grunt 0.4.0.
 * 2013-02-02   v0.1.0rc8   Updated to work with latest grunt-regarde.
 * 2013-01-29   v0.1.0rc7   Initial release.

---

Task submitted by [Frederick Ros](https://github.com/sleeper)

*This file was generated on Mon Feb 18 2013 08:58:12.*
