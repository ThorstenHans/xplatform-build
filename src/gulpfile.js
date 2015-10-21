var gulp = require('gulp');

var tasks = {
    del: require('del'),
    concat: require('gulp-concat'),
    inject: require('gulp-inject'),
    cssmin: require('gulp-cssmin'),
    ngAnnotate: require('gulp-ng-annotate'),
    ngTemplateCache: require('gulp-angular-templatecache'),
    rename: require('gulp-rename'),
    shelljs: require('shelljs'),
    uglify: require('gulp-uglify'),
    path: require('path'),
    NwBuilder: require('nw-builder'),
    inSequence: require('run-sequence')
};

var customGulpTasks = require('require-dir')('./gulptasks');

for (var gulpTask in customGulpTasks) {
    customGulpTasks[gulpTask].init(gulp, tasks);
}

gulp.task('help', function() {
    console.log('Execute one of the following commands\n');
    for (var gulpTask in customGulpTasks) {
        if (!customGulpTasks[gulpTask].hasOwnProperty('docs')) {
            continue;
        }
        customGulpTasks[gulpTask].docs.map(function(doc) {
            console.log("gulp " + doc.task + " - (" + doc.description + ")");
        });
    }
    console.log('\n');
});