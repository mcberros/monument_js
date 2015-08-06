module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        undef: true,
        unused: true,
        jasmine: true,
        node: true,
        predef: [ "browser", "by", "element" ]
      },
      all: ['Gruntfile.js', 'controllers/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'test/**/*.js', 'views/**/*.js']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
};