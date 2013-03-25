// My SocketStream 0.3 app
var ss = require('socketstream'),
    express = require('express');

var app = express();

// Code Formatters
ss.client.formatters.add(require('ss-jade'));
ss.client.formatters.add(require('ss-stylus'));

ss.client.templateEngine.use(require('ss-hogan'));

ss.client.define('me', {
  view: 'me.jade',
  css: ['me.styl'],
  code: ['app/entry.js', 'libs/jquery.min.js', 'libs/jquery.ba-bbq.min.js', 'libs/script.me.js'],
  tmpl: '*'
});

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets();

app.get('/', function(req, res){
  res.serveClient('me');
});

// Start SocketStream
server = app.listen(3000);
ss.start(server);

// Append SocketStream middleware to the stack
app.stack = ss.http.middleware.stack.concat(app.stack);
