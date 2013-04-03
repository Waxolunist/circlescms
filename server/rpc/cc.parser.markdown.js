if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      cc = require('./cc.parser.js'),
      metamd = require('metamd');

  cc.parser.markdown = {};

  cc.parser.markdown.MarkdownParser = dejavu.Class.declare({
    $implements: [cc.parser.IParser],

    $statics: { 
      getSuffix: function() { return "md"; }
    },

    parseContent: function(data) {
      //TODO
      return {};
    }
  });

  cc.parser.Registry.registerParser(
    cc.parser.markdown.MarkdownParser.getSuffix(),
    new cc.parser.markdown.MarkdownParser()
  );

  return cc;
});
