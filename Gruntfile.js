module.exports = function(grunt) {


  grunt.initConfig({
    nodeunit: {
      all: ['test']
    } 
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['nodeunit']);
};

