if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      util = require('./cc.util.js');
  var parser = {};

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

  parser.ParserRegistry = dejavu.Class.declare({
    $name: 'parser.ParserRegistry',

    $statics: {
      __defaultParser: new parser.DefaultParser(),
      __parserMap: new Object(),
      __instance: null,
      getInstance: function() {
        if(this.$self.__instance) {
          return this.$self.__instance;
        }
        this.$self.__instance = new parser.ParserRegistry();
        return this.$self.__instance;
      }
    },
    
    __initialize: function() {
      if(this.$self.__instance) {
        util.ExceptionUtil.throwIllegalStateException("ParserRegistry already initialized. Use getInstance!");
      } else {
        this.$self.__instance = this;
      }
    },

    registerParser: function(suffix, parser) {
      this.$static.__parserMap[suffix] = parser;
    },

    getParserBySuffix: function(suffix) {
      if(this.$static.__parserMap.hasOwnProperty(suffix)) {
        return this.$static.__parserMap[suffix];
      }
      return this.$static.__defaultParser;
    },

    isSuffixRegistered: function(suffix) {
      //TODO
    },

    getAllRegisteredSuffixes: function() {
      //TODO
    }
  });

  return parser;
});
