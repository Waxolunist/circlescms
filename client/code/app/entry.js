// This file automatically gets called first by SocketStream and must always exist

// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

window.ss.server.on('disconnect', function () {
  console.log('Connection down :-(');
});

window.ss.server.on('connect', function () {
  console.log('Event connect');
});

window.ss.server.on('connecting', function () {
  console.log('Event connecting');
});

window.ss.server.on('connect_failed', function () {
  console.log('Event connect_failed');
});

window.ss.server.on('error', function () {
  console.log('Event error');
});

window.ss.server.on('message', function (message) {
  console.log('Event message: ' + message);
});

window.ss.server.on('anything', function (data) {
  console.log('Event anything: ' + data);
});

window.ss.server.on('reconnect_failed', function () {
  console.log('Event reconnect_failed');
});

window.ss.server.on('reconnecting', function () {
  console.log('Event reconnecting');
});

window.ss.server.on('reconnect', function () {
  console.log('Connection back up :-)');
//  window.cc.setContent(document.getElementById(window.cc.contentId));
});

require('ssAngular');
require('/controllers');
/*window.ss.server.on('ready', function () {
  console.log('ss ready');
  // Wait for the DOM to finish loading
  if (window.location.hash) {
    (function () {
      window.cc.setContent(document.getElementById(window.cc.contentId));
      window.cc.activateLink(window.location.hash);
      document.getElementById(window.cc.contentId).classList.add(window.cc.activeClass);
    }());
  }
});
*/
