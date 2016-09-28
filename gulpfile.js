'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:true});


gulp.task('inject', () => {
    var wiredep = require('wiredep').stream;
    
    var injectSrc = gulp.src(['./public/css/*.css'], {read: false});
    
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib'
    };
    var injectOptions = {ignorePath: '/public'};
    
    return gulp.src('./public/index.html')
        .pipe(wiredep(options))
        .pipe($.inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./public'));
});

gulp.task('compile:sass', () => {
    return gulp.src('./sass/main.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['last 2 version', '>5%']}))
        .pipe(gulp.dest('./public/css'));
});