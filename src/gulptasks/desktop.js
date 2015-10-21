(function(module) {
    'use strict';

    function RegisterTasks(gulp, tasks) {

        gulp.task('build:desktop', function(done) {
            tasks.inSequence('private:build', 'private:app:package', 'private:build:nw', done);
        });

        gulp.task('private:build:nw', function(done) {

            var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
            var nw = new tasks.NwBuilder({
                files: 'dist/**/*',
                cacheDir: tasks.path.join(homeDir, '.cache'),
                buildDir: tasks.path.join(process.cwd(), "desktop-build"),
                version: '0.12.3',
                platforms: ['win32', 'win64', 'osx64', 'linux32', 'linux64'],
                macIcns: 'assets/x-note.icns',
                winIco: 'assets/x-note.ico',
                macZip: false
                // uncomment the previous row if you're buiding the app on windows or if you've followed this guide
                // https://github.com/nwjs/nw.js/wiki/Icons
                
            });
            nw.build();
            done();
        });

        gulp.task('private:app:package', function() {
            return gulp.src('src/app.package.json')
                .pipe(tasks.rename('package.json'))
                .pipe(gulp.dest('dist'));
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