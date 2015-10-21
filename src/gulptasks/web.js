(function(module) {
    'use strict';

    function RegisterTasks(gulp, tasks) {


        gulp.task('private:app:templates', function() {
            return gulp.src('src/app/**/*.html')
                .pipe(tasks.ngTemplateCache({
                    module: "xnote",
                    filename: 'templates.js'
                }))
                .pipe(gulp.dest('.temp'));
        });

        gulp.task('private:app:js', function() {
            return gulp.src([
                    'src/app/app.js',
                    'src/app/**/*.js',
                    '.temp/templates.js'
                ])
                .pipe(tasks.ngAnnotate())
                .pipe(tasks.concat('app.js'))
                .pipe(tasks.uglify())
                .pipe(gulp.dest('dist/scripts'));
        });

        gulp.task('private:app:css', function() {
            return gulp.src('src/styles/**.css')
                .pipe(tasks.concat('app.min.css'))
                .pipe(tasks.cssmin())
                .pipe(gulp.dest('dist/styles'));
        });
        gulp.task('private:app:html', function() {
            var sources = gulp.src([
                'dist/styles/vendor.min.css',
                'dist/styles/app.min.css',
                'dist/scripts/vendor.min.js',
                'dist/scripts/app.js'
            ]);

            return gulp.src('src/index.html')
                .pipe(tasks.inject(sources, {
                    addRootSlash: false,
                    addPrefix: '.',
                    ignorePath: 'dist'
                }))
                .pipe(gulp.dest('dist'));
        });



        gulp.task('private:vendor:css', function() {
            return gulp.src([
                    'bower_components/angular-material-icons/angular-material-icons.css',
                    'bower_components/angular-material/angular-material.min.css'

                ])
                .pipe(tasks.rename('vendor.min.css'))
                .pipe(gulp.dest('dist/styles'));
        });

        gulp.task('private:vendor:js', function() {
            return gulp.src([
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-aria/angular-aria.min.js',
                    'bower_components/angular-material/angular-material.min.js',
                    'bower_components/angular-material-icons/angular-material-icons.min.js'
                ])
                .pipe(tasks.concat('vendor.min.js'))
                .pipe(gulp.dest('dist/scripts'));
        });
    }

    module.exports = {
        init: RegisterTasks,
        doc: function() {

        }
    };

})(module);