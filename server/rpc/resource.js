var resource = {
  _suffixRe: /(?:\.([^./]+))?$/,
  _defaultsuffixes: ["md", "html"],
  resolveContent: function(uri) {
    var ret = new Array();
    if(this._hasDefaultSuffix(uri)) {
      ret.push(uri);
    }
    ret.push(uri + "/");
    ret.push(404);
    return ret;
  },
  _getSuffix: function(uri) {
    return this._suffixRe.exec(uri)[1];
  },
  _hasDefaultSuffix: function(uri) {
    return this._defaultsuffixes.indexOf(this._getSuffix(uri)) >= 0;
  },
  _isDirectoryPath: function(uri) {
    return uri.charAt(uri.length-1) == '/';
  }
};
