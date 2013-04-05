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
