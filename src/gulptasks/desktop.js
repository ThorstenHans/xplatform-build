(function(module) {
    'use strict';

    function RegisterTasks(gulp, tasks, config) {

        gulp.task('build:desktop', function(done) {
            tasks.inSequence('private:build', 'private:app:package', 'private:build:nw', done);
        });

        gulp.task('private:build:nw', function(done) {
            var nw = new tasks.NwBuilder(config.options.nw);
            nw.build();
            done();
        });

        gulp.task('private:app:package', function() {
            return gulp.src(config.sources.appPackageJson)
                .pipe(tasks.rename('package.json'))
                .pipe(gulp.dest(config.folders.dist.root));
        });
    }

    module.exports = {
        init: RegisterTasks,
        docs: [{
            task: 'build:desktop',
            description: 'builds the desktop app'
        }]
    };

})(module);