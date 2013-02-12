# grunt-contrib-livereload [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-livereload.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-livereload)

> Reload assets live in the browser


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-livereload --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: http://gruntjs.com/getting-started


## Livereload task
_Run this task with the `grunt livereload` command._

grunt-contrib-livereload is composed of two tasks:

* `livereload-start`: sets up a local server that will serve the needed js file and the wesocket that will control your browser
* `livereload`: triggers the browser reload

This task support multiple browsers, which means all the browsers listening on the livereload port will be reloaded at the same time.

Note that grunt-contrib-livereload is designed to use [grunt-regarde](https://github.com/yeoman/grunt-regarde) instead grunt-contrib-watch (mainly due to shortcomings in the `watch` task which doesn't give access to changed files because it spawns tasks in subprocesses). In case you use different watcher, it will instead reload entire page.


#### The livereload-start task

This task starts a server ([tiny-lr](https://github.com/mklabs/tiny-lr)) in the background, which will:
* serve the `livereload.js`
* act as a websocket server: each browser that opens a websocket to this server will be refreshed

By default the server listens on port 35729, but this can be changed through the `port` options.


#### The livereload task

This task needs to be called to trigger a reload. 

### Options

#### port

Type: `integer`
Default: `35729`

The port the livereload server should listen on.

### Quick-start steps

 1. Add livereload-start to default task (runs livereload server)
 2. Add html snippet to your page
 2. Trigger livereload  with ragarde, watch, etc

#### Gruntfile

```javascript
'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested)
    regarde: {
      fred: {
        files: '*.txt',
        tasks: ['livereload']
      }
    }

  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('default', ['livereload-start', 'regarde']);
};
```
#### Your web page

```html
<!-- livereload snippet -->
<script>document.write('<script src=\"http://'
+ (location.host || 'localhost').split(':')[0]
+ ':35729/livereload.js?snipver=1\"><\\/script>')
</script>
```



## Release History

 * 2013-02-03   v0.1.0rc8   Updated to work with latest grunt-regarde.
 * 2013-01-30   v0.1.0rc7   Initial release.

---

Task submitted by [Frederick Ros](https://github.com/sleeper)

*This file was generated on Tue Feb 12 2013 21:01:22.*
