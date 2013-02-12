grunt-contrib-livereload is composed of two tasks:

* `livereload-start`: sets up a local server that will serve the needed js file and the wesocket that will control your browser
* `livereload`: triggers the browser reload

This task support multiple browsers, which means all the browsers listening on the livereload port will be reloaded at the same time.

Note that grunt-contrib-livereload is designed to use [grunt-regarde](https://github.com/yeoman/grunt-regarde) instead grunt-contrib-watch (mainly due to shortcomings in the `watch` task which doesn't give access to changed files because it spawns tasks in subprocesses). In case you use different watcher, it will instead reload entire page.


## The livereload-start task

This task starts a server ([tiny-lr](https://github.com/mklabs/tiny-lr)) in the background, which will:
* serve the `livereload.js`
* act as a websocket server: each browser that opens a websocket to this server will be refreshed

By default the server listens on port 35729, but this can be changed through the `port` options.


## The livereload task

This task needs to be called to trigger a reload. 
