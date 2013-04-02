var cc = require('../server/rpc/cc.js'),
    dejavu = require('dejavu');

exports.testItemCreation = function(test) {
  console.log(cc);
  var item = new cc.Item();
  test.equal(item.getSuperType(), 'item');
  test.equal(item.getSuperType(), cc.IResource.ITEMTYPE);
  test.done();
};
