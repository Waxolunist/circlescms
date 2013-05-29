module.exports = function(grunt) {


  grunt.initConfig({
    nodeunit: {
      all: ['test']
    },
    htmlSnapshot: {
      all: {
        options: {
          //that's the path where the snapshots should be placed
          //it's empty by default which means they will go into the directory
          //where your Gruntfile.js is placed
          snapshotPath: 'snapshots/',
          //This should be either the base path to your index.html file
          //or your base URL. Currently the task does not use it's own
          //webserver. So if your site needs a webserver to be fully
          //functional configure it here.
          sitePath: 'http://localhost:3000/',
          //you can choose a prefix for your snapshots
          //by default it's 'snapshot_'
          fileNamePrefix: 'sp_',
          //by default the task waits 500ms before fetching the html.
          //this is to give the page enough time to to assemble itself.
          //if your page needs more time, tweak here.
          msWaitForPages: 2000,
          //if you would rather not keep the script tags in the html snapshots
          //set `removeScripts` to true. It's false by default
          removeScripts: true,
          //he goes the list of all urls that should be fetched
          urls: [
            '',
            '/about',
            '/resume',
            '/projects',
            '/blog'
            //'/resume#0',
            //'/resume#1',
            //'/resume#2',
            //'/resume#3'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-html-snapshot');
  grunt.registerTask('default', ['nodeunit']);
};

