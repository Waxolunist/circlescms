/**
 * Provides the base classes for resource handling.
 * 
 * @module resource
 */
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu');

resource = {};

/* Interfaces */

/**
 * This is the interface for a resource.
 *
 * @class IResource
 * @namespace resource
 * @since 0.1
 */
resource.IResource = dejavu.Interface.declare({
  $constants: {
    ITEMTYPE: 'item',
    LISTTYPE: 'list'
  },

  /**
   * Return the uri of this resource.
   *
   * @method getUri
   * @return {String} the uri of this resource.
   */
  getUri: function () {},
  
  /**
   * Return the path of this resource.
   *
   * @method getPath
   * @return {String} the path of this resource.
   */
  getPath: function () {},
  getType: function () {},
  getSuperType: function () {},
  getTemplates: function () {},
});

/* Abstract implementations */
resource.AbstractResource = dejavu.AbstractClass.declare({
  $implements: [resource.IResource],

  _uri: null,
  _path: null,
  _type: null,
  _supertype: null,
  _templates: null,

  getUri: function () { return this._uri; },
  setUri: function (uri) { this._uri = uri; return this; },

  getPath: function () { return this._path; },
  setPath: function (path) { this._path = path; return this; },

  getType: function () { return this._type; },
  setType: function (type) { this._type = type; return this; },

  getSuperType: function () { return this._supertype; },
  setSuperType: function (supertype) { this._supertype = supertype; return this; },

  getTemplates: function () { return this._templates; },
  setTemplates: function (templates) { this._templates = templates; return this; },

  toJSON: function() {
    var replacement = new Object();
    for (val in this) {
      var idx = val;
      if(val.charAt(0) === '_') {
        idx = val.substr(1);
      }
      replacement[idx] = this[val];
    }
    return replacement;
  }
});

/* Implementations */
resource.Item = dejavu.Class.declare({
  $extends: resource.AbstractResource,
  $locked: false,
  $name: "cc.resource.Item",

  initialize: function(uri, path, type) {
    this.setSuperType(this.$static.ITEMTYPE);

    this.setUri(uri);
    this.setPath(path);
    this.setType(type ? type : this.getSuperType());
  }
});

resource.List = dejavu.Class.declare({
  $extends: resource.AbstractResource,
  $locked: false,
  $name: "cc.resource.List",

  initialize: function(uri, path, type) {
    this.setSuperType(this.$static.LISTTYPE);

    this.setUri(uri);
    this.setPath(path);
    this.setType(type ? type : this.getSuperType());
  }
});

return resource;
});
