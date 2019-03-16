module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
 
        // CSS MIN w/cssmin

        cssmin: {
            custom_css: {
                files: [{
                    // expand: true,
                    // cwd: 'src/css/',
                    // src: ['*.css'],
                    // dest: 'dist/',
                    // ext: '.min.css'

                    'dist/barikoi.min.css': ['src/css/barikoi.css']
                }]
            }
        },

        // JS MIN w/uglify-es

        uglify: {
            options: {
                mangle: false
            },

            main_script: {
                files: {
                    'dist/barikoi.min.js': ['src/js/barikoi.js']
                }
            }
        },

        // Clean fooolder & flies w/clean

        // clean: {
        //     css_vendors: ['build/css/app-custom.css'],
        //     js: ['build/js/all-ctrl.js']
        //   },

        // Watch w/watch
        //   watch: {
        //     scripts: {
        //       files: ['views/assets/css/custom-css/*.css', 'js/controller/*.js', 'js/service/*.js'],
        //       tasks: ['concat', 'cssmin', 'uglify', 'clean'],
        //       options: {
        //         spawn: false,
        //       },
        //     },
        //   },
    })

    // Concat multiple files into one file
    grunt.loadNpmTasks('grunt-contrib-concat')

    // Minifyy teh see-es-es
    grunt.loadNpmTasks('grunt-contrib-cssmin')

    // Uglify teh jae-ess
    grunt.loadNpmTasks('grunt-contrib-uglify-es')

    // Clean flieees & fleees
    grunt.loadNpmTasks('grunt-contrib-clean')

    // Check for file changes
    grunt.loadNpmTasks('grunt-contrib-watch')

    // Default task(s).
    // grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'clean'])
    grunt.registerTask('default', ['cssmin', 'uglify'])

}