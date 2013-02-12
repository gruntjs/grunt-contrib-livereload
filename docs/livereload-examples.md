# Quick-start steps

 1. Add livereload-start to default task (runs livereload server)
 2. Add html snippet to your page
 2. Trigger livereload  with ragarde, watch, etc

## Gruntfile

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
## Your web page

```html
<!-- livereload snippet -->
<script>document.write('<script src=\"http://'
+ (location.host || 'localhost').split(':')[0]
+ ':35729/livereload.js?snipver=1\"><\\/script>')
</script>
```

