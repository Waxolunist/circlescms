var testCase  = require('nodeunit').testCase,
  cc = require('../server/rpc/cc.js')('parser.markdown', 'resource.provider.fs'),
  dejavu = require('dejavu'),
  _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());

module.exports = testCase({
  'parser': testCase({
    'markdown': testCase({
      'getParserBySuffix': testCase({
        '1': function (test) {
          var r = cc.parser.ParserRegistry.getInstance();
          test.ok(dejavu.instanceOf(r.getParserBySuffix('html'), cc.parser.IParser));
          test.ok(dejavu.instanceOf(r.getParserBySuffix('html'), cc.parser.DefaultParser));
          test.ok(dejavu.instanceOf(r.getParserBySuffix('asp'), cc.parser.DefaultParser));
          test.ok(dejavu.instanceOf(r.getParserBySuffix('md'), cc.parser.IParser));
          test.ok(dejavu.instanceOf(r.getParserBySuffix('md'), cc.parser.markdown.MarkdownParser));
          test.done();
        }
      }),
      'parseContent': testCase({
        '1': function (test) {
          var parser = new cc.parser.markdown.MarkdownParser(),
            registry = cc.parser.ParserRegistry.getInstance(),
            provider = new cc.resource.provider.fs.FsResourceProvider("fs", "test/fstestcontent");
          var article = provider.readItem("blog/article1.md");
          test.equal(article.title, "Christian Sterzl");
          test.equal(article.date, "2013-02-03");
          test.equal(article.path, "blog/article1.md");
          test.ok(_(article.content).startsWith("<p>Some content</p>"));
          test.done();
        }
      })
    })
  })
});
