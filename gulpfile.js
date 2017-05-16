'use strict';

var gulp    = require('gulp');
var clean   = require('gulp-clean');
var css     = require('gulp-css');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var connect     = require('gulp-connect');
var browserSync = require('browser-sync').create();


/* Building into single .css file name called mincss.css */
gulp.task('css', function(){
    gulp.src([
            /* Injecting all .css here  --- > Start  */
                './app.css'
            /* Injecting all .css here  --- > End  */
        ])
        .pipe(concat('./mincss.css'))
        .pipe(css())
        .pipe(gulp.dest('./'));
});

/* Building into single .js file name called all.js */
gulp.task('scripts', function(){
    gulp.src([
            /* Injecting all .js here  --- > Start  */
                'node_modules/angular/angular.js',
                'node_modules/angular-ui-router/release/anular-ui-router.min.js'
            /* Injecting all .js here  --- > End  */
        ])
        .pipe(concat('./all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});


// Serving the Index.html to the browser.
gulp.task("serve", function(){
    browserSync.init({
        logPrefix: 'www.testapp.com',
        host:      'www.testapp.com',
        proxy:     'http://mytestapp:5000',
        port:      5000,
        notify: false,
        server : {
            baseDir: "./"
        }
    });
});

// Default loading all css.
gulp.task('default',['css','scripts','serve']);
    
// Manual Reloading 
gulp.watch("./index.html").on('change',browserSync.reload);
