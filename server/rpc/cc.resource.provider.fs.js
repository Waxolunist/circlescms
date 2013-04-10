if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      provider = require('./cc.resource.provider.js'),  
      util = require('./cc.util.js'),
      filecache = require('filecache'),
      nodefs = require('fs'),
      _ = require('underscore');

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
      if(!nodefs.existsSync(path)) {
        util.ExceptionUtil.throwResourceNotFoundException(path);
      }
      this._name = name;
      this._path = path;
      var fc = filecache(path, this.$static.__fcoptions);
      var that = this;
      fc.load(path, function(e, c) { 
         that._fc = c;
      });
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
          console.log(this._fc);
          if(nodefs.existsSync(p)) {
            return paths[idx];
          }
          
        }
      }
      return 404;
    }
  });

  return fs;
});
