/**
 * Provides a resource provider for the file system.
 * 
 * @module resource
 * @submodule resource.provider.fs
 * 
 */
var define;
if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function (require) {
  var dejavu = require('dejavu'),
    provider = require('./cc.resource.provider.js'),
    parser = require('./cc.parser.js'),
    util = require('./cc.util.js'),
    filecache = require('filecache'),
    //my package is actually fs called, thus I will call this nodefs
    nodefs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    fs = {};
  _.str = require('underscore.string');
  _.mixin(_.str.exports());

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

    /**
     * Class that implements a resource provider, storing data in the filesystem.
     * This provider is aware of changes of the files cached if preemptive caching
     * is enabled. It preemptive
     * caches all files in path and watches them. Therefore it uses the library
     * [filecache](https://github.com/oleics/node-filecache).
     *
     * Throws a {{#crossLink "util.ExceptionUtil/throwResourceNotFoundException"}}
     * ResourceNotFoundException{{/crossLink}} if the directory path does not exist.
     *
     * @class FsResourceProvider
     * @namespace resource.provider.fs
     * @extends resource.provider.IResourceProvider
     * @since 0.1
     * @constructor
     * @param {String} name
     * @param {String} path
     * @param {Function} oncacheinit If given, a cache is initialized. 
     * If not, the provider works without cache and hits the filesystem on every request.
     */
    initialize: function (name, path, oncacheinit) {
      util.Preconditions.checkNotEmptyString(name);
      util.Preconditions.checkNotEmptyString(path);
      if (!nodefs.existsSync(path)) {
        util.ExceptionUtil.throwResourceNotFoundException(path);
      }
      this._name = name;
      this._path = path;

      if (_.isFunction(oncacheinit)) {
        var fc = filecache(path, this.$static.__fcoptions),
          that = this;
        fc.on('done', function () {
          that.setCache(fc.cache);
          oncacheinit.call(that, that);
        });
      }
    },

    /**
     * Sets the cache. The cache will used read only using the 
     * path to a resource as key. The cache is internally set in the
     * constructor, but it can be overwritten.
     *
     * @method setCache
     * @param {Object} cache HashMap to use for caching
     * @since 0.1
     */
    setCache: function (cache) {
      this._fc = cache;
      return this;
    },

    /**
     * @method getName
     * @since 0.1
     */
    getName: function () {
      return this._name;
    },

    /**
     * @method readItem
     * @since 0.1
     */
    readItem: function (p, nocontent) {
      //TODO should only return content
      var parserregistry = parser.ParserRegistry.getInstance(),
        parserimpl = parserregistry.getParserBySuffix(util.PathUtil.getSuffix(p)),
        content,
        parsedcontent;
      if (!this._fc) {
        content = nodefs.readFileSync(path.join(this._path, p));
        parsedcontent = parserimpl.parseContent(content.toString(), nocontent);
      } else {
        content = this._fc["/" + p].toString();
        parsedcontent = parserimpl.parseContent(content, nocontent);
      }
      return _.extend(parsedcontent, { 'path': p });
    },

    /**
     * @method readList
     * @since 0.1
     */
    readList: function (p, readitems) {
      var filelist,
        items = [],
        read = _.isUndefined(readitems) || readitems;

      if (!this._fc) {
        filelist = nodefs.readdirSync(path.join(this._path, p));
        filelist = _.map(filelist, function (s) {
          return path.join(p, s);
        });
      } else {
        filelist = _.filter(_.keys(this._fc), function (name) {
          return _(name).startsWith("/" + p);
        });
        filelist = _.map(filelist, function (s) {
          return s.substr(1);
        });
      }
      _.each(filelist, function (el, idx, a) {
        if (read) {
          items.push(this.readItem(el, true));
        } else {
          items.push(el);
        }
      }, this);
      return {
        items: items
      };
    },

    /**
     * @method returnFirstThatExists
     * @since 0.1
     */
    returnFirstThatExists: function (paths) {
      if (_.isArray(paths)) {
        for (idx in paths) {
          var p = paths[idx];
          if (p === 404) {
            break;
          }
          var isDir = false;
          if (util.PathUtil.isDirectoryPath(p)) {
            p = p.slice(0, -1);
            isDir = true;
          }
          if (!this._fc) {
            //if no cache is defined
            if (nodefs.existsSync(path.join(this._path, p))) {
              if (!isDir && nodefs.statSync(path.join(this._path, p)).isDirectory()) {
                return paths[idx] + "/";
              } else {
                return paths[idx];
              }
            }
          } else {
            if (!isDir && this._fc["/" + p]) {
              return paths[idx];
            } else if (isDir) {
              if (_.some(_.keys(this._fc), function(name) {
                  return _(name).startsWith("/" + p);
              })) {
                return paths[idx];
              }
            }
          }
        }
      }
      return 404;
    }
  });

  return fs;
});
