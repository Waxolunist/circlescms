var cc = require('../server/rpc/cc.js')('resource', 'resource.provider', 'resource.provider.git', 'parser', 'parser.markdown'),
    dejavu = require('dejavu');

console.log(cc);

exports.testIfLoaded = function(test) {
  var a = {};
  a.b = {};
  a.b.c = {};
  a.b.c.d = {};
  
  test.ok(!cc.util.ObjectUtil.isDefined());
  test.ok(!cc.util.ObjectUtil.isDefined(a));
  test.ok(cc.util.ObjectUtil.isDefined(a, 'b'));
  test.ok(cc.util.ObjectUtil.isDefined(a, 'b.c.d'));
  test.ok(!cc.util.ObjectUtil.isDefined(a, 'b.c.d.e'));
  test.ok(!cc.util.ObjectUtil.isDefined(a, 'f.c.d.e'));
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

exports.testPreconditions = function(test) {
  test.throws(function() {
    cc.util.Preconditions.checkNotEmptyString();
  });
  test.throws(function() {
    cc.util.Preconditions.checkNotEmptyString("");
  });
  test.throws(function() {
    cc.util.Preconditions.checkNotEmptyString(undefined);
  });
  test.throws(function() {
    cc.util.Preconditions.checkNotEmptyString(null);
  });
  test.doesNotThrow(function() {
    cc.util.Preconditions.checkNotEmptyString("a");
  });
  test.done();
};

exports.testResourceProviderRegistration = function(test) {
  test.ok(!!cc.resource.provider.Registry);
  
  test.throws(function() {
    new cc.resource.provider.git.GitResourceProvider();
  });

  var gitprovider = new cc.resource.provider.git.GitResourceProvider("name", "path");
  test.ok(!!gitprovider);

  cc.resource.provider.Registry.registerProvider(gitprovider.getName(), gitprovider);
  test.deepEqual(cc.resource.provider.Registry.getProviderByName("name"), gitprovider);

  test.done();
};
