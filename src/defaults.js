(function(module){

    function exportDefaultConfig(){
        var path = require('path');

        var cacheDir = path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.cache'),
            buildDir = path.join(process.cwd(), "desktop-build");
        return {
            addOns:{},
            folders: {
                mobile: {
                    root: 'mobile',
                    backlinkToProjectRoot: '..'
                },
                dist:{
                    root: 'dist',
                    styles: 'dist/styles',
                    scripts: 'dist/scripts'
                },
                temp:{
                    root: ".temp"
                }
            },
            filenames: {
                appScripts: 'app.js',
                appStyles: 'app.min.css',
                vendorStyles: 'vendor.min.css',
                vendorScripts: 'vendor.min.js',
                injectTargets: ['src/index.html']
            },
            sources: {
                injectables: ['dist/styles/vendor.min.css','dist/styles/app.min.css','dist/scripts/vendor.min.js','dist/scripts/app.js'],
                ngTemplates: ["src/app/**/*.html"],
                del: ['dist/**/*', '.temp/**/*'],
                watch: ['src/**/*'],
                appScripts : ['src/app/app.js', 'src/app/**/*.js', '.temp/templates.js'],
                appStyles: ['src/styles/**.css'],
                vendorStyles: ['bower_components/angular-material-icons/angular-material-icons.css', 'bower_components/angular-material/angular-material.min.css'],
                vendorScripts: ['bower_components/angular/angular.min.js','bower_components/angular-animate/angular-animate.min.js','bower_components/angular-aria/angular-aria.min.js','bower_components/angular-material/angular-material.min.js','bower_components/angular-material-icons/angular-material-icons.min.js'],
                appPackageJson: 'src/app.package.json',
            },
            options: {
                ngTemplates: { module: "xnote", filename: "templates.js" },
                uglify: {},
                del: { force: true },
                cssmin: {},
                ngAnnotate: {},
                inject: { addRootSlash: false, addPrefix: '.', ignorePath: 'dist' },
                cordova: {
                    runCommands: ["cordova emulate ios", "cordova run android"]
                },
                nw: { files: 'dist/**/*', cacheDir: cacheDir, buildDir: buildDir, version: '0.12.3', platforms: ['win32', 'win64', 'osx64', 'linux32', 'linux64'], macIcns: 'assets/x-note.icns', winIco: 'assets/x-note.ico', macZip: false },

            
            }
            
        };
    }

    module.exports = exportDefaultConfig();
})(module);