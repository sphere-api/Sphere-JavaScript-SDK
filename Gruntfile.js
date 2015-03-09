'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    settings: {
      src: 'src',
      dist: 'src'
    },
    uglify: {
      build: {
        src: '<%= settings.src %>/sphere-sdk.js',
        dest: '<%= settings.dist %>/sphere-sdk.min.js'
      }
    }
  });

  grunt.registerTask('build', [
    'uglify'
  ]);
};
