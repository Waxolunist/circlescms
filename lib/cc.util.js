if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      _ = require('underscore');

  var util = {};

  /* Utiltiy class for paths on the filesystem. */
  util.PathUtil = dejavu.Class.declare({
    $statics: {
      __suffixRe: /(?:\.([^./]+))?$/,
      getBasename: function(path) {
        if(_.isString(path)) {
          var suffix = this.$static.getSuffix(path);
          return path.substring(0, path.length - (suffix ? suffix.length + 1 : 0));
        }
        return "";
      },

      getDirectory: function(path) {
        if(_.isString(path)) {
          return path.substring(0, path.lastIndexOf('/') + 1);
        }
        return "";
      },

      getSuffix: function(path) {
        var ret = this.$static.__suffixRe.exec(path)[1];
        return ret ? ret : "";
      },

      isDirectoryPath: function(path) {
        return _.isString(path) && path.charAt(path.length-1) == '/';
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
            if (_.isObject(o) && n in o) {
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
            if(_.isArray(s)) {
              return !!this.$static.getProperty(o, s.join('.'));
            } else if(_.isString(s)) {
              return !!this.$static.getProperty(o, s);
            } else {
              return false;
            }
          }
          return false;
      },

      instanceOf: function(i, c) {
        return _.isFunction(c) && dejavu.instanceOf(i, c);
      }
    }
  });

  util.Preconditions = dejavu.Class.declare({
    $statics: {
      checkNotEmptyString: function(s) {
        if(!_.isString(s) || s == "") {
          util.ExceptionUtil.throwIllegalArgumentException("Check for non empty String failed: " + s);
        }
      }
    }
  });

  util.ExceptionUtil = dejavu.Class.declare({
    $statics: {
      throwIllegalArgumentException: function(m) {
        this.$static.__throwException("IllegalArgumentException", m);
      },
      throwIllegalStateException: function(m) {
        this.$static.__throwException("IllegalStateException", m);
      },
      throwResourceNotFoundException: function(path) {
        this.$static.__throwException("ResourceNotFoundException", "Resource " + path + " could not be found.");
      },
      __throwException: function(n,m) {
        throw {
          name: n,
          message: m
        };
      }
    }
  });

  return util;
});
