// This file automatically gets called first by SocketStream and must always exist

// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

ss.server.on('disconnect', function(){
  console.log('Connection down :-(');
});

ss.server.on('connect', function() {
  console.log('Event connect');
});
ss.server.on('connecting', function() {
  console.log('Event connecting');
});
ss.server.on('connect_failed', function() {
  console.log('Event connect_failed');
});
ss.server.on('error', function() {
  console.log('Event error');
});
ss.server.on('message', function(message) {
  console.log('Event message: ' + message);
});
ss.server.on('anything', function(data) {
  console.log('Event anything: ' + data);
});
ss.server.on('reconnect_failed', function() {
  console.log('Event reconnect_failed');
});
ss.server.on('reconnecting', function() {
  console.log('Event reconnecting');
});

ss.server.on('reconnect', function(){
  console.log('Connection back up :-)');
  setContent($(contentId));
});


ss.server.on('ready', function(){
  console.log('ss ready');

  // Wait for the DOM to finish loading
  if(window.location.hash) {
    jQuery(function(){
      deactivateAll();
      setContent($(contentId));
      activateLink(window.location.hash);
      $(contentId).addClass(activeClass);
    });
  }

});


window.moment = require('/moment');
