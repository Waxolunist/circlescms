if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu');

  var cc = {};

  cc.byString = function(o, s) {
    if(s) {
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
    return;
  }

  cc.isLoaded = function(pkg, subpkg) {
    if(pkg) {
      if(subpkg instanceof Array) {
        return !!cc.byString(pkg, subpkg.join('.'));
      } else if(typeof subpkg === 'string') {
        return !!cc.byString(pkg, subpkg);
      } else {
        return false;
      }
    }
    return false;
  }

  return function() {
    for(var i = 0; i < arguments.length; i++) {
      var pkgname = arguments[i];
      
      var pkgnamesplit = pkgname.split('.');
      var tmpPkg = cc;
      pkgnamesplit.forEach(function(el, idx, array) {
        var subpkg = array.slice(idx, idx + 1).join('.');
        var subpkgpath = array.slice(0, idx + 1).join('.');
        if(cc.isLoaded(cc, subpkgpath)) {
          console.log('Package ' + subpkgpath + ' already loaded. Do nothing!');
        } else {
          console.log('Load package ' + subpkgpath + ' ...');
          var module = require('./cc.' + subpkgpath + '.js');
          if(!module) {
            console.log('Could not find package ' + subpkgpath);
          } else {
            console.log('Package ' + subpkgpath + ' successful loaded.');
            tmpPkg[subpkg] = module;
          }
        }
        tmpPkg = tmpPkg[subpkg];
      });
      
    }
    
    return cc;
  };
//define end
});
