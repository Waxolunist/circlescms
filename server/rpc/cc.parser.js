if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      cc = require('./cc.js');

  cc.parser = {};

  cc.parser.IParser = dejavu.Interface.declare({
    $statics: {
      getSuffix: function() {}
    },
    parseContent: function(data) {}
  });

  cc.parser.DefaultParser = dejavu.Class.declare({
    $implements: [cc.parser.IParser],

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
      __defaultParser: new cc.parser.DefaultParser(),
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

  cc.parser.Registry = new ParserRegistry();

  return cc;
});
