if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu');

  function getPropertyByString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1');  // convert indexes to properties
    s = s.replace(/^\./, ''); // strip leading dot
    var a = s.split('.');
    while (a.length) {
        var n = a.shift();
        if (n in o) {
            o = o[n];
        } else {
            return;
        }
    }
    return o;
  }

  Object.prototype.byString = function(s) {
    return getPropertyByString(this, s);
  };

  var cc = {};

  cc.isLoaded = function(pkg, a) {
    if(!a || !pkg) {
      return false;
    } else if(typeof a === 'string') {
      return cc.isLoaded(pkg, a.split('.'));
    } else if(!(a instanceof Array)) {
      return false;
    } else {
      if(a.length == 1) {
        return !!pkg[a[0]];
      }
      return cc.isLoaded(pkg[a[0]], a.slice(1, a.length));
    }
  }

  return function() {
    for(var i = 0; i < arguments.length; i++) {
      var pkgname = arguments[i];
      console.log('Load package ' + pkgname + ' ...');
      
      var pkgnamesplit = pkgname.split('.');
      pkgnamesplit.forEach(function(el, idx, array) {
        var parentpkgname = pkgnamesplit.slice(0, idx);
        if(cc[el]) {
          console.log('Package ' + el + ' already loaded. Do nothing!');
        } else {
          
        }
      });
      var module = require('./cc.' + pkgname + '.js');
      if(!module) {
        console.log('Could not find package ' + pkgname);
      } else {
        console.log('Package ' + pkgname + ' successful loaded.');
        cc[pkgname] = module;
      }
    }
    
    return cc;
  };
//define end
});
