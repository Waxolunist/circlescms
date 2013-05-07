var testCase  = require('nodeunit').testCase;
var cc = require('../lib/cc.js')();

module.exports = testCase({
  'util': testCase({
    'ObjectUtil': testCase({
      'isDefined': testCase({
        '1': function(test) {
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
        }
      })
    }),
    'Preconditions': testCase({
      'checkNotEmptyString': testCase({
        '1': function(test) {
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
        }
      })
    }),
    'PathUtil': testCase({
      'getSuffix': testCase({
        '1': function(test) {
          test.equal(cc.util.PathUtil.getSuffix("a.md"), "md");
          test.equal(cc.util.PathUtil.getSuffix("a.html"), "html");
          test.equal(cc.util.PathUtil.getSuffix("a/b.md"), "md");
          test.equal(cc.util.PathUtil.getSuffix("a/b.html"), "html");
          test.equal(cc.util.PathUtil.getSuffix("md.html"), "html");
          test.equal(cc.util.PathUtil.getSuffix("html.md"), "md");
          test.equal(cc.util.PathUtil.getSuffix("a.b.md"), "md");
          test.equal(cc.util.PathUtil.getSuffix("a.b.html"), "html");
          test.equal(cc.util.PathUtil.getSuffix("a/b"), "");
          test.equal(cc.util.PathUtil.getSuffix("a"), "");
          test.equal(cc.util.PathUtil.getSuffix("a."), "");
          test.equal(cc.util.PathUtil.getSuffix("a.b/c"), "");
          test.equal(cc.util.PathUtil.getSuffix(null), "");
          test.equal(cc.util.PathUtil.getSuffix(undefined), "");
          test.equal(cc.util.PathUtil.getSuffix(""), "");
          test.equal(cc.util.PathUtil.getSuffix(0), "");
          test.equal(cc.util.PathUtil.getSuffix(1), "");
          test.equal(cc.util.PathUtil.getSuffix(NaN), "");
          test.equal(cc.util.PathUtil.getSuffix(true), "");
          test.equal(cc.util.PathUtil.getSuffix(false), "");
          test.done();
        }
      }),
      'getBasename': testCase({
        '1': function(test) {
          test.equal(cc.util.PathUtil.getBasename("a.md"), "a");
          test.equal(cc.util.PathUtil.getBasename("a.html"), "a");
          test.equal(cc.util.PathUtil.getBasename("a/b.md"), "a/b");
          test.equal(cc.util.PathUtil.getBasename("a/b.html"), "a/b");
          test.equal(cc.util.PathUtil.getBasename("md.html"), "md");
          test.equal(cc.util.PathUtil.getBasename("html.md"), "html");
          test.equal(cc.util.PathUtil.getBasename("a.b.md"), "a.b");
          test.equal(cc.util.PathUtil.getBasename("a.b.html"), "a.b");
          test.equal(cc.util.PathUtil.getBasename("a/b"), "a/b");
          test.equal(cc.util.PathUtil.getBasename("a"), "a");
          test.equal(cc.util.PathUtil.getBasename("a."), "a.");
          test.equal(cc.util.PathUtil.getBasename("a.b/c"), "a.b/c");
          test.equal(cc.util.PathUtil.getBasename(null), "");
          test.equal(cc.util.PathUtil.getBasename(undefined), "");
          test.equal(cc.util.PathUtil.getBasename(""), "");
          test.equal(cc.util.PathUtil.getBasename(0), "");
          test.equal(cc.util.PathUtil.getBasename(1), "");
          test.equal(cc.util.PathUtil.getBasename(NaN), "");
          test.equal(cc.util.PathUtil.getBasename(true), "");
          test.equal(cc.util.PathUtil.getBasename(false), "");
          test.done();
        }
      }),
      'isDirectoryPath': testCase({
        '1': function(test) {
          test.ok(cc.util.PathUtil.isDirectoryPath("a/"));
          test.ok(cc.util.PathUtil.isDirectoryPath("1/"));
          test.ok(!cc.util.PathUtil.isDirectoryPath("1"));
          test.ok(!cc.util.PathUtil.isDirectoryPath("a"));
          test.ok(!cc.util.PathUtil.isDirectoryPath("a/b"));
          test.ok(!cc.util.PathUtil.isDirectoryPath(null));
          test.ok(!cc.util.PathUtil.isDirectoryPath(undefined));
          test.ok(!cc.util.PathUtil.isDirectoryPath(""));
          test.ok(!cc.util.PathUtil.isDirectoryPath(0));
          test.ok(!cc.util.PathUtil.isDirectoryPath(1));
          test.ok(!cc.util.PathUtil.isDirectoryPath(NaN));
          test.ok(!cc.util.PathUtil.isDirectoryPath(true));
          test.ok(!cc.util.PathUtil.isDirectoryPath(false));
          test.done();
        }
      }),
      'getDirectory': testCase({
        '1': function(test) {
          test.equal(cc.util.PathUtil.getDirectory("a.md"), "");
          test.equal(cc.util.PathUtil.getDirectory("a.html"), "");
          test.equal(cc.util.PathUtil.getDirectory("a/b.md"), "a/");
          test.equal(cc.util.PathUtil.getDirectory("a/b.html"), "a/");
          test.equal(cc.util.PathUtil.getDirectory("a/b/c/d.html"), "a/b/c/");
          test.equal(cc.util.PathUtil.getDirectory("a/b/"), "a/b/");
          test.equal(cc.util.PathUtil.getDirectory("a.b/c"), "a.b/");
          test.equal(cc.util.PathUtil.getDirectory(null), "");
          test.equal(cc.util.PathUtil.getDirectory(undefined), "");
          test.equal(cc.util.PathUtil.getDirectory(""), "");
          test.equal(cc.util.PathUtil.getDirectory(0), "");
          test.equal(cc.util.PathUtil.getDirectory(1), "");
          test.equal(cc.util.PathUtil.getDirectory(NaN), "");
          test.equal(cc.util.PathUtil.getDirectory(true), "");
          test.equal(cc.util.PathUtil.getDirectory(false), "");
          test.done();
        }
      })
    })
  })
});
