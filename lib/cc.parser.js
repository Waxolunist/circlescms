/**
 * Provides the base classes for parsing.
 * 
 * @module parser
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      util = require('./cc.util.js');
  var parser = {};

  /**
   * This is the interface for a content parser.
   *
   * @class IParser
   * @namespace parser
   * @since 0.1
   */
  parser.IParser = dejavu.Interface.declare({
    $statics: {
      /**
       * Returns the static typed default suffix, this parser is used to.
       *
       * @method getSuffix
       * @return {String} the suffix, e.g. `html`
       * @static
       */
      getSuffix: function() {}
    },

    /**
     * Parses the data and outputs the content to be rendered.
     * 
     * Should return an object as follows:
     *
     *     {
     *       content: <content to render>
     *     }
     *
     * @method parseContent
     * @param {String} data the data to be rendered.
     * @return {Object} A object containing the content to be rendered as property 'content'.
     */
    parseContent: function(data) {}
  });

  /**
   * Default implementation of the interface {{#crossLink "parser.IParser"}}{{/crossLink}}.
   *
   * @class DefaultParser
   * @namespace parser
   * @extends parser.IParser
   * @since 0.1
   */
  parser.DefaultParser = dejavu.Class.declare({
    $implements: [parser.IParser],
    $name: 'parser.DefaultParser',

    $statics: { 
      /**
       * Returns by default `html`.
       *
       * @method getSuffix
       * @return {String} `html`
       * @static
       */
      getSuffix: function() { return "html"; }
    },

    parseContent: function(data) {
      return {
        content: data 
      };
    }
  });

  /**
   * Registry for parsers. This class is a **Singleton**.
   *
   * @class ParserRegistry
   * @namespace parser
   * @since 0.1
   */
  parser.ParserRegistry = dejavu.Class.declare({
    $name: 'parser.ParserRegistry',

    $statics: {
      __defaultParser: new parser.DefaultParser(),
      __parserMap: new Object(),
      __instance: null,

      /**
       * Returns a new instance of the registry or if one already exists the existing one.
       *
       * @method getInstance
       * @return {parser.ParserRegistry} the singleton instance
       * @static
       */
      getInstance: function() {
        if(this.$self.__instance) {
          return this.$self.__instance;
        }
        this.$self.__instance = new parser.ParserRegistry();
        return this.$self.__instance;
      }
    },
    
    /**
     * Initializes the registry. Throws an exception if the registry is already initialized.
     *
     * Don't use this method directly. Instead call {{#crossLink "parser.ParserRegistry/getInstance"}}{{/crossLink}}
     *
     * @method __initialize
     * @private
     */
    __initialize: function() {
      if(this.$self.__instance) {
        util.ExceptionUtil.throwIllegalStateException("ParserRegistry already initialized. Use getInstance!");
      } else {
        this.$self.__instance = this;
      }
    },

    /**
     * Register a parser with the suffix given.
     *
     * @method registerParser
     * @param {String} suffix The suffix to register this parser for.
     * @param {parser.IParser} p An implementation of {{#crossLink "parser.IParser"}}{{/crossLink}}
     */
    registerParser: function(suffix, p) {
      if(util.ObjectUtil.instanceOf(p, parser.IParser)) {
        this.$static.__parserMap[suffix] = p;
      } else {
        util.ExceptionUtil.throwIllegalArgumentException("parser is not of type parser.IParser.");
      }
    },
    
    /**
     * Unregister a parser with the suffix given.
     *
     * @method unregisterParser
     * @param {String} suffix The suffix the unregister.
     */
    unregisterParser: function(suffix) {
      delete this.$static.__parserMap[suffix];
    },

    /**
     * Unregisters all parsers from this registry.
     *
     * @method unregisterAll
     */
    unregisterAll: function() {
      this.$static.__parserMap = new Object();
    },

    /**
     * Retrieve a registered {{#crossLink "parser.IParser"}}{{/crossLink}}.
     *
     * @method getParserBySuffix
     * @param {String} suffix The suffix to retrieve a parser for.
     * @return {parser.IParser} the registerd parser or if no parser is found an instance of {{#crossLink "parser.DefaultParser"}}{{/crossLink}}
     */
    getParserBySuffix: function(suffix) {
      if(this.isSuffixRegistered(suffix)) {
        return this.$static.__parserMap[suffix];
      }
      return this.$static.__defaultParser;
    },

    /**
     * Tests if a {{#crossLink "parser.IParser"}}{{/crossLink}} with the given suffix is registered.
     *
     * @method isSuffixRegistered
     * @param {String} suffix The suffix to test against.
     * @return {boolean} true if a parser is found in the registry, otherwise false.
     */
    isSuffixRegistered: function(suffix) {
      return this.$static.__parserMap.hasOwnProperty(suffix);
    },

    /**
     * Returns a list of registered suffixes.
     *
     * @method getAllRegisteredSuffixes
     * @return {Array} All registered suffixes.
     */
    getAllRegisteredSuffixes: function() {
      return Object.keys(this.$static.__parserMap);
    }
  });

  return parser;
});
