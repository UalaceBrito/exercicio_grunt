/**
 * Gruntfile.js
 * ------------------------------------------------------------
 * Projeto: Exercício Grunt — EBAC
 * Autor:   EBAC Student
 * Descrição: Pipeline de automação front-end com Grunt.
 *            Compila LESS, minifica JS/CSS/HTML, lint JS e
 *            disponibiliza servidor local com LiveReload.
 * ------------------------------------------------------------
 */

module.exports = function (grunt) {
  'use strict';

  // Carrega todas as tarefas automaticamente
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Banner injetado nos arquivos gerados
    banner:
      '/*! <%= pkg.name %> v<%= pkg.version %> | ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> */\n',

    /* ============================================================
     * LIMPEZA
     * ============================================================ */
    clean: {
      dist: ['dist/**/*'],
      temp: ['.tmp']
    },

    /* ============================================================
     * LINT JAVASCRIPT
     * ============================================================ */
    eslint: {
      target: ['src/js/**/*.js'],
      options: {
        fix: false
      }
    },

    /* ============================================================
     * COMPILAÇÃO LESS (requisito 2 do exercício)
     * ============================================================ */
    less: {
      development: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'dist/css/estilo.css.map',
          sourceMapBasepath: 'src/less',
          sourceMapRootpath: '../../',
          compress: false
        },
        files: {
          'dist/css/estilo.css': 'src/less/estilo.less'
        }
      }
    },

    /* ============================================================
     * MINIFICAÇÃO CSS
     * ============================================================ */
    cssmin: {
      options: {
        banner: '<%= banner %>',
        level: 2
      },
      dist: {
        files: {
          'dist/css/estilo.min.css': ['dist/css/estilo.css']
        }
      }
    },

    /* ============================================================
     * CONCATENAÇÃO JS
     * ============================================================ */
    concat: {
      options: {
        separator: ';\n',
        banner: '<%= banner %>'
      },
      dist: {
        src: ['src/js/**/*.js'],
        dest: '.tmp/script.js'
      }
    },

    /* ============================================================
     * COMPRESSÃO JAVASCRIPT (requisito 3 do exercício)
     * ============================================================ */
    uglify: {
      options: {
        banner: '<%= banner %>',
        compress: {
          drop_console: false,
          dead_code: true
        },
        mangle: true,
        output: {
          beautify: false,
          comments: false
        }
      },
      dist: {
        files: {
          'dist/js/script.min.js': ['.tmp/script.js']
        }
      }
    },

    /* ============================================================
     * MINIFICAÇÃO HTML
     * ============================================================ */
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true
        },
        files: {
          'dist/index.html': '.tmp/index.html'
        }
      }
    },

    /* ============================================================
     * CÓPIA DE ASSETS ESTÁTICOS
     * ============================================================ */
    copy: {
      html: {
        options: {
          process: function (content) {
            return content
              .replace('href="dist/css/estilo.css"', 'href="css/estilo.min.css"')
              .replace('src="dist/js/script.min.js"', 'src="js/script.min.js"');
          }
        },
        files: {
          '.tmp/index.html': ['index.html']
        }
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/assets/',
            src: ['**'],
            dest: 'dist/assets/'
          }
        ]
      }
    },

    /* ============================================================
     * SERVIDOR LOCAL + LIVERELOAD
     * ============================================================ */
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'dist',
          livereload: true,
          open: true
        }
      }
    },

    /* ============================================================
     * WATCH
     * ============================================================ */
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['eslint', 'concat', 'uglify']
      },
      styles: {
        files: ['src/less/**/*.less'],
        tasks: ['less:development', 'cssmin']
      },
      html: {
        files: ['index.html'],
        tasks: ['copy:html', 'htmlmin']
      }
    }
  });

  /* ============================================================
   * TAREFAS REGISTRADAS
   * ============================================================ */
  grunt.registerTask('build', [
    'clean:dist',
    'clean:temp',
    'eslint',
    'less:development',
    'cssmin',
    'concat',
    'uglify',
    'copy:html',
    'htmlmin'
  ]);

  grunt.registerTask('serve', ['build', 'connect', 'watch']);
  grunt.registerTask('dev', ['build', 'watch']);
  grunt.registerTask('default', ['build']);
};