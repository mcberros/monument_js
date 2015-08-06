module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      options: {
        background: true
      },
      dev: {
        options: {
          script: 'index.js'
        }
      }
    },
    jshint: {
      options: {
        undef: true,
        unused: true,
        jasmine: true,
        node: true,
        predef: [ "browser", "by", "element" ]
      },
      all: ['Gruntfile.js', 'controllers/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'test/**/*.js', 'views/**/*.js']
    },
    protractor: {
      options: {
        configFile: "protractor_conf.js",
      },
      all: {}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'express', 'protractor']);
};