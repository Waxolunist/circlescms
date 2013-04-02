this.resourcesSuite = {
    'testGetSuffix': function (test) {
      test.equal(resolver._getSuffix("a.md"), "md");
      test.equal(resolver._getSuffix("a.html"), "html");
      test.equal(resolver._getSuffix("a/b.md"), "md");
      test.equal(resolver._getSuffix("a/b.html"), "html");
      test.equal(resolver._getSuffix("md.html"), "html");
      test.equal(resolver._getSuffix("html.md"), "md");
      test.equal(resolver._getSuffix("a.b.md"), "md");
      test.equal(resolver._getSuffix("a.b.html"), "html");
      test.equal(resolver._getSuffix("a/b"), "");
      test.equal(resolver._getSuffix("a"), "");
      test.equal(resolver._getSuffix("a."), "");
      test.equal(resolver._getSuffix("a.b/c"), "");
      test.equal(resolver._getSuffix(null), "");
      test.equal(resolver._getSuffix(undefined), "");
      test.equal(resolver._getSuffix(""), "");
      test.equal(resolver._getSuffix(0), "");
      test.equal(resolver._getSuffix(1), "");
      test.equal(resolver._getSuffix(NaN), "");
      test.equal(resolver._getSuffix(true), "");
      test.equal(resolver._getSuffix(false), "");
      test.done();
    },

    'testGetBasename': function (test) {
      test.equal(resolver._getBasename("a.md"), "a");
      test.equal(resolver._getBasename("a.html"), "a");
      test.equal(resolver._getBasename("a/b.md"), "a/b");
      test.equal(resolver._getBasename("a/b.html"), "a/b");
      test.equal(resolver._getBasename("md.html"), "md");
      test.equal(resolver._getBasename("html.md"), "html");
      test.equal(resolver._getBasename("a.b.md"), "a.b");
      test.equal(resolver._getBasename("a.b.html"), "a.b");
      test.equal(resolver._getBasename("a/b"), "a/b");
      test.equal(resolver._getBasename("a"), "a");
      test.equal(resolver._getBasename("a."), "a.");
      test.equal(resolver._getBasename("a.b/c"), "a.b/c");
      test.equal(resolver._getBasename(null), "");
      test.equal(resolver._getBasename(undefined), "");
      test.equal(resolver._getBasename(""), "");
      test.equal(resolver._getBasename(0), "");
      test.equal(resolver._getBasename(1), "");
      test.equal(resolver._getBasename(NaN), "");
      test.equal(resolver._getBasename(true), "");
      test.equal(resolver._getBasename(false), "");
      test.done();
    },

    'testHasDefaultSuffix': function(test) {
      test.deepEqual(resolver._defaultsuffixes, ["md", "html"]);
      test.ok(resolver._hasDefaultSuffix("a.md"));
      test.ok(resolver._hasDefaultSuffix("a.html"));
      test.ok(!resolver._hasDefaultSuffix("a.asp"));
      test.ok(!resolver._hasDefaultSuffix("a"));
      test.ok(!resolver._hasDefaultSuffix(null));
      test.ok(!resolver._hasDefaultSuffix(undefined));
      test.ok(!resolver._hasDefaultSuffix(""));
      test.ok(!resolver._hasDefaultSuffix(0));
      test.ok(!resolver._hasDefaultSuffix(1));
      test.ok(!resolver._hasDefaultSuffix(NaN));
      test.ok(!resolver._hasDefaultSuffix(true));
      test.ok(!resolver._hasDefaultSuffix(false));
      test.done();
    },

    'testIsDirectoryPath': function(test) {
      test.ok(resolver._isDirectoryPath("a/"));
      test.ok(resolver._isDirectoryPath("1/"));
      test.ok(!resolver._isDirectoryPath("1"));
      test.ok(!resolver._isDirectoryPath("a"));
      test.ok(!resolver._isDirectoryPath("a/b"));
      test.ok(!resolver._isDirectoryPath(null));
      test.ok(!resolver._isDirectoryPath(undefined));
      test.ok(!resolver._isDirectoryPath(""));
      test.ok(!resolver._isDirectoryPath(0));
      test.ok(!resolver._isDirectoryPath(1));
      test.ok(!resolver._isDirectoryPath(NaN));
      test.ok(!resolver._isDirectoryPath(true));
      test.ok(!resolver._isDirectoryPath(false));
      test.done();
    },

    'testGetDirectory': function(test) {
      test.equal(resolver._getDirectory("a.md"), "");
      test.equal(resolver._getDirectory("a.html"), "");
      test.equal(resolver._getDirectory("a/b.md"), "a/");
      test.equal(resolver._getDirectory("a/b.html"), "a/");
      test.equal(resolver._getDirectory("a/b/c/d.html"), "a/b/c/");
      test.equal(resolver._getDirectory("a/b/"), "a/b/");
      test.equal(resolver._getDirectory("a.b/c"), "a.b/");
      test.equal(resolver._getDirectory(null), "");
      test.equal(resolver._getDirectory(undefined), "");
      test.equal(resolver._getDirectory(""), "");
      test.equal(resolver._getDirectory(0), "");
      test.equal(resolver._getDirectory(1), "");
      test.equal(resolver._getDirectory(NaN), "");
      test.equal(resolver._getDirectory(true), "");
      test.equal(resolver._getDirectory(false), "");
      test.done();
    },

    'testResolveContent': function (test) {
      test.deepEqual(resolver.resolveContent("a"), ["a.md", "a.html", "a/", 404]);
      test.deepEqual(resolver.resolveContent("1"), ["1.md", "1.html", "1/", 404]);
      test.deepEqual(resolver.resolveContent("a.html"), ["a.html", "a.html/", 404]);
      test.deepEqual(resolver.resolveContent("a.md"), ["a.md", "a.md/", 404]);
      test.deepEqual(resolver.resolveContent("blog/a"), ["blog/a.md", "blog/a.html", "blog/a/", 404]);
      test.deepEqual(resolver.resolveContent("blog/a.asp"), ["blog/a.asp.md", "blog/a.asp.html", "blog/a.asp/", 404]);
      test.deepEqual(resolver.resolveContent("blog/"), ["blog/", 404]);
      test.deepEqual(resolver.resolveContent(null), [404]);
      test.deepEqual(resolver.resolveContent(undefined), [404]);
      test.deepEqual(resolver.resolveContent(""), [404]);
      test.deepEqual(resolver.resolveContent(0), [404]);
      test.deepEqual(resolver.resolveContent(1), [404]);
      test.deepEqual(resolver.resolveContent(NaN), [404]);
      test.deepEqual(resolver.resolveContent(true), [404]);
      test.deepEqual(resolver.resolveContent(false), [404]);
      test.done();
    },

    'testResolveTemplate': function (test) {
      test.deepEqual(resolver.resolveTemplate(new circles.Resource("a", "a.md", "item")), 
            ["a.item.html", "item.html"]);
      test.deepEqual(resolver.resolveTemplate(new circles.Resource("a", "a.html", null)), []);
      test.deepEqual(resolver.resolveTemplate(
            new circles.Resource("blog/a", "blog/a.md", "article")), 
            ["blog/a.article.html", "blog/article.html", "article.html"]);
      test.deepEqual(resolver.resolveTemplate(
            new circles.Resource("blog/dir/a", "blog/dir/a.md", "article")), 
            ["blog/dir/a.article.html", "blog/dir/article.html", "blog/article.html", "article.html"]);
      test.deepEqual(resolver.resolveTemplate(new circles.Resource("blog", "blog/", "list")),
            ["blog.list.html", "list.html"]);
      test.deepEqual(resolver.resolveTemplate(
            new circles.Resource("doesnotexist", 404, "error")), 
            ["error.html"]);
      test.deepEqual(resolver.resolveTemplate(
            new circles.Resource("blog/doesnotexist", 404, "error")), 
            ["blog.error.html", "error.html"]);
      test.deepEqual(resolver.resolveTemplate(
            new circles.Resource(null, 404, "error")), 
            ["error.html"]);
      test.deepEqual(resolver.resolveTemplate(null), []);
      test.deepEqual(resolver.resolveTemplate(undefined), []);
      test.deepEqual(resolver.resolveTemplate(""), []);
      test.deepEqual(resolver.resolveTemplate(0), []);
      test.deepEqual(resolver.resolveTemplate(1), []);
      test.deepEqual(resolver.resolveTemplate(NaN), []);
      test.deepEqual(resolver.resolveTemplate(true), []);
      test.deepEqual(resolver.resolveTemplate(false), []);
      test.done();
    }
};
