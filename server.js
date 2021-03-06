#!/bin/env node

    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
/*    self.setupTerminationHandlers = function(){
    self.setupTerminationHandlers = function(){
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };
*/


//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port    = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var rootdir = process.env.OPENSHIFT_REPO_DIR || '.';
var wsport  = process.env.OPENSHIFT_NODEJS_PORT ? 8000 : port;

// My SocketStream 0.3 app
var ss = require('socketstream');
var express = require('express');

ss.root = rootdir;

var app = express();

// Code Formatters
ss.client.formatters.add(require('ss-jade'));
ss.client.formatters.add(require('ss-stylus'), { 'include css' : true });
ss.client.formatters.add(require('./lib/minmap.js'));

//ss.client.templateEngine.use(require('ss-handlebars'));
ss.client.templateEngine.use('angular');


ss.responders.add(require('ss-angular'), {pollFreq: 1000});

// nodejs is executed in openshift
// see https://www.openshift.com/blogs/paas-websockets
console.log('Client listening on port ' + wsport);
ss.ws.transport.use('engineio', {
  client: {
    port: wsport,
    transports: ['polling', 'websocket']
  }
});

ss.client.define('newgrid', {
  view: 'newgrid.jade',
  css: ['newgrid/newgrid.styl'],
  code: ['app/entry.js',
         'app/controllers.js',
         'app/directives',
         'libs/underscore/underscore-min.js',
         'libs/jquery/jquery.min.js',
         'libs/angularjs-bower/angular.min.js',
         'libs/marked/lib/marked.js',
         'libs/swiper/dist/idangerous.swiper-2.2.min.js',
         'libs/prism/prism.js',
         'libs/prism/components/prism-bash.min.js'
    ],
  tmpl: '*'
});

if (ss.env === 'production' || process.env.OPENSHIFT_NODEJS_PORT) {
  ss.client.packAssets();
}

//Middleware
app.use(function(req, res, next) {
  res.setHeader('Cache-Control', 'public, max-age=345600'); // 4 days
  res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
  return next();
});
app.use(express.compress());
app.use('/assets', express.static(rootdir + '/resources/assets'));
app.all(/^\/{0,1}$/, function (req, res) { res.redirect('/cc'); });
app.get(/^\/cc(\/|$)/, function (req, res, next) {
  res.serveClient('newgrid');
});

// Start SocketStream
var server = app.listen(port, ipaddr);
ss.start(server);

// Append SocketStream middleware to the stack
app.stack = ss.http.middleware.stack.concat(app.stack);

console.log('Server running at http://' + ipaddr + ':' + port + '/');
