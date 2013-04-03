if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu');

  parser = {};

  parser.IParser = dejavu.Interface.declare({
    $statics: {
      getSuffix: function() {}
    },
    parseContent: function(data) {}
  });

  parser.DefaultParser = dejavu.Class.declare({
    $implements: [parser.IParser],

    $statics: { 
      getSuffix: function() { return "html"; }
    },

    parseContent: function(data) {
      return {
        content: data 
      };
    }
  });

  var ParserRegistry = dejavu.Class.declare({
    $statics: {
      __defaultParser: new parser.DefaultParser(),
      __parserMap: new Object()
    },
    
    initialize: function() {
    },

    registerParser: function(suffix, parser) {
      this.$static.__parserMap[suffix] = parser;
    },

    getParserBySuffix: function(suffix) {
      if(this.$static.__parserMap.hasOwnProperty(suffix)) {
        return this.$static.__parserMap[suffix];
      }
      return this.$static.__defaultParser;
    }
  });

  parser.Registry = new ParserRegistry();

  return parser;
});
