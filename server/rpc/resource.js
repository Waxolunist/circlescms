var circles = {};

circles.Resolver = Class.extend({
  _suffixRe: /(?:\.([^./]+))?$/,
  _defaultsuffixes: ["md", "html"],
  _templatesuffix: "html",
  init: function() {},
  resolveTemplate: function(r) {
    if(r && r instanceof circles.Resource && 
      r.type && typeof r.type === 'string') {
      var ret = new Array();
      var basename = "";
      if(r.path && typeof r.path === 'string') {
        basename = this._getBasename(r.path);
      } else if(r.uri && typeof r.uri === 'string') {
        basename = this._getDirectory(r.uri);
      }
      var basesplit = basename.split('/').filter(function(el) {
        return el;
      });
      var basetemplate = [r.type, this._templatesuffix].join('.');
      basesplit.forEach(function(el, idx, a){
        var folder = a.slice(0,a.length - idx).join('/');
        ret.push([folder, basetemplate].join(idx ? '/' : '.'));
      });
      ret.push(basetemplate);
      return ret; 
    } else {
      return new Array();
    } 
  },
  resolveContent: function(uri) {
    var ret = new Array();
    if(uri && typeof uri === 'string') {
      if(this._hasDefaultSuffix(uri) || this._isDirectoryPath(uri)) {
        ret.push(uri);
      } else if(!this._isDirectoryPath(uri)) {
        this._defaultsuffixes.forEach(function(el) {
          ret.push([uri, el].join('.')); 
        });
      }
      if(!this._isDirectoryPath(uri)) {
        ret.push(uri + "/");
      }
    }
    ret.push(404);
    return ret;
  },
  _getSuffix: function(uri) {
    var ret = this._suffixRe.exec(uri)[1];
    return ret ? ret : "";
  },
  _getBasename: function(uri) {
    if(uri && typeof uri === 'string') {
      var suffix = this._getSuffix(uri);
      return uri.substring(0, uri.length - (suffix ? suffix.length + 1 : 0));
    }
    return "";
  },
  _hasDefaultSuffix: function(uri) {
    return this._defaultsuffixes.indexOf(this._getSuffix(uri)) >= 0;
  },
  _isDirectoryPath: function(uri) {
    return uri && uri.charAt && uri.charAt(uri.length-1) == '/';
  },
  _getDirectory: function(uri) {
    if(uri && typeof uri === 'string') {
      return uri.substring(0, uri.lastIndexOf('/') + 1);
    }
    return "";
  }
});

var resolver = new circles.Resolver();

circles.Resource = Class.extend({
  init: function(uri, path, type) {
    this.uri = uri;
    this.path = path;
    this.type = type;
  }
});

var Git = require("git-fs");
Git("../circlescms-content");

circles.ResourceFactory = Class.extend({
  init: function(){},
  getNewInstance: function(hash) {
    var uri = hash.substring(1);
    var lookuppaths = resolver.resolveContent(uri);
    lookuppaths.forEach(function(el,idx,a) {
      if(resolver._isDirectoryPath(el)) {
        Git.getHead(function(err, sha) {
          if(err) continue;
          Git.readDir(sha, el, function(err, data) {
            if(err) continue;
            //read Dir
          });
        });
      } else if (typeof el === 'string') {
        //read File
      } else {
        //error
      }

      //does el exist
      //
    }); 
    //TODO
    //getfile or directory
    //determine type
  }
});
