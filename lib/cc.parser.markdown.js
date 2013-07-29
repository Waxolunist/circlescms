/**
 * Provides a parser for markdown files.
 * 
 * @module parser
 * @submodule parser.markdown
 * 
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      parser = require('./cc.parser.js'),
      metamd = require('metamd'),
      _ = require('underscore');

  var markdown = {};

  /**
   * Implements the interface {{#crossLink "parser.IParser"}}{{/crossLink}} 
   * and parses markdown files with metadata using [metamd](https://github.com/chrisjaure/metamd).
   *
   * This parser implementation is automatic registered in the 
   * {{#crossLink "parser.ParserRegistry"}}{{/crossLink}} with the suffix `md`.
   *
   * @class MarkdownParser
   * @namespace parser.markdown
   * @constructor
   * @extends parser.IParser
   * @since 0.1
   */
  markdown.MarkdownParser = dejavu.Class.declare({
    $implements: [parser.IParser],

    $statics: { 
      /**
       * Returns by default `md`.
       *
       * @method getSuffix
       * @return {String} `md`
       * @static
       */
      getSuffix: function() { return "md"; }
    },

    /**
     * Returns the rendered data enhanced with the containing metadata.
     * Metadata in markdown is a property name followed by a colon and 
     * the value, e.g.
     *
     *     key: value
     *
     * Each key is a property. The body of the markdown is stored as property
     * `content`.
     *
     * @method parseContent
     * @param {String} data the markdown to process
     * @param {Boolean} nocontent retrieve the content or just the metadata
     * @return {Object} An object containing the data
     */
    parseContent: function (data, nocontent) {
      var metaobject = metamd(data);
      var metadata = metaobject.getData();
      if (_.isUndefined(nocontent) || nocontent === false) { 
        var html = { content: metaobject.getHtml() };
        metadata = _.extend(metadata, html);
      }
      return metadata;
    }
  });

  parser.ParserRegistry.getInstance().registerParser(
    markdown.MarkdownParser.getSuffix(),
    new markdown.MarkdownParser()
  );

  return markdown;
});
