(function(module) {
    'use strict';

    function RegisterTasks(gulp, tasks, config) {

        gulp.task('private:build:mobile', function(done){
            tasks.shelljs.cd(config.folders.mobile.root);
            tasks.shelljs.exec('cordova build');
            tasks.shelljs.cd(config.folders.mobile.backlinkToProjectRoot);
            done();
        });

        gulp.task('private:run:mobile', function(done){
            tasks.shelljs.cd(config.folders.mobile.root);
            config.options.cordova.runCommands.map(function(cmd){
                tasks.shelljs.exec(cmd);
            });
            tasks.shelljs.cd(config.folders.mobile.backlinkToProjectRoot);
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