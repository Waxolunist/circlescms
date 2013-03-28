this.resourcesSuite = {
    'testGetSuffix': function (test) {
      test.equal(resource._getSuffix("a.md"), "md");
      test.equal(resource._getSuffix("a.html"), "html");
      test.equal(resource._getSuffix("a/b.md"), "md");
      test.equal(resource._getSuffix("a/b.html"), "html");
      test.equal(resource._getSuffix("md.html"), "html");
      test.equal(resource._getSuffix("html.md"), "md");
      test.equal(resource._getSuffix("a.b.md"), "md");
      test.equal(resource._getSuffix("a.b.html"), "html");
      test.equal(resource._getSuffix("a/b"), undefined);
      test.equal(resource._getSuffix("a"), undefined);
      test.equal(resource._getSuffix("a.b/c"), undefined);
      test.equal(resource._getSuffix(null), undefined);
      test.equal(resource._getSuffix(""), undefined);
      test.done();
    },

    'testHasDefaultSuffix': function(test) {
      test.ok(resource._hasDefaultSuffix("a.md"));
      test.ok(resource._hasDefaultSuffix("a.html"));
      test.ok(!resource._hasDefaultSuffix("a.asp"));
      test.ok(!resource._hasDefaultSuffix("a"));
      test.done();
    },

    'testIsDirectoryPath': function(test) {
      test.ok(resource._isDirectoryPath("a/"));
      test.ok(!resource._isDirectoryPath("a"));
      test.done();
    },

    'testResolveContent': function (test) {
      test.deepEqual(resource.resolveContent("a"), ["a.md", "a.html", "a/", 404]);
      test.deepEqual(resource.resolveContent("a.html"), ["a.html", "a.html/", 404]);
      test.deepEqual(resource.resolveContent("a.md"), ["a.md", "a.md/", 404]);
      test.deepEqual(resource.resolveContent("blog/a"), ["blog/a.md", "blog/a.html", "blog/a/", 404]);
      test.deepEqual(resource.resolveContent("blog/a.asp"), ["blog/a.asp.md", "blog/a.asp.html", "blog/a.asp/", 404]);
      test.deepEqual(resource.resolveContent("blog/"), ["blog/", 404]);
      test.done();
    }
};
