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

    setCache: function (cache) {
      this._fc = cache;
      return this;
    },

    getName: function () {
      return this._name;
    },

    readItem: function (p) {
      var parserregistry = parser.ParserRegistry.getInstance(),
        parserimpl = parserregistry.getParserBySuffix(util.PathUtil.getSuffix(p)),
        content,
        parsedcontent;
      if (!this._fc) {
        content = nodefs.readFileSync(path.join(this._path, p));
        parsedcontent = parserimpl.parseContent(content.toString());
      } else {
        content = this._fc["/" + p].toString();
        parsedcontent = parserimpl.parseContent(content);
      }
      return _.extend(parsedcontent, { 'path': p });
    },

    readList: function (p, readitems) {
      var filelist,
        items = [],
        that = this,
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
          items.push(that.readItem(el));
        } else {
          items.push(el);
        }
      });
      return {
        items: items
      };
    },

    returnFirstThatExists: function (paths) {
      if (_.isArray(paths)) {
        for (idx in paths) {
          var p = paths[idx];
          if(p === 404) {
            break;
          }
          var isDir = false;
          if(util.PathUtil.isDirectoryPath(p)) {
            p = p.slice(0, -1);
            isDir = true;
          }
          if(!this._fc) {
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
