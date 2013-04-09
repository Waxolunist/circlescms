var cc = require('./cc.js')('resource.provider.test', 'parser'),
    _ = require('underscore');

exports.actions = function(req, res, ss) {

  req.use('session');

  var factory = new cc.resource.provider.ResourceFactory();
  var testprovider = new cc.resource.provider.test.TestResourceProvider("test");
  cc.resource.provider.ProviderRegistry.getInstance().registerProvider(testprovider.getName(), testprovider);
  cc.parser.ParserRegistry.getInstance().registerParser('', new cc.parser.DefaultParser());

  return {

    loadcontent: function(message) {
      try {
        var r = factory.getResource("test", message.substr(1));
        console.inspect(r);
        res(r);
      } catch (err) {
        console.log(err);
      }
    }
  };

};
