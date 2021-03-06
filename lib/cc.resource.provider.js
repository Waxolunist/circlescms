/**
 * Provides the base classes for resource providers.
 * 
 * @module resource
 * @submodule resource.provider
 * 
 */
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function (require) {
  var dejavu = require('dejavu'),
    resource = require('./cc.resource.js'),
    util = require('./cc.util.js'),
    parser = require('./cc.parser.js'),
    _ = require('underscore'),
    provider = {};


 /**
  * This is the interface for a resource provider.
  *
  * @class IResourceProvider
  * @namespace resource.provider
  * @since 0.1
  */
  provider.IResourceProvider = dejavu.Interface.declare({

    /**
     * Returns the name of this resource provider.
     *
     * @method getName
     * @return {String} the name of this resource provider
     */
    getName: function () {},

    /**
     * Returns the item at the given path.
     *
     * @method readItem
     * @param {String} path the path read the item from
     * @param {Boolean} nocontent read content or only metadata
     * @return {resource.Item} the item at the given path
     */
    readItem: function (path, nocontent) {},

    /**
     * Returns the list at the given path.
     *
     * @method readList
     * @param {String} path the path read the list from
     * @return {resource.List} the list at the given path
     */
    readList: function (path, readitems) {},

    /**
     * Returns the first resource found. Takes an array as argument and looks up
     * each until a resource is found.
     *
     * TODO: Should be named readFirstThatExists.
     *
     * @method returnFirstThatExists
     * @param {Array} paths a list of paths to search for
     * @return {resource.IResource|Number} a resource at one of the given paths
     * or 404 if no resource is found
     */
    returnFirstThatExists: function (paths) {}
  });

  //TODO AbstractResourceProvider implementing skeleton for returnFirstThatExists

  provider.ProviderRegistry = dejavu.Class.declare({
    $name: 'resource.provider.ProviderRegistry',

    $statics: {
      __providerMap: {},
      __instance: null,
      getInstance: function () {
        if (this.$static.__instance) {
          return this.$static.__instance;
        }
        this.$static.__instance = new provider.ProviderRegistry();
        return this.$static.__instance;
      }
    },
    
    __initialize: function () {
      if (this.$self.__instance) {
        util.ExceptionUtil.throwIllegalStateException(
          "ProviderRegistry already initialized. Use getInstance!"
        );
      } else {
        this.$self.__instance = this;
      }
    },

    registerProvider: function (name, p) {
      if (util.ObjectUtil.instanceOf(p, provider.IResourceProvider)) {
        this.$static.__providerMap[name] = p;
      } else {
        util.ExceptionUtil.throwIllegalArgumentException(
          "Provider is not of type provider.IResourceProvider."
        );
      }
    },

    unregisterProvider: function (name) {
      delete this.$static.__providerMap[name];
    },

    getProviderByName: function (name) {
      return this.$static.__providerMap[name];
    }
  });

  provider.ResourceResolver = dejavu.Class.declare({
    $constants: {
      TEMPLATE_SUFFIX: 'html'
    },

    resolveContent: function (uri) {
      var ret = [];
      if (_.isString(uri) && uri !== "") {
        var registry = parser.ParserRegistry.getInstance(),
          isDirectoryPath = util.PathUtil.isDirectoryPath(uri);
        //has registered suffix
        if (registry.isSuffixRegistered(util.PathUtil.getSuffix(uri)) || isDirectoryPath) {
          ret.push(uri);
        } else if (!isDirectoryPath) {
          //get all suffixes
          registry.getAllRegisteredSuffixes().forEach(function (el) {
            if (el !== '') {
              ret.push([uri, el].join('.'));
            } else {
              ret.push(uri);
            }
          });
        }
        if (!isDirectoryPath) {
          ret.push(uri + '/');
        }
      }
      ret.push(404);
      return ret;
    },

    resolveTemplate: function (r) {
      if (dejavu.instanceOf(r, resource.IResource)) {
        var ret = [],
          basename = "";
        if(_.isString(r.getPath())) {
          basename = util.PathUtil.getBasename(r.getPath());
        } else if(_.isString(r.getUri())) {
          basename = util.PathUtil.getDirectory(r.getUri());
        }
        //filter empty elements
        var basesplit = basename.split('/').filter(function(el) {
          return el;
        });
        basesplit.forEach(function(el, idx, a){
          var folder = a.slice(0,a.length - idx).join('/');
          ret.push([folder, r.getType()].join(idx ? '/' : '.'));
        });
        ret.push(r.getType());
        return ret; 
      } else {
        return new Array();
      } 
    }
  });

  provider.ResourceFactory = dejavu.Class.declare({
    __resolver: null,
    __providerregistry: null,

    initialize: function() {
      this.__resolver = new provider.ResourceResolver();
      this.__providerregistry = provider.ProviderRegistry.getInstance();
    },

    getResource: function(providername, uri) {
      var provider = this.__providerregistry.getProviderByName(providername);
      var paths = this.__resolver.resolveContent(uri);
      var path = provider.returnFirstThatExists(paths);
      var r = null;
      //Should provide parser capabilities
      if(_.isFinite(path)) {
        r = new resource.Item(uri, path, "error");
        r.message = "Could not find content for '" + uri + "'.";
      } else if(util.PathUtil.isDirectoryPath(path)) {
        r = new resource.List(uri, path, "list");
        r = _.extend(r, provider.readList(path));
        //use returned list and parse each item
      } else {
        r = new resource.Item(uri, path, "item");
        r = _.extend(r, provider.readItem(path));
        //use returned content and parse item
      }
      r.setTemplates(this.__resolver.resolveTemplate(r));
      return r;
    }
    
  });

  return provider;
});
