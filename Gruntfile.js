module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist/**/*']
    },

    less: {
      development: {
        files: {
          'dist/css/estilo.css': 'src/less/estilo.less'
        }
      }
    },

    uglify: {
      options: {
        compress: true,
        mangle: true,
        output: {
          beautify: false
        }
      },
      my_target: {
        files: {
          'dist/js/script.min.js': ['src/js/script.js']
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['uglify']
      },
      styles: {
        files: ['src/less/*.less'],
        tasks: ['less']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['clean', 'less', 'uglify']);
  grunt.registerTask('dev', ['build', 'watch']);
  grunt.registerTask('default', ['build']);
};