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
    /**
     * Indicates the type `item`.
     *
     * @property ITEMTYPE
     * @readonly
     * @static
     * @final
     * @default item
     * @type String
     */
    ITEMTYPE: 'item',
    /**
     * Indicates the type `list`.
     *
     * @property LISTTYPE
     * @readonly
     * @static
     * @final
     * @default list
     * @type String
     */
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

  /**
   * Return the type of this resource.
   *
   * @method getType
   * @return {String} the type of this resource.
   * @default item
   */
  getType: function () {},

  /**
   * Return the supertype of this resource, which is either `list` or `item`.
   * This means, that nested type hierarchies are not supported.
   *
   * @method getSuperType
   * @return {String} the supertype of this resource.
   * @default item
   */
  getSuperType: function () {},

  /**
   * Return a list of possible templatenames to render this resource at the client.
   *
   * @method getTemplates
   * @return {Array} List of possible templatenames.
   */
  getTemplates: function () {},
});

/* Abstract implementations */

/**
 * Default implementation of {{#crossLink "resource.IResource"}}{{/crossLink}}.
 *
 * @class AbstractResource
 * @namespace resource
 * @extends resource.IResource
 * @since 0.1
 */
resource.AbstractResource = dejavu.AbstractClass.declare({
  $implements: [resource.IResource],

  /**
   * @property _uri
   * @type String
   * @default null
   * @protected
   * @since 0.1
   */
  _uri: null,

  /**
   * @property _path
   * @type String
   * @default null
   * @protected
   * @since 0.1
   */
  _path: null,

  /**
   * @property _type
   * @type String
   * @default null
   * @protected
   * @since 0.1
   */
  _type: null,

  /**
   * @property _supertype
   * @type String
   * @default null
   * @protected
   * @since 0.1
   */
  _supertype: null,

  /**
   * @property _templates
   * @type Array
   * @default null
   * @protected
   * @since 0.1
   */
  _templates: null,

  getUri: function () { return this._uri; },

  /**
   * Setter for uri.
   *
   * @method setUri
   * @param {String} uri
   */
  setUri: function (uri) { this._uri = uri; return this; },

  getPath: function () { return this._path; },
  /**
   * Setter for path.
   *
   * @method setPath
   * @param {String} path
   */
  setPath: function (path) { this._path = path; return this; },

  getType: function () { return this._type; },
  /**
   * Setter for Type.
   *
   * @method setType
   * @param {String} type
   */
  setType: function (type) { this._type = type; return this; },

  getSuperType: function () { return this._supertype; },
  /**
   * Setter for supertype.
   *
   * @method setSuperType
   * @param {String} supertype
   */
  setSuperType: function (supertype) { this._supertype = supertype; return this; },

  getTemplates: function () { return this._templates; },
  /**
   * Setter for templates.
   *
   * @method setTemplates
   * @param {Array} templates
   */
  setTemplates: function (templates) { this._templates = templates; return this; },

  /**
   * General serialization function. Serializes a {{#crossLink "resource.IResource"}}{{/crossLink}} to JSON.
   *
   * @method toJSON
   * @return {Object} this {{#crossLink "resource.IResource"}}{{/crossLink}} as JSON
   */
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

  /**
   * Implemenation of the type `item`.
   * All item-types should inherit from this class.
   *
   * @class Item
   * @constructor
   * @namespace resource
   * @extends resource.AbstractResource
   * @param {String} uri
   * @param {String} path
   * @param {String} type
   * @since 0.1
   */
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

  /**
   * Implemenation of the type `list`.
   * All list-types should inherit from this class.
   *
   * @class List
   * @constructor
   * @namespace resource
   * @extends resource.AbstractResource
   * @param {String} uri
   * @param {String} path
   * @param {String} type
   * @since 0.1
   */
  initialize: function(uri, path, type) {
    this.setSuperType(this.$static.LISTTYPE);

    this.setUri(uri);
    this.setPath(path);
    this.setType(type ? type : this.getSuperType());
  }
});

return resource;
});
