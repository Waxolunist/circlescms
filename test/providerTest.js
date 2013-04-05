var testCase  = require('nodeunit').testCase,
    cc = require('../server/rpc/cc.js')('resource.provider.git', 'resource.provider.fs'),
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
          test.deepEqual(cc.resource.provider.ProviderRegistry.getInstance(), registry);
          test.done();
        }
      })
    }),
    'ResourceResolver': testCase({
      'resolveContent': testCase({
        '1': function(test) {
          /*
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
          */
          test.done();
        }
      }),
      'resolveTemplate': testCase({
        '1': function(test) {
          /*
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
          */
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
            test.deepEqual(cc.resource.provider.ProviderRegistry.getInstance().getProviderByName("git"), gitprovider);
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
            test.deepEqual(cc.resource.provider.ProviderRegistry.getInstance().getProviderByName("fs"), fsprovider);
            test.done();
          }
        })
      })
    })
  })
});
