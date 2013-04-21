if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function (require) {
  var dejavu = require('dejavu');

  return function () {
    var cc = {};

    cc.util = require('./cc.util.js');

    for(var i = 0; i < arguments.length; i++) {
      var pkgname = arguments[i];

      var pkgnamesplit = pkgname.split('.');
      var tmpPkg = cc;
      pkgnamesplit.forEach(function(el, idx, array) {
        var subpkg = array.slice(idx, idx + 1).join('.');
        var subpkgpath = array.slice(0, idx + 1).join('.');
        if(cc.util.ObjectUtil.isDefined(cc, subpkgpath)) {
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
