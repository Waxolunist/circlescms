// Handlebars Template Engine wrapper for SocketStream 0.3

var fs = require('fs'),
    path  = require('path'),
    Handlebars = require('handlebars');

exports.init = function(ss, config) {

  // Send handlebars runtime to the client
  var clientCode = fs.readFileSync(path.join(__dirname, 'handlebars.runtime.js'), 'utf8');
  ss.client.send('lib', 'handlebars-template', clientCode);

  return {

    name: 'Handlebars',

    // Opening code to use when a Handlebars template is called for the first time
    prefix: function() {
      return '<script type="text/javascript">(function(){var ht=Handlebars.template,t=require(\'socketstream\').tmpl;'
    },

    // Closing code once all Handlebars templates have been written into the <script> tag
    suffix: function() {
      return '}).call(this);</script>';
    },

    // Compile template into a function and attach it to ss.tmpl
    process: function(template, path, id) {

      var compiledTemplate;

      try {
        compiledTemplate = Handlebars.precompile(template);
      } catch (e) {
        var message = '! Error compiling the ' + path + ' template into Handlebars';
        console.log(String.prototype.hasOwnProperty('red') && message.red || message);
        throw new Error(e);
        compiledTemplate = '<p>Error</p>';
      }

      return 't[\'' + id + '\']= ht(' + compiledTemplate + ');';    
    }
  }
}
