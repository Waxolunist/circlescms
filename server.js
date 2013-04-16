#!/bin/env node

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// My SocketStream 0.3 app
var ss = require('socketstream');
var express = require('express');

var app = express();

// Code Formatters
ss.client.formatters.add(require('ss-jade'));
ss.client.formatters.add(require('ss-stylus'));

ss.client.templateEngine.use(require('ss-handlebars'));

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

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') {
  ss.client.packAssets();
}

app.get('/', function (req, res) {
  res.serveClient('me');
});

// Start SocketStream
var server = app.listen(process.env.OPENSHIFT_INTERNAL_PORT, process.env.OPENSHIFT_INTERNAL_IP);
ss.start(server);

// Append SocketStream middleware to the stack
app.stack = ss.http.middleware.stack.concat(app.stack);

console.log("Server running at http://" + ipaddr + ":" + port + "/");
