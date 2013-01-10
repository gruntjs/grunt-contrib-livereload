# grunt-contrib-livereload [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-livereload.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-livereload)

> Reload assets live in the browser


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-livereload --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Livereload task
_Run this task with the `grunt livereload` command._


_This plugin is a placeholder for the upcoming live reload task._

### Options

#### optsion

Type: `Boolean`
Default: `false`

Description.

#### Example config

```javascript
grunt.initConfig({
  livereload: {                                  // Task
    dist: {                                      // Target
      options: {                                 // Target options

      },
      files: {                                   // Dictionary of files
        'dist/': 'src/'      // 'destination': 'source'
        'dist/': 'src/'
      }
    },
    dev: {                                       // Another target
      files: {
        'dist/': 'src/'
        'dist/': 'src/'
      }
    }
  }
});

grunt.registerTask('default', ['livereload']);
```


## Release History

 * 2012-10-31   v0.1.0   Initial release.

---

Task submitted by []()

*This file was generated on Wed Jan 09 2013 20:23:58.*
