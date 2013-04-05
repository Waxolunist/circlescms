if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      resource = require('./cc.resource.js');

  var provider = {};

  provider.IResourceProvider = dejavu.Interface.declare({
    getName: function() {},
    readItem: function(uri) {},
    readList: function(uri) {}
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

    registerProvider: function(suffix, provider) {
      this.$static.__providerMap[suffix] = provider;
    },

    getProviderByName: function(name) {
      return this.$static.__providerMap[name];
    }
  });

  provider.ResourceResolver = dejavu.Class.declare({
    resolveContent: function(uri) {
      var ret = new Array();
      if(util.ObjectUtil.isString(uri)) {
        var isDirectoryPath = util.PathUtil.isDirectoryPath(uri);
        //TODO
        //has registered suffix
        if(this._hasDefaultSuffix(uri) || isDirectoryPath) {
          ret.push(uri);
        } else if(!uri) {
          //TODO
          //get all suffixes
          this._defaultsuffixes.forEach(function(el) {
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
    resolveTemplate: function(resource) {
      //TODO
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
