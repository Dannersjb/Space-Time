/**
 * Created by Dannersjb on 07/04/2015.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

	watch: {
	    sass: {
		files: ['../web/scss/*scss'],
		tasks: ['sass']
	    }
},
sass: {
    dist: {
        options: {
            compress: false,
                sourcemap: 'none'
        },
        files: [{
            expand: true,
            cwd: '../web/scss',
            src: ['*.scss'],
            dest: '../web/css',
            ext: '.css'
        }]
    }
}
});
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ["watch"]);

};