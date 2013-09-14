module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    mdlint: ['README.md'],
    copy: {
      test: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'test/fixtures/templateEngine1',
          dest: 'test/fixtures/templateEngine1Clone',
          src: ['**']
        }]
      }
    },
    clean: {
      test: 'test/fixtures/templateEngine1Clone'
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: {
        src: ['test/*.js']
      }
    },
    jshint: {
      options: {
        bitwise: true,
        indent: 2,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        nonew: true,
        quotmark: 'single',
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        trailing: true,
        eqnull: true,
        node: true,
        expr: true,
        evil: true,
        globals: {
          describe: true,
          it: true,
          before: true
        }
      },
      files: {
        src:  ['*.js', 'test/*.js']
      }
    }
  });

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['jshint', 'mdlint', 'copy', 'simplemocha', 'clean']);
};
