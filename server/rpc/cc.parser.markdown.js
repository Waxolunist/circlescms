if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      parser = require('./cc.parser.js'),
      metamd = require('metamd');

  var markdown = {};

  markdown.MarkdownParser = dejavu.Class.declare({
    $implements: [parser.IParser],

    $statics: { 
      getSuffix: function() { return "md"; }
    },

    parseContent: function(data) {
      //TODO
      return {};
    }
  });

  parser.Registry.registerParser(
    markdown.MarkdownParser.getSuffix(),
    new markdown.MarkdownParser()
  );

  return markdown;
});
