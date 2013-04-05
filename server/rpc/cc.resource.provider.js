if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      resource = require('./cc.resource.js'),
      util = require('./cc.util.js'),
      parser = require('./cc.parser.js');

  var provider = {};

  provider.IResourceProvider = dejavu.Interface.declare({
    getName: function() {},
    readItem: function(path) {},
    readList: function(path) {},
    returnFirstThatExists: function(paths) {}
  });

  provider.ProviderRegistry = dejavu.Class.declare({
    $name: 'resource.provider.ProviderRegistry',

    $statics: {
      __providerMap: new Object(),
      __instance: null,
      getInstance: function() {
        if(this.$self.__instance) {
          return this.$self.__instance;
        }
        this.$self.__instance = new provider.ProviderRegistry();
        return this.$self.__instance;
      }
    },
    
    __initialize: function() {
      if(this.$self.__instance) {
        util.ExceptionUtil.throwIllegalStateException("ProviderRegistry already initialized. Use getInstance!");
      } else {
        this.$self.__instance = this;
      }
    },

    registerProvider: function(name, provider) {
      this.$static.__providerMap[name] = provider;
    },

    unregisterProvider: function(name) {
      delete this.$static.__providerMap[name];
    },

    getProviderByName: function(name) {
      return this.$static.__providerMap[name];
    }
  });

  provider.ResourceResolver = dejavu.Class.declare({
    $constants: {
      TEMPLATE_SUFFIX: 'html'
    },

    resolveContent: function(uri) {
      var ret = new Array();
      if(util.ObjectUtil.isString(uri)) {
        var registry = parser.ParserRegistry.getInstance();
        var isDirectoryPath = util.PathUtil.isDirectoryPath(uri);
        //has registered suffix
        if(registry.isSuffixRegistered(util.PathUtil.getSuffix(uri)) || isDirectoryPath) {
          ret.push(uri);
        } else if(!isDirectoryPath) {
          //get all suffixes
          registry.getAllRegisteredSuffixes().forEach(function(el) {
            ret.push([uri, el].join('.')); 
          });
        }
        if(!isDirectoryPath) {
          ret.push(uri + '/');
        }
      }
      ret.push(404);
      return ret;
    },

    resolveTemplate: function(r) {
      if(dejavu.instanceOf(r, resource.IResource)) {
        var ret = new Array();
        var basename = "";
        if(util.ObjectUtil.isString(r.getPath())) {
          basename = util.PathUtil.getBasename(r.getPath());
        } else if(util.ObjectUtil.isString(r.getUri())) {
          basename = util.PathUtil.getDirectory(r.getUri());
        }
        //filter empty elements
        var basesplit = basename.split('/').filter(function(el) {
          return el;
        });
        var basetemplate = [r.getType(), this.$static.TEMPLATE_SUFFIX].join('.');
        basesplit.forEach(function(el, idx, a){
          var folder = a.slice(0,a.length - idx).join('/');
          ret.push([folder, basetemplate].join(idx ? '/' : '.'));
        });
        ret.push(basetemplate);
        return ret; 
      } else {
        return new Array();
      } 
    }
  });

  var ResourceFactory = dejavu.Class.declare({
    __resolver: new provider.ResourceResolver(),

    getResource: function(uri) {
      //TODO
    }
    
  });

  provider.ResourceFactory = new ResourceFactory();

  return provider;
});
