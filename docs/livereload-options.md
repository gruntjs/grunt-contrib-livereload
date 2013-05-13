# Options

## port

Type: `integer`
Default: `35729`

The port the livereload server should listen on.

## proxyPort

Type: `integer`
Default: `null` (Defaults to using the same value as the `port` option).

Which port the snippet link uses to reach the livereload server. Use this
option if you are accessing the livereload server via a proxy.

## https

Type: `boolean`
Default: `false`

Whether the snippet link should use HTTPS protocol.

Note: The livereload server does not itself support HTTPS! Only use this option
if you are accessing the livereload server via a proxy.
