if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      cc = require('cc');

  cc.IParser = dejavu.Interface.declare({
    getSuffix: function() {},
    parseContent: function(data) {}
  });

  cc.MarkdownParser = dejavu.Class.declare({
    $implements: [cc.IParser],

    getSuffix: function() { return "md"; },

    parseContent: function(data) {
      //TODO
      return {};
    }
  });

  cc.DefaultParser = dejavu.Class.declare({
    $implements: [cc.IParser],

    getSuffix: function() { return "html"; },

    parseContent: function(data) {
      return {
        content: data 
      };
    }
  });
});
