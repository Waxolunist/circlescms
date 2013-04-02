if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu');

  var cc = {};

  /* Interfaces */
  cc.IResource = dejavu.Interface.declare({
    $constants: {
      ITEMTYPE: 'item',
      LISTTYPE: 'list'
    },

    getUri: function () {},
    getPath: function () {},
    getType: function () {},
    getSuperType: function () {},
    getTemplates: function () {},
  });

  /* Abstract implementations */
  cc.AbstractResource = dejavu.AbstractClass.declare({
    $implements: [cc.IResource],

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
  });

  /* Implementations */
  cc.Item = dejavu.Class.declare({
    $extends: cc.AbstractResource,

    initialize: function(uri, path, type) {
      this.setSuperType(this.$static.ITEMTYPE);

      this.setUri(uri);
      this.setPath(path);
      this.setType(type ? type : this.getSuperType());
    }
  });

  cc.List = dejavu.Class.declare({
    $extends: cc.AbstractResource,

    initialize: function(uri, path, type) {
      this.setSuperType(this.$static.LISTTYPE);

      this.setUri(uri);
      this.setPath(path);
      this.setType(type ? type : this.getSuperType());
    }
  });

  if (window !== undefined) {
    window.cc = cc;
  }

  return cc;
//define end
});
