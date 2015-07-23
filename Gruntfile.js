'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  
  // Add require for connect-modewrite
  var modRewrite = require('connect-modrewrite');

  grunt.initConfig({
    settings: {
      src: 'src',
      dist: 'dist'
    },
    release: {
      options: {
        tagName: 'v<%= version %>',
        tag: true,
        push: true,
        pushTags: true,
        npm: false,
        npmtag: false,
        additionalFiles: ['bower.json']
      }
    },
    uglify: {
      build: {
        src: '<%= settings.src %>/sphere-sdk.js',
        dest: '<%= settings.dist %>/sphere-sdk.min.js'
      }
    },
    shell: {
      bowerRegister: {
        command: 'bower register ' + require('./bower.json').name + ' ' + require('./bower.json').repository.url
      }
    }
  });

  grunt.registerTask('publish', ['update_json', 'uglify', 'shell:bowerRegister']);
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('build:patch', ['uglify','release:patch']);
  grunt.registerTask('build:minor', ['uglify','release:minor']);
  grunt.registerTask('build:major', ['uglify','release:major']);
};
