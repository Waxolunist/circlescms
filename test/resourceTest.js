var testCase  = require('nodeunit').testCase;
var cc = require('../lib/cc.js')('resource');

module.exports = testCase({
  'resource': testCase({
    'Item': testCase({
      'initialize': testCase({
        '1': function(test) {
          var item = new cc.resource.Item();
          test.equal(item.getSuperType(), 'item');
          test.equal(item.getSuperType(), cc.resource.IResource.ITEMTYPE);
          test.done();
        }
      })
    }),
    'List': testCase({
      'initialize': testCase({
        '1': function(test) {
          var list = new cc.resource.List();
          test.equal(list.getSuperType(), 'list');
          test.equal(list.getSuperType(), cc.resource.IResource.LISTTYPE);
          test.done();
        }
      })
    })
  })
});
