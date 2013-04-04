var testCase  = require('nodeunit').testCase;
var cc = require('../server/rpc/cc.js')();

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
    })
  })
});
