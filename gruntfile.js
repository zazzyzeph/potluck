module.exports = function(grunt) {
  grunt.initConfig ({
    sass: {
      dist: {
        files: {
          'public/css/app.css' : 'sass/app.scss'
        },
      },
    },
    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload : true
        },
      },
      jade: {
        files: ['views/**/*.jade'],
        options: {
          livereload : true
        },
      },
      js: {
        files: ['public/js/**/*.js'],
        options: {
          livereload : true
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
};


