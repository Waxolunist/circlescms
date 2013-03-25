var sys = require('sys'),
    Git = require('git');

Git("../circles-content");

exports.actions = function(req, res, ss){

  return {
    content: function(path) {
      return res("fdsfds"); 
     /* Git.exists("articles/control-flow-part-ii.markdown", function (err, tags) {
        if (err) { throw(err); }
        sys.p(tags);
      }); */ 
    }
  }
}
