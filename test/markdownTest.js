var testCase  = require('nodeunit').testCase,
    cc = require('../server/rpc/cc.js')('parser.markdown'),
    dejavu = require('dejavu');

module.exports = testCase({
  'parser': testCase({
    'markdown': testCase({
      'getParserBySuffix': testCase({
        '1': function(test) {
          var registry = cc.parser.ParserRegistry.getInstance();
          test.ok(dejavu.instanceOf(registry.getParserBySuffix('html'), cc.parser.IParser));
          test.ok(dejavu.instanceOf(registry.getParserBySuffix('html'), cc.parser.DefaultParser));
          test.ok(dejavu.instanceOf(registry.getParserBySuffix('asp'), cc.parser.DefaultParser));
          test.ok(dejavu.instanceOf(registry.getParserBySuffix('md'), cc.parser.IParser));
          test.ok(dejavu.instanceOf(registry.getParserBySuffix('md'), cc.parser.markdown.MarkdownParser));
          test.done();
        }
      }) 
    })
  })
});
