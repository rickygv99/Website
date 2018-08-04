module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // Tasks
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'css/style.css'
      }
    },
    cssmin: {
      target: {
        files: [{
            expand: true,
            cwd: 'css',
            src: ['*.css', '!*.min.css'],
            dest: 'css',
            ext: '.min.css'
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: '.'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'postcss', 'cssmin']
      }
    }
  })

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-postcss')

  // Default task(s)
  grunt.registerTask('default', ['sass', 'postcss', 'cssmin', 'connect:livereload', 'watch'])
}