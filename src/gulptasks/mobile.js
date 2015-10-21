(function(module) {
    'use strict';

    function RegisterTasks(gulp, tasks) {

        gulp.task('private:build:mobile', function(done){
            tasks.shelljs.cd('mobile');
            // 'cordova build' is short for 
            // 'cordova build ios && cordova build android'
            tasks.shelljs.exec('cordova build');
            tasks.shelljs.cd('..');
            done();
        });

        gulp.task('private:run:mobile', function(done){
            tasks.shelljs.cd('mobile');
            tasks.shelljs.exec('cordova emulate ios');
            // use run android for genymotion
            // use emulate android for stock emulator
            tasks.shelljs.exec('cordova run android');
            tasks.shelljs.cd('..');
            done();
        });

        gulp.task('build:mobile', function(done){
            return tasks.inSequence(
                'private:build', 
                'private:build:mobile', 
                done);
        });

        gulp.task('run:mobile', function(done){
            return tasks.inSequence(
                'private:build:mobile', 
                'private:run:mobile', 
                done);
        });
    }


    module.exports = {
        init: RegisterTasks,
        docs: [{
            task: 'build:mobile',
            description: 'builds the mobile app for all platforms'
        }, {
            task: 'run:mobile',
            description: 'runs all mobile apps (iOS and genymotion in this case)'
        }]
    };

})(module);