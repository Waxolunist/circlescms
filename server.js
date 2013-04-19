#!/bin/env node

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || null;
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

ss.client.templateEngine.use(require('ss-handlebars'));

//ss.ws.transport.use(require('ss-sockjs'));

ss.client.define('me', {
  view: 'me.jade',
  css: ['me.styl'],
  code: ['app/moment.js',
         'app/entry.js',
         'libs/jquery.min.js',
         'libs/jquery.ba-bbq.min.js',
         'libs/handlebar-helpers.js',
         'libs/script.me.js'
    ],
  tmpl: '*'
});

//ss.client.packAssets();

app.get('/', function (req, res) {
  res.serveClient('me');
});

// Start SocketStream
var server = app.listen(port, ipaddr);
ss.start(server);

// Append SocketStream middleware to the stack
app.stack = ss.http.middleware.stack.concat(app.stack);

console.log("Server running at http://" + ipaddr + ":" + port + "/");
