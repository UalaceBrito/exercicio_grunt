module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['less', 'uglify']);
};