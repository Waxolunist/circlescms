var cc = require('../server/rpc/cc.parser.markdown.js'),
    dejavu = require('dejavu');

exports.testItemCreation = function(test) {
  var item = new cc.Item();
  test.equal(item.getSuperType(), 'item');
  test.equal(item.getSuperType(), cc.IResource.ITEMTYPE);
  test.done();
};

exports.testListCreation = function(test) {
  var list = new cc.List();
  test.equal(list.getSuperType(), 'list');
  test.equal(list.getSuperType(), cc.IResource.LISTTYPE);
  test.done();
};

exports.testParserRegistration = function(test) {
  var parserregistry = cc.parser.Registry;
  test.ok(dejavu.instanceOf(parserregistry.getParserBySuffix('md'), cc.parser.markdown.MarkdownParser));
  test.ok(dejavu.instanceOf(parserregistry.getParserBySuffix('md'), cc.parser.IParser));
  test.ok(dejavu.instanceOf(parserregistry.getParserBySuffix('html'), cc.parser.IParser));
  test.ok(dejavu.instanceOf(parserregistry.getParserBySuffix('html'), cc.parser.DefaultParser));
  test.ok(!dejavu.instanceOf(parserregistry.getParserBySuffix('md'), cc.parser.DefaultParser));
  test.done();
};
