if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      parser = require('./cc.parser.js'),
      metamd = require('metamd'),
      _ = require('underscore');

  var markdown = {};

  markdown.MarkdownParser = dejavu.Class.declare({
    $implements: [parser.IParser],

    $statics: { 
      getSuffix: function() { return "md"; }
    },

    parseContent: function (data) {
      var metaobject = metamd(data);
      var metadata = metaobject.getData();
      var html = { content: metaobject.getHtml() };
      return _.extend(metadata, html);
    }
  });

  parser.ParserRegistry.getInstance().registerParser(
    markdown.MarkdownParser.getSuffix(),
    new markdown.MarkdownParser()
  );

  return markdown;
});
