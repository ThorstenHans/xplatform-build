(function(module) {
    'use strict';

    function RegisterTasks(gulp, tasks) {

        gulp.task('private:build', function(done) {
            tasks.inSequence(
                'private:clean',
                'private:app:templates', [
                    'private:vendor:css',
                    'private:vendor:js',
                    'private:app:css',
                    'private:app:js'
                ],
                'private:app:html',
                done
            );
        });

        gulp.task('private:clean', function(done) {
            tasks.del.sync(['dist/**/*', '.temp/**/*'], {
                force: true
            });
            done();
        });

        gulp.task('build', ['private:build'], function(done){
            done();
        });

        gulp.task('default', ['help'], function(done){
            done();
        });

        gulp.task('watch', function(done) {
            tasks.inSequence('private:build', function() {
                return gulp.watch('src/**/*', ['private:build']);
            });
        });
    }

    module.exports = {
        init: RegisterTasks,
        docs: [{
            task: 'watch',
            description: 'Starts the watcher'
        }, 
        {
            task: 'build',
            description: 'creates a plain web build without watching'
        },
        {
            task: 'default',
            description: 'prints this help'
        }]
    };

})(module);