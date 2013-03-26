var md = require("node-markdown").Markdown,
    Path = require("path"),
    Git = require("git-fs"),
    moment = require("moment");

Git("../circlescms-content");

exports.actions = function(req, res, ss) {

  req.use('session');

  return {

    loadcontent: function(message, op) {
      console.log(message);
      console.log(op);
      var path = null;
      switch(op) {
        case "list":
          path = message.substring(1);
          readDir(path, res);
          break;
        default:
          path = message.substring(1) + ".md";       
          readFile(path, res);
          break;
      }
    }
  };

};

function readFile(path, res) {
  Git.getHead(function(err, sha) {
    if(err) throw err;
    Git.readFile(sha, path, function(err, data) {
      if(err) return res("Content not found");
      return res(md(data.toString()));
    });
  });
}

function readDir(path, res) {
  Git.getHead(function(err, sha) {
    if(err) throw err;
    Git.readDir(sha, path, function(err, data) {
      if(err) return res("Content not found");

      var files = new Array();
      data.files.forEach(function (file) {
        //windows - cygwin fix
        var fullpath = Path.join(path, file).replace(Path.sep, '/');
        
        Git.log(fullpath, function (err, logdata) {
          if (err) throw err;
          //Get first json entry
          var keys = Object.keys(logdata);
          var filelog = logdata[keys[0]];
          //remove extension
          filelog.path = fullpath.slice(0, -Path.extname(fullpath).length);
          files.push(filelog);
          //when all files are processed, return
          if(files.length == data.files.length) {
            return res(files);
          }
        });
      });
    });
  }); 
}
