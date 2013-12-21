/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // RegExp.quote = require('regexp-quote')
  // var btoa = require('btoa')
  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              ' */\n\n',
    jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }\n\n',

    // Task configuration.
    clean: {
      options: {
        force: true
      },
      css: ['../css/<%= pkg.name %>*.css'],
      js: ['../js/<%= pkg.name %>*.js'],
      fonts: ['../fonts']
    },

    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js'
        ],
        dest: '../js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: '../js/<%= pkg.name %>.min.js'
      }
    },

    recess: {
      options: {
        compile: true,
        banner: '<%= banner %>'
      },
      bootstrap: {
        src: ['less/bootstrap.less', '../css/project.css'],
        dest: '../css/<%= pkg.name %>.css'
      },
      min: {
        options: {
          compress: true
        },
        src: ['less/bootstrap.less', '../css/project.css'],
        dest: '../css/<%= pkg.name %>.min.css'
      },
      // theme: {
//         src: ['less/theme.less'],
//         dest: '../css/<%= pkg.name %>-theme.css'
//       },
//       theme_min: {
//         options: {
//           compress: true
//         },
//         src: ['less/theme.less'],
//         dest: '../css/<%= pkg.name %>-theme.min.css'
//       }
    },

    copy: {
      fonts: {
        expand: true,
        src: ["fonts/*"],
        dest: '../'
      }
    }
  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.loadNpmTasks('grunt-contrib-uglify');



  grunt.loadNpmTasks('grunt-recess');


  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Fonts distribution task.
  grunt.registerTask('dist-fonts', ['copy']);

  // Full distribution task.
  grunt.registerTask('build', ['clean', 'dist-css', 'dist-fonts', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['dist-css']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', ['sed']);

  // task for building customizer
  grunt.registerTask('build-customizer', 'Add scripts/less files to customizer.', function () {
    var fs = require('fs')

    function getFiles(type) {
      var files = {}
      fs.readdirSync(type)
        .filter(function (path) {
          return type == 'fonts' ? true : new RegExp('\\.' + type + '$').test(path)
        })
        .forEach(function (path) {
          var fullPath = type + '/' + path
          return files[path] = (type == 'fonts' ? btoa(fs.readFileSync(fullPath)) : fs.readFileSync(fullPath, 'utf8'))
        })
      return 'var __' + type + ' = ' + JSON.stringify(files) + '\n'
    }

    var files = getFiles('js') + getFiles('less') + getFiles('fonts')
    fs.writeFileSync('docs-assets/js/raw-files.js', files)
  });
};
