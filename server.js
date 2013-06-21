#!/bin/env node

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var rootdir = process.env.OPENSHIFT_REPO_DIR || ".";

// My SocketStream 0.3 app
var ss = require('socketstream');
var express = require('express');

ss.root = rootdir;

var app = express();

// Code Formatters
ss.client.formatters.add(require('ss-jade'));
ss.client.formatters.add(require('ss-stylus'));

//ss.client.templateEngine.use(require('ss-handlebars'));
ss.client.templateEngine.use('angular');


ss.responders.add(require('ss-angular'), {pollFreq: 1000});

//ss.ws.transport.use(require('ss-sockjs'));
// nodejs is executed in openshift
// see https://www.openshift.com/blogs/paas-websockets
if (process.env.OPENSHIFT_NODEJS_PORT) {
  ss.ws.transport.use('engineio', {
    client: {
      port: 8000,
      transports: ['polling', 'websocket']
    }
  });
}

/*
ss.client.define('me', {
  view: 'me.jade',
  css: ['me.styl'],
  code: ['app/entry.js',
         'libs/script.me.js',
         'libs/uri.js',
         'libs/moment.js',
         'libs/underscore.js',
         'libs/jquery-2.0.0.min.js',
         'libs/handlebar-helpers.js',
         'libs/swag.js'
    ],
  tmpl: '*'
});
*/

ss.client.define('newgrid', {
  view: 'newgrid.jade',
  css: ['newgrid/newgrid.styl'],
  code: ['app/entry.js',
         'app/controllers.js',
         'libs/underscore.js',
         'libs/jquery-2.0.0.min.js',
         'libs/angular.min.js',
         'libs/prism.js'
    ],
  tmpl: '*'
});

if (ss.env === 'production') {
  ss.client.packAssets();
}

app.use("/assets", express.static(rootdir + "/resources/assets"));

app.get('/*', function (req, res) {
  res.serveClient('newgrid');
});

// Start SocketStream
var server = app.listen(port, ipaddr);
ss.start(server);

// Append SocketStream middleware to the stack
app.stack = ss.http.middleware.stack.concat(app.stack);

console.log("Server running at http://" + ipaddr + ":" + port + "/");
