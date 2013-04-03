var cc = require('../server/rpc/cc.js')('resource', 'parser', 'parser.markdown'),
    dejavu = require('dejavu');

console.log(cc);

exports.testIfLoaded = function(test) {
  var a = {};
  a.b = {};
  a.b.c = {};
  a.b.c.d = {};
  
  test.ok(!cc.isLoaded());
  test.ok(!cc.isLoaded(a));
  test.ok(cc.isLoaded(a, 'b'));
  test.ok(cc.isLoaded(a, 'b.c.d'));
  test.ok(!cc.isLoaded(a, 'b.c.d.e'));
  test.ok(!cc.isLoaded(a, 'f.c.d.e'));
  test.done();
};


exports.testItemCreation = function(test) {
  var item = new cc.resource.Item();
  test.equal(item.getSuperType(), 'item');
  test.equal(item.getSuperType(), cc.resource.IResource.ITEMTYPE);
  test.done();
};

exports.testListCreation = function(test) {
  var list = new cc.resource.List();
  test.equal(list.getSuperType(), 'list');
  test.equal(list.getSuperType(), cc.resource.IResource.LISTTYPE);
  test.done();
};

exports.testDefaultParserRegistration = function(test) {
  var parserregistry = cc.parser.Registry;
  test.ok(dejavu.instanceOf(parserregistry.getParserBySuffix('html'), cc.parser.IParser));
  test.ok(dejavu.instanceOf(parserregistry.getParserBySuffix('html'), cc.parser.DefaultParser));
  test.done();
};

exports.testMarkdownParserRegistration = function(test) {
  var parserregistry = cc.parser.Registry;
  test.ok(dejavu.instanceOf(parserregistry.getParserBySuffix('md'), cc.parser.markdown.MarkdownParser));
  test.ok(dejavu.instanceOf(parserregistry.getParserBySuffix('md'), cc.parser.IParser));
  test.ok(dejavu.instanceOf(parserregistry.getParserBySuffix('html'), cc.parser.IParser));
  test.ok(dejavu.instanceOf(parserregistry.getParserBySuffix('html'), cc.parser.DefaultParser));
  test.ok(!dejavu.instanceOf(parserregistry.getParserBySuffix('md'), cc.parser.DefaultParser));
  test.done();
};
