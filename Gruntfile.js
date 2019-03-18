module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
 
        // CSS MIN w/cssmin

        cssmin: {
            custom_css: {
                files: [{
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
    })

    // Concat multiple files into one file
    grunt.loadNpmTasks('grunt-contrib-concat')

    // Minifyy teh see-es-es
    grunt.loadNpmTasks('grunt-contrib-cssmin')

    // Uglify teh jae-ess
    grunt.loadNpmTasks('grunt-contrib-uglify-es')

    // Check for file changes
    grunt.loadNpmTasks('grunt-contrib-watch')

    // Default task(s).
    // grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'clean'])
    grunt.registerTask('default', ['cssmin', 'uglify'])

}