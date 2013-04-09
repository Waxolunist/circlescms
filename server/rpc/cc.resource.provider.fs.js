if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      provider = require('./cc.resource.provider.js'),  
      util = require('./cc.util.js'),
      filecache = require('filecache');


  var fs = {};

  fs.FsResourceProvider = dejavu.Class.declare({
    $implements: [provider.IResourceProvider],

    $statics: {
      __fcoptions: {
        watchDirectoryChanges: true, 
        watchFileChanges: true,
        hashAlgo: 'sha1',
        gzip: false,
        deflate: false
      }
    },

    _name: null,
    _path: null,
    _fc: null,

    initialize: function(name, path) {
      util.Preconditions.checkNotEmptyString(name);
      util.Preconditions.checkNotEmptyString(path);
      this._name = name;
      this._path = path;
      this._fc = filecache(path, this.$static.__fcoptions);
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
          //TODO doesfileexist
          if(fileexists) {
            return paths[idx];
          }
          
        }
      }
      return 404;
    }
  });

  return fs;
});
