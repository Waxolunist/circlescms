// Javascript formatter
'use strict';


// Dependencies
//
var fs = require('fs');

exports.init = function() {
  return {
    extensions: ['map'],
    assetType: 'js',
    contentType: 'application/json',
    compile: function(path, options, cb) {
      return cb(fs.readFileSync(path, 'utf8'));
    }
  };
};
