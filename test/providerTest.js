var testCase  = require('nodeunit').testCase,
    cc = require('../server/rpc/cc.js')('parser', 'resource.provider.git', 'resource.provider.fs', 'resource.provider.test'),
    dejavu = require('dejavu');

module.exports = testCase({
  'provider': testCase({
    'Registry': testCase({
      'initialize': testCase({
        '1': function(test) {
          if(dejavu.mode == 'strict') {
            test.throws(function() { 
                new cc.resource.provider.ProviderRegistry(); 
              }, 
              /Constructor of class .* is private/
            );
          } else {
            test.doesNotThrow(function() {
              new cc.resource.provider.ProviderRegistry();
            });
          }
          test.done();
        },
        '2': function(test) {
          var registry = cc.resource.provider.ProviderRegistry.getInstance();
          test.ok(!!registry);
          test.strictEqual(cc.resource.provider.ProviderRegistry.getInstance(), registry);
          test.done();
        }
      }),
      'registerProvider': testCase({
        '1': function(test) {
          var registry = cc.resource.provider.ProviderRegistry.getInstance();
          test.throws(function() {
            registry.registerProvider("1", undefined); 
          }, function(e) { return e.name == 'IllegalArgumentException'; });
          test.throws(function() {
            registry.registerProvider("1", {}); 
          }, function(e) { return e.name == 'IllegalArgumentException'; });
          test.done();
        }
      })
    }),
    'ResourceResolver': testCase({
      'resolveContent': testCase({
        '1': function(test) {
          //test default behaviour
          var resolver = new cc.resource.provider.ResourceResolver();
          var parserregistry = cc.parser.ParserRegistry.getInstance();
          parserregistry.registerParser('md', new cc.parser.DefaultParser());
          parserregistry.registerParser('html', new cc.parser.DefaultParser());
          test.deepEqual(cc.parser.ParserRegistry.getInstance().getAllRegisteredSuffixes(), ['md', 'html']);
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
          parserregistry.unregisterAll();
          test.done();
        },
        '2': function(test) {
          //test empty suffix behaviour
          var resolver = new cc.resource.provider.ResourceResolver();
          var parserregistry = cc.parser.ParserRegistry.getInstance();
          parserregistry.registerParser('', new cc.parser.DefaultParser());
          test.deepEqual(cc.parser.ParserRegistry.getInstance().getAllRegisteredSuffixes(), ['']);
          test.deepEqual(resolver.resolveContent("a"), ["a", "a/", 404]);
          test.deepEqual(resolver.resolveContent("1"), ["1", "1/", 404]);
          test.deepEqual(resolver.resolveContent("a.html"), ["a.html", "a.html/", 404]);
          test.deepEqual(resolver.resolveContent("a.md"), ["a.md", "a.md/", 404]);
          test.deepEqual(resolver.resolveContent("blog/a"), ["blog/a", "blog/a/", 404]);
          test.deepEqual(resolver.resolveContent("blog/a.asp"), ["blog/a.asp", "blog/a.asp/", 404]);
          test.deepEqual(resolver.resolveContent("blog/"), ["blog/", 404]);
          test.deepEqual(resolver.resolveContent(null), [404]);
          test.deepEqual(resolver.resolveContent(undefined), [404]);
          test.deepEqual(resolver.resolveContent(""), [404]);
          test.deepEqual(resolver.resolveContent(0), [404]);
          test.deepEqual(resolver.resolveContent(1), [404]);
          test.deepEqual(resolver.resolveContent(NaN), [404]);
          test.deepEqual(resolver.resolveContent(true), [404]);
          test.deepEqual(resolver.resolveContent(false), [404]);
          parserregistry.unregisterAll();
          test.done();
        }
      }),
      'resolveTemplate': testCase({
        '1': function(test) {
          var resolver = new cc.resource.provider.ResourceResolver();
          test.deepEqual(resolver.resolveTemplate(new cc.resource.Item("a", "a.md", "item")), 
                ["a.item.html", "item.html"]);
          test.deepEqual(resolver.resolveTemplate(new cc.resource.Item("a", "a.html", null)), ["a.item.html", "item.html"]);
          test.deepEqual(resolver.resolveTemplate(
                new cc.resource.Item("blog/a", "blog/a.md", "article")), 
                ["blog/a.article.html", "blog/article.html", "article.html"]);
          test.deepEqual(resolver.resolveTemplate(
                new cc.resource.Item("blog/dir/a", "blog/dir/a.md", "article")), 
                ["blog/dir/a.article.html", "blog/dir/article.html", "blog/article.html", "article.html"]);
          test.deepEqual(resolver.resolveTemplate(new cc.resource.Item("blog", "blog/", "list")),
                ["blog.list.html", "list.html"]);
          test.deepEqual(resolver.resolveTemplate(
                new cc.resource.Item("doesnotexist", 404, "error")), 
                ["error.html"]);
          test.deepEqual(resolver.resolveTemplate(
                new cc.resource.Item(null, 404, "error")), 
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
        },
        '2': function(test) {
          var resolver = new cc.resource.provider.ResourceResolver();
          test.deepEqual(resolver.resolveTemplate(
                new cc.resource.Item("blog/doesnotexist", 404, "error")), 
                ["blog.error.html", "error.html"]);
          test.done();
        }
      })
    }),
    'ResourceFactory': testCase({
      'initialize': testCase({
        '1': function(test) {
          test.doesNotThrow(function() {
            new cc.resource.provider.ResourceFactory();
          });
          test.done();
        }
      }),
      'getResource': testCase({
        '1': function(test) {
          var factory = new cc.resource.provider.ResourceFactory();
          var testprovider = new cc.resource.provider.test.TestResourceProvider("test");
          cc.resource.provider.ProviderRegistry.getInstance().registerProvider(testprovider.getName(), testprovider);
          var r = factory.getResource("test", "doesnotexist");
          test.equal(r.getType(), "error");
          test.equal(r.getSuperType(), "item");
          test.equal(r.getUri(), "doesnotexist");
          test.equal(r.getPath(), 404);
          test.ok(/Could not find content.*/g.test(r.message));
          test.deepEqual(r.getTemplates(), ["error.html"]);
          cc.resource.provider.ProviderRegistry.getInstance().unregisterProvider("test");
          test.done();
        },
        '2': function(test) {
          var factory = new cc.resource.provider.ResourceFactory();
          var testprovider = new cc.resource.provider.test.TestResourceProvider("test");
          cc.parser.ParserRegistry.getInstance().registerParser('', new cc.parser.DefaultParser());
          cc.resource.provider.ProviderRegistry.getInstance().registerProvider(testprovider.getName(), testprovider);
          var r = factory.getResource("test", "g");
          test.equal(r.getType(), "item");
          test.equal(r.getSuperType(), "item");
          test.equal(r.getUri(), "g");
          test.equal(r.getPath(), "g");
          test.ok(/Content of g/g.test(r.content));
          test.deepEqual(r.getTemplates(), ["g.item.html", "item.html"]);
          cc.resource.provider.ProviderRegistry.getInstance().unregisterProvider("test");
          test.done();
        },
        '3': function(test) {
          var factory = new cc.resource.provider.ResourceFactory();
          var testprovider = new cc.resource.provider.test.TestResourceProvider("test");
          cc.parser.ParserRegistry.getInstance().registerParser('', new cc.parser.DefaultParser());
          cc.resource.provider.ProviderRegistry.getInstance().registerProvider(testprovider.getName(), testprovider);
          var r = factory.getResource("test", "a");
          test.equal(r.getType(), "list");
          test.equal(r.getSuperType(), "list");
          test.equal(r.getUri(), "a");
          test.equal(r.getPath(), "a/");
          test.deepEqual(r.resources, ['b', 'c', 'd/']);
          test.deepEqual(r.getTemplates(), ["a.list.html", "list.html"]);
          cc.resource.provider.ProviderRegistry.getInstance().unregisterProvider("test");
          test.done();
        }
      }) 
    }),
    'git': testCase({
      'GitResourceProvider': testCase({
        'initialize': testCase({
          '1': function(test) {
            test.throws(function() {
              new cc.resource.provider.git.GitResourceProvider();
            }, function(e) { return e.name == 'IllegalArgumentException'; });
            test.done();
          },
          '2': function(test) {
            var gitprovider = new cc.resource.provider.git.GitResourceProvider("git", "path");
            test.ok(!!gitprovider);
            test.done();
          }
        }),
        'register': testCase({
          '1': function(test) {
            var gitprovider = new cc.resource.provider.git.GitResourceProvider("git", "path");
            cc.resource.provider.ProviderRegistry.getInstance().registerProvider(gitprovider.getName(), gitprovider);
            test.strictEqual(cc.resource.provider.ProviderRegistry.getInstance().getProviderByName("git"), gitprovider);
            test.done();
          }
        }),
        'unregister': testCase({
          '1': function(test) {
            var registry = cc.resource.provider.ProviderRegistry.getInstance();
            registry.unregisterProvider("git");
            test.ok(!registry.getProviderByName("git"));
            test.done();
          }
        })
      })
    }),
    'fs': testCase({
      'FsResourceProvider': testCase({
        'initialize': testCase({
          '1': function(test) {
            test.throws(function() {
              new cc.resource.provider.fs.FsResourceProvider();
            }, function(e) { return e.name == 'IllegalArgumentException'; });
            test.done();
          },
          '2': function(test) {
            var fsprovider = new cc.resource.provider.fs.FsResourceProvider("fs", "path");
            test.ok(!!fsprovider);
            test.done();
          }
        }),
        'register': testCase({
          '1': function(test) {
            var fsprovider = new cc.resource.provider.fs.FsResourceProvider("fs", "path");
            cc.resource.provider.ProviderRegistry.getInstance().registerProvider(fsprovider.getName(), fsprovider);
            test.strictEqual(cc.resource.provider.ProviderRegistry.getInstance().getProviderByName("fs"), fsprovider);
            test.done();
          }
        }),
        'unregister': testCase({
          '1': function(test) {
            var registry = cc.resource.provider.ProviderRegistry.getInstance();
            registry.unregisterProvider("fs");
            test.ok(!registry.getProviderByName("fs"));
            test.done();
          }
        })
      })
    }),
    'test': testCase({
      'TestResourceProvider': testCase({
        'initialize': testCase({
          '1': function(test) {
            var testprovider = new cc.resource.provider.test.TestResourceProvider("test");
            test.ok(!!testprovider);
            test.done();
          }
        }),
        'register': testCase({
          '1': function(test) {
            var testprovider = new cc.resource.provider.test.TestResourceProvider("test");
            cc.resource.provider.ProviderRegistry.getInstance().registerProvider(testprovider.getName(), testprovider);
            test.strictEqual(cc.resource.provider.ProviderRegistry.getInstance().getProviderByName("test"), testprovider);
            test.done();
          }
        }),
        'unregister': testCase({
          '1': function(test) {
            var registry = cc.resource.provider.ProviderRegistry.getInstance();
            registry.unregisterProvider("test");
            test.ok(!registry.getProviderByName("test"));
            test.done();
          }
        }),
        'readItem': testCase({
          '1': function(test) {
            var testprovider = new cc.resource.provider.test.TestResourceProvider("test");
            test.equal(testprovider.readItem("g")["content"], "Content of g");
            test.equal(testprovider.readItem("a/d/e")["content"], "Content of e");
            test.done();
          }
        }),
        'readList': testCase({
          '1': function(test) {
            var testprovider = new cc.resource.provider.test.TestResourceProvider("test");
            test.deepEqual(testprovider.readList("a/d")["resources"], ['e', 'f']);
            test.deepEqual(testprovider.readList("a/")["resources"], ['b', 'c', 'd/']);
            test.deepEqual(testprovider.readList("a")["resources"], ['b', 'c', 'd/']);
            test.done();
          }
        }),
        'returnFirstThatExists': testCase({
          '1': function(test) {
            var testprovider = new cc.resource.provider.test.TestResourceProvider("test");
            test.equal(testprovider.returnFirstThatExists(['a.md', 'a.html', 'a/']), 'a/');
            test.equal(testprovider.returnFirstThatExists(['a/b.md', 'a/b', 'a/b/']), 'a/b');
            test.equal(testprovider.returnFirstThatExists(['a/d/e.md', 'a/d/e.html', 'a/d/e', 'a/d/e/']), 'a/d/e');
            test.equal(testprovider.returnFirstThatExists([404]), 404);
            test.equal(testprovider.returnFirstThatExists([]), 404);
            test.equal(testprovider.returnFirstThatExists(undefined), 404);
            test.equal(testprovider.returnFirstThatExists(null), 404);
            test.equal(testprovider.returnFirstThatExists(""), 404);
            test.equal(testprovider.returnFirstThatExists(0), 404);
            test.equal(testprovider.returnFirstThatExists(1), 404);
            test.equal(testprovider.returnFirstThatExists(NaN), 404);
            test.equal(testprovider.returnFirstThatExists(true), 404);
            test.equal(testprovider.returnFirstThatExists(false), 404);
            test.equal(testprovider.returnFirstThatExists(), 404);
            test.done();
          }
        })
      })
    })
  })
});
