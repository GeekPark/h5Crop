module.exports = function(grunt) {
  var paths = {
    src: './src/',
    srcjs: './src/js/',
    srccss: './src/css/',
    output: './assets/',
    css: './assets/css/',
    js: './assets/js/'
  };

  grunt.initConfig({
    paths: paths,

    // generate a local server
    connect: {
      server: {
        options: {
          port: 9000,
          open: false //open browser
        }
      }
    },

    // javascript merge and compress
    uglify: {
      options: {},
      dist: {
        files: {
          '<%= paths.js %>app.min.js':
            [
              // all js files should be here
              '<%= paths.srcjs %>jquery.min.js',
              '<%= paths.srcjs %>jquery.Jcrop.min.js',
              '<%= paths.srcjs %>h5crop.js',
              '<%= paths.srcjs %>app.js'
            ]
        }
      }
    },

    // first you should merge all scss files
    concat: {
      dist: {
        src: [
          '<%= paths.srccss %>vendor/*.scss',
          '<%= paths.srccss %>_common.scss',
          '<%= paths.srccss %>pages/*.scss'
        ],
        dest: '<%= paths.css %>app.scss'
      },
    },

    // compile scss file
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          '<%= paths.css%>app.css': '<%= paths.css %>app.scss'
        }
      }
    },

    // add -moz -webkit -o automatically
    autoprefixer: {
      options: {
        cascade: true
      },
      single_file: {
        src: '<%= paths.css%>app.css'
      }
    },

    // compress css file
    cssmin: {
      target: {
        files: {
          '<%= paths.css %>app.min.css': ['<%= paths.css%>app.css']
        }
      }
    },

    // compress images
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        },
        files: [{
        expand: true,
          cwd: '<%= paths.src %>images/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: '<%= paths.output %>images/'
        }]
      }
    },

    // auto watch file change and reload browser
    watch:{
      // watch sass
      sass:{
        // if you change the director to **/*.scss grunt will error
        files: ['<%= paths.srccss %>*.scss',
                '<%= paths.srccss %>pages/*.scss',
                '<%= paths.srccss %>vendor/*.scss'],
        tasks:['concat', 'sass', 'autoprefixer', 'cssmin'],
        options: {
          livereload: true,
          interval: 500
        }
      },

      // watch js
      js:{
        files: ['<%= paths.srcjs %>*.js'],
        tasks:['uglify'],
        options: {
          livereload: true,
          interval: 500
        }
      },

      // watch images
      images: {
        files: ['<%= paths.src %>images/**/*.{png,jpg,jpeg,gif}'],
        tasks:['imagemin'],
        options: {
          livereload: true,
          interval: 500
        }
      },

      // document
      static: {
        files: ['**/*.{slim,html}'],
        options: {
          livereload: true,
          interval: 500
        }
      }
    },
    copy: {
      deploy: {
        expand: true,
        src: ['<%= paths.srcjs %>h5crop.js'],
        flatten: true,
        filter: 'isFile',
        dest: 'dest/'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['imagemin', 'uglify', 'concat', 'sass', 'autoprefixer', 'cssmin', 'connect', 'watch']);
  grunt.registerTask('deploy', ['copy:deploy']);
}
