var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	htmlReplace = require('gulp-html-replace'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	cssmin = require('gulp-cssmin'),
	jshint = require('gulp-jshint'),
	csslint = require('gulp-csslint'),
	jshintStylish = require('jshint-stylish'),
	autoprefixer = require('gulp-autoprefixer'),
	less = require('gulp-less'),
	browserSync = require('browser-sync');

gulp.task('default', ['copy'], function () {
	gulp.start('build-img', 'usemin');
});

gulp.task('clean', function () {
	return gulp.src('dist')
		.pipe(clean());
});

gulp.task('copy', ['clean'], function () {
	return gulp.src('src/**/*')
		.pipe(gulp.dest('dist'));
});

gulp.task('build-img', function () {
	gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('src/img'));
});

gulp.task('usemin', function () {
	gulp.src('dist/**/*.html')
		.pipe(usemin({
			'js' : [uglify],
			'css' : [autoprefixer, cssmin]
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});

	gulp.watch('src/**/*.js').on('change', function (event) {
		gulp.src(event.path)
			.pipe(jshint())
			.pipe(jshint.reporter(jshintStylish));
	});

	gulp.watch('src/less/*.less').on('change', function (event) {
		console.log('Compilando arquivo: ' + event.path);
		gulp.src(event.path)
			.pipe(less().on('error', function (error) {
				console.log('Problema na compilação');
				console.log(error.message);
			}))
			.pipe(gulp.dest('src/css'));
	});

	gulp.watch('src/**/*.css').on('change', function (event) {
		gulp.src(event.path)
			.pipe(csslint())
			.pipe(csslint.reporter());
	});

	gulp.watch('src/**/*').on('change', browserSync.reload);
});