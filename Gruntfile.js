module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        ['Gruntfile.js', 'server/**/*.js', 'index.js', 'client/collections/*.js', 'client/models/*.js', 'client/views/*.js']
      ],
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          'client/lib/**/*.js',
          'node_modules/**/*.js'
        ]
      }
    },

    watch: {
      scripts: {
        files: ['client/**/*.js', 'client/*.js', 'server/**/*.js', 'server/*.js', 'index.js', 'client/styles/*.css', 'Gruntfile.js'],
        tasks: ['jshint', 'concat'],
        options: {
          spawn: false,
        },
      },
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'client/lib/underscore/underscore.js',
          'client/lib/jquery/dist/jquery.js',
          'client/lib/backbone/backbone.js',
          'client/models/*.js',
          'client/collections/*.js',
          'client/views/ApplicationView.js',
          'client/views/NewApplicationFormView.js',
          'client/scripts/*.js',
          ],
        dest: 'client/dist/public/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'client/dist/public/<%= pkg.name %>.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    nodemon: {
      dev: {
        script: 'index.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['jshint', 'concat', 'watch']);
};