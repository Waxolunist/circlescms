var testCase  = require('nodeunit').testCase,
    cc = require('../server/rpc/cc.js')('parser'),
    dejavu = require('dejavu');

module.exports = testCase({
  'parser': testCase({
    'Registry': testCase({
      'initialize': testCase({
        '1': function(test) {
          console.log('Test private constructor:');
          test.throws(function() { 
              new cc.parser.ParserRegistry(); 
            }, 
            /Constructor of class .* is private/
          );
          test.done();
        },
        '2': function(test) {
          var registry = cc.parser.ParserRegistry.getInstance();
          test.ok(!!registry);
          test.deepEqual(cc.parser.ParserRegistry.getInstance(), registry);
          test.done();
        }
      }),
      'getParserBySuffix': testCase({
        '1': function(test) {
          var registry = cc.parser.ParserRegistry.getInstance();
          test.ok(dejavu.instanceOf(registry.getParserBySuffix('html'), cc.parser.IParser));
          test.ok(dejavu.instanceOf(registry.getParserBySuffix('html'), cc.parser.DefaultParser));
          test.ok(dejavu.instanceOf(registry.getParserBySuffix('asp'), cc.parser.DefaultParser));
          test.done();
        }
      })
    })
  })
});
