if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var dejavu = require('dejavu'),
      parser = require('./cc.parser.js'),
      _ = require('underscore');

  var bnd = {};

  bnd.BndParser = dejavu.Class.declare({
    $implements: [parser.IParser],

    $statics: { 
      getSuffix: function() { return "bnd"; }
    },

    parseContent: function (data) {
      //open directory and read filenames
      return bnd;
    }
  });

  parser.ParserRegistry.getInstance().registerParser(
    bnd.BndParser.getSuffix(),
    new bnd.BndParser()
  );

  return bnd;
});
