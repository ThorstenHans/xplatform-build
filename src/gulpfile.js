(function(module) {

    function loadCustomAddonIfInstalled(addOnName, tasks) {
        try {
            require.resolve(addOnName);
            tasks[addOnName] = require(addOnName);
        } catch (e) {
            console.error("NPM Module " + addOnName + " configured but not installed!")
            console.log("run npm i " + addOnName + " --D");
        };
    }

    function applyUserConfig(original, uConfig) {
        for (var p in uConfig) {
             if(typeof(uConfig[p]) === 'object' && !Array.isArray(uConfig[p]) && !original.hasOwnProperty(p)){
                original[p] = {};
            }
            else if (typeof(uConfig[p]) !== 'object' || Array.isArray(uConfig[p])) {
                original[p] = uConfig[p]
                continue;
            } 
            applyUserConfig(original[p], uConfig[p]);
        }
    };

    function XplatformBuild(userConfig) {
        var gulp = require('gulp');

        var config = require('./defaults.js');
        applyUserConfig(config, userConfig);

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
            inSequence: require('run-sequence'),
            empty: require('gulp-empty')
        };

        for (var customAddOn in config.addOns){
            loadCustomAddonIfInstalled(customAddOn, tasks);
        }

        var customGulpTasks = require('require-dir')('./gulptasks');
        for (var gulpTask in customGulpTasks) {
            customGulpTasks[gulpTask].init(gulp, tasks, config);
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
    }

    module.exports = XplatformBuild;
})(module);