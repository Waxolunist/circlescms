var testCase  = require('nodeunit').testCase,
    cc = require('../server/rpc/cc.js')('parser'),
    dejavu = require('dejavu');

module.exports = testCase({
  'parser': testCase({
    'Registry': testCase({
      'initialize': testCase({
        '1': function(test) {
          //Will not fail in loose mode
          if(dejavu.mode == 'strict') {
            test.throws(function() { 
                new cc.parser.ParserRegistry(); 
              }, 
              /Constructor of class .* is private/
            );
          } else {
            test.throws(function() {
              new cc.parser.ParserRegistry(); 
            }, function(e) {
              return e.name == 'IllegalStateException';
            });
          }
          test.done();
        },
        '2': function(test) {
          var registry = cc.parser.ParserRegistry.getInstance();
          test.ok(!!registry);
          test.strictEqual(cc.parser.ParserRegistry.getInstance(), registry);
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
      }),
      'registerParser': testCase({
        '1': function(test) {
          var registry = cc.parser.ParserRegistry.getInstance();
          var parser = new cc.parser.DefaultParser();
          test.doesNotThrow(function() { registry.registerParser('html', parser); });
          test.doesNotThrow(function() { registry.registerParser('asp', parser); });
          test.done();
        }
      }),
      'isSuffixRegistered': testCase({
        '1': function(test) {
          var registry = cc.parser.ParserRegistry.getInstance();
          test.ok(registry.isSuffixRegistered('html'));
          test.ok(registry.isSuffixRegistered('asp'));
          test.ok(!registry.isSuffixRegistered('xml'));
          test.done();
        }
      }),
      'getAllRegisteredSuffixes': testCase({
        '1': function(test) {
          var registry = cc.parser.ParserRegistry.getInstance();
          test.deepEqual(registry.getAllRegisteredSuffixes(), ['md', 'html', 'asp']);
          test.done();
        }
      }),
      'unregisterSuffix': testCase({
        '1': function(test) {
          var registry = cc.parser.ParserRegistry.getInstance();
          test.doesNotThrow(function() { registry.unregisterParser('asp'); });
          test.ok(!registry.isSuffixRegistered('asp'));
          test.done();
        }
      })
    })
  })
});
