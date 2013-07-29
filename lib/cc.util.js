/**
 * Provides some utility classes.
 * 
 * @module util
 * 
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      _ = require('underscore');

  var util = {};

  /**
   * Utiltiy class for paths on the filesystem. 
   * 
   * @class PathUtil
   * @namespace util
   * @since 0.1
   */
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

  /**
   * Static class which checks parameters and throws a
   * {{#crossLink "util.ExceptionUtil/throwIllegalArgumentException"}}
   * IllegalArgumentException{{/crossLink}} if the condition is not fulfilled.
   *
   * @class Preconditions
   * @namespace util
   * @since 0.1
   */
  util.Preconditions = dejavu.Class.declare({
    $statics: {

      /**
       * Checks if the parameter `s` is of type String using 
       * [underscorejs](http://underscorejs.org/#isString).
       *
       * If not, it throws an {{#crossLink "util.ExceptionUtil/throwIllegalArgumentException"}}
       * IllegalArgumentException{{/crossLink}} with the message 
       * `Check for non empty String failed: {s}`.
       *
       * @method checkNotEmptyString
       * @param {ANY} s parameter to check
       */
      checkNotEmptyString: function (s) {
        if (!_.isString(s) || s === "") {
          util.ExceptionUtil.throwIllegalArgumentException("Check for non empty String failed: "
                                                           + s);
        }
      }
    }
  });

  /**
   * Utility class to throw predefined exceptions.
   *
   * @class ExceptionUtil
   * @namespace util
   * @since 0.1
   */
  util.ExceptionUtil = dejavu.Class.declare({
    $statics: {
      /**
       * Throws an Exception with the *name* `IllegalArgumentException` and
       * the *message* `m`.
       *
       * @method throwIllegalArgumentException
       * @static
       * @param {String} m Message
       * @since 0.1
       */
      throwIllegalArgumentException: function(m) {
        this.$static.__throwException("IllegalArgumentException", m);
      },
      
      /**
       * Throws an Exception with the *name* `IllegalStateException` and
       * the *message* `m`.
       *
       * @method throwIllegalStateException
       * @static
       * @param {String} m Message
       * @since 0.1
       */
      throwIllegalStateException: function(m) {
        this.$static.__throwException("IllegalStateException", m);
      },

      /**
       * Throws an Exception with the *name* `ResourceNotFoundException` and
       * the *message* `Resource {path} could not be found.`.
       *
       * @method throwResourceNotFoundException
       * @static
       * @param {String} path The path to the resource, which could not be found.
       * @since 0.1
       */
      throwResourceNotFoundException: function(path) {
        this.$static.__throwException("ResourceNotFoundException", "Resource " + path + " could not be found.");
      },

      /**
       * Common method to throw an exception with the parameters given.
       *
       * @method __throwException
       * @static
       * @param {String} n Name
       * @param {String} m Message
       * @since 0.1
       * @private
       */
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
