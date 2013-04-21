if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      provider = require('./cc.resource.provider.js'),
      util = require('./cc.util.js');  

  var git = {};

  git.GitResourceProvider = dejavu.Class.declare({
    $implements: [provider.IResourceProvider],

    _name: null,
    _path: null,

    initialize: function(name, path) {
      util.Preconditions.checkNotEmptyString(name);
      util.Preconditions.checkNotEmptyString(path);
      this._name = name;
      this._path = path;
    },

    getName: function() { 
      return this._name; 
    },

    readItem: function(uri) {
      //TODO
    },
    
    readList: function(uri) {
      //TODO
    },

    returnFirstThatExists: function(paths) {
      //TODO
    }
  });

  return git;
});
