var cc = require('./cc.js')('resource.provider.fs', 'parser.markdown'),
    _ = require('underscore'),
    path = require('path');

exports.actions = function(req, res, ss) {

  req.use('session');

  var factory = new cc.resource.provider.ResourceFactory();
  var fsprovider = new cc.resource.provider.fs.FsResourceProvider("fs", path.join(process.env.OPENSHIFT_REPO_DIR, "content"), function() {});
  cc.resource.provider.ProviderRegistry.getInstance().registerProvider(fsprovider.getName(), fsprovider);
  cc.parser.ParserRegistry.getInstance().registerParser('md', new cc.parser.markdown.MarkdownParser());

  return {

    loadcontent: function (message) {
      try {
        var r = factory.getResource("fs", message.substr(1));
        res(r);
      } catch (err) {
        console.log(err);
      }
    }
  };

};
