if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      resource = require('./cc.resource.js');

  provider = {};

  provider.IResourceProvider = dejavu.Interface.declare({
    getName: function() {},
    readItem: function(uri) {},
    readList: function(uri) {}
  });

  var ProviderRegistry = dejavu.Class.declare({
    $statics: {
      __providerMap: new Object()
    },
    
    initialize: function() {
    },

    registerProvider: function(suffix, provider) {
      this.$static.__providerMap[suffix] = provider;
    },

    getProviderByName: function(name) {
      return this.$static.__providerMap[name];
    }
  });

  provider.Registry = new ProviderRegistry();

  provider.ResourceResolver = dejavu.Class.declare({
    resolveContent: function(uri) {
      //TODO
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
