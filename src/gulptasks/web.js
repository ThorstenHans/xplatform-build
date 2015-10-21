(function(module) {
    'use strict';

    function RegisterTasks(gulp, tasks, config) {


        gulp.task('private:app:templates', function() {
            return gulp.src(config.sources.ngTemplates)
                .pipe(tasks.ngTemplateCache(config.options.ngTemplates))
                .pipe(gulp.dest(config.folders.temp.root));
        });

        gulp.task('private:app:js', function() {
            return gulp.src(config.sources.appScripts)
                .pipe(tasks.ngAnnotate(config.options.ngAnnotate))
                .pipe(tasks.concat(config.filenames.appScripts))
                .pipe(tasks.uglify(config.options.uglify))
                .pipe(gulp.dest(config.folders.dist.scripts));
        });

        gulp.task('private:app:css', function() {
            return gulp.src(config.sources.appStyles)
                .pipe(tasks.concat(config.filenames.appStyles))
                .pipe(tasks.cssmin(config.options.cssmin))
                .pipe(gulp.dest(config.folders.dist.styles));
        });
        gulp.task('private:app:html', function() {
            var sources = gulp.src(config.sources.injectables);

            return gulp.src(config.filenames.injectTargets)
                .pipe(tasks.inject(sources, config.options.inject))
                .pipe(gulp.dest(config.folders.dist.root));
        });

        gulp.task('private:vendor:css', function() {
            return gulp.src(config.sources.vendorStyles)
                .pipe(tasks.rename(config.filenames.vendorStyles))
                .pipe(gulp.dest(config.folders.dist.styles));
        });

        gulp.task('private:vendor:js', function() {
            return gulp.src(config.sources.vendorScripts)
                .pipe(tasks.concat(config.filenames.vendorScripts))
                .pipe(gulp.dest(config.folders.dist.scripts));
        });
    }

    module.exports = {
        init: RegisterTasks,
        doc: function() {

        }
    };

})(module);