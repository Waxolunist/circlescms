if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      provider = require('./cc.resource.provider.js');  

  var fs = {};

  fs.FsResourceProvider = dejavu.Class.declare({
    $implements: [provider.IResourceProvider],

    _name: null,
    _path: null,

    initialize: function(name, path) {
      this._name = name;
      this._path = path;
    },

    getName: function() { 
      return name; 
    },

    readItem: function(uri) {
      //TODO
    },
    
    readList: function(uri) {
      //TODO
    }
  });

  return fs;
});
