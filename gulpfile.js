var gulp = require('gulp')
var less = require('gulp-less')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
var path = require('path')

gulp.task('css', function(){
    return gulp.src(
            [
                './public/assets/css/font-awesome.min.css',
                './public/assets/css/ie8.css',
                './public/assets/css/main.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/build/css/'))
})

gulp.task('build', function(){
    return gulp.src(
    		[
				'./public/assets/js/jquery.min.js',
				'./public/assets/js/jquery.poptrox.min.js',
				'./public/assets/js/skel.min.js',
				'./public/assets/js/util.js',
				'./public/assets/js/ie/respond.min.js',
				'./public/assets/js/main.js'
    		]
    	)
        .pipe(gp_concat('gulp-concat.js'))
        .pipe(gulp.dest('./public/min/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/build/'));
})

gulp.task('default', ['css', 'build'], function(){})
