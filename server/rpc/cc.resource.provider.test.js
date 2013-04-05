if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      provider = require('./cc.resource.provider.js'),  
      util = require('./cc.util.js');

  var test = {};

  test.TestResourceProvider = dejavu.Class.declare({
    $implements: [provider.IResourceProvider],

    $statics: {
      __tree: {
        "a": {
          "b": "Content of b",
          "c": "Content of c",
          "d": {
            "e": "Content of e",
            "f": "Content of f"
          }
        },
        "g": "Content of g",
        "h": "Content of h"
      }
    },

    _name: null,

    initialize: function(name) {
      this._name = name;
    },

    getName: function() { 
      return this._name; 
    },

    readItem: function(path) {
      var propertypath = path.replace(/\//g, ".");
      return {
        content: util.ObjectUtil.getProperty(this.$static.__tree, propertypath)
      };
    },
    
    readList: function(path) {
      var propertypath = path.replace(/\//g, ".");
      var list = new Array();
      var subtree = util.ObjectUtil.getProperty(this.$static.__tree, propertypath);
      for(key in subtree) {
        if(util.ObjectUtil.isString(subtree[key])) {
          list.push(key);
        } else {
          list.push(key + "/");
        }
      }
      return list; 
    },

    returnFirstThatExists: function(paths) {
      for(idx in paths) {
        var p = paths[idx];
        var isDir = false;
        if(p.charAt(p.length-1) == '/') {
          p = p.slice(0, -1);
          isDir = true;
        }
        var propertypath = p.replace(/\//g, ".");
        var subtree = util.ObjectUtil.getProperty(this.$static.__tree, propertypath);
        if(subtree) {
          if((util.ObjectUtil.isString(subtree) && !isDir) || isDir) {
            return paths[idx];
          }
        }
      }
      return;
    }
  });

  return test;
});
