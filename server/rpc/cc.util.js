if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu');

  var util = {};

  util.PathUtil = dejavu.Class.declare({
    $statics: {
      getBasename: function(path) {
        //TODO
      },

      getDirectory: function(path) {
        //TODO
      },

      getSuffix: function(path) {
        //TODO
      },

      isDirectoryPath: function(path) {
        //TODO
      }
    }
  });

  util.ObjectUtil = dejavu.Class.declare({
    $statics: {
      getProperty: function(o, s) {
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
      },
      
      isDefined: function(o, s) {
          if(o) {
            if(this.$static.isArray(s)) {
              return !!this.$static.getProperty(o, s.join('.'));
            } else if(this.$static.isString(s)) {
              return !!this.$static.getProperty(o, s);
            } else {
              return false;
            }
          }
          return false;
      },

      isString: function(s) {
        return !!s && typeof s === 'string';
      },

      isArray: function(a) {
        return !!a && a instanceof Array;
      }
    }
  });

  util.Preconditions = dejavu.Class.declare({
    $statics: {
      checkNotEmptyString: function(s) {
        if(!util.ObjectUtil.isString(s)) {
          this.$static.__throwIllegalArgumentException("Check for non empty String failed: " + s);
        }
      },
      
      __throwIllegalArgumentException: function(m) {
        throw {
          name: "IllegalArgumentException",
          message: m
        };
      }
    }
  });

  return util;
});
