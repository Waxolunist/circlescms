if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      provider = require('./cc.resource.provider.js'),  
      util = require('./cc.util.js'),
      _ = require('underscore');

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
        "h": "Content of h",
        "about": "Content of about",
        "resume": "Content of resume",
        "projects": "Content of projects",
        "blog": {
          "1": {
            "title": "Title 1",
            "date": "2013-01-01",
            "content": "Some example content"
          },
          "2": {
            "title": "Title 1",
            "date": "2013-01-01",
            "content": "Some example content"
          }
        }
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
    
    readList: function(path, readlist) {
      var p = path.replace(/\/$/, "");
      var propertypath = p.replace(/\//g, ".");
      var list = new Array();
      var subtree = util.ObjectUtil.getProperty(this.$static.__tree, propertypath);
      for(key in subtree) {
        if(_.isString(subtree[key])) {
          list.push(key);
        } else {
          list.push(key + "/");
        }
      }
      return {
        resources: list
      };
    },

    returnFirstThatExists: function(paths) {
      if(_.isArray(paths)) {
        for(idx in paths) {
          var p = paths[idx];
          if(p === 404) {
            break;
          }
          var isDir = false;
          if(util.PathUtil.isDirectoryPath(p)) {
            p = p.slice(0, -1);
            isDir = true;
          }
          var propertypath = p.replace(/\//g, ".");
          var subtree = util.ObjectUtil.getProperty(this.$static.__tree, propertypath);
          if(subtree) {
            if((_.isString(subtree) && !isDir) || isDir) {
              return paths[idx];
            }
          }
        }
      }
      return 404;
    }
  });

  return test;
});
