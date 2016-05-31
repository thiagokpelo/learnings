var gulp = require('gulp'),
	sass = require('gulp-sass'),
	compass = require('gulp-compass'),
	browserSync = require('browser-sync'),
	files = ['src/**/*.html', 'src/**/*.js', 'src/**/*.jpg', 'src/**/*.png'];

gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});
});

gulp.task('compass', function() {
	return gulp.src('src/sass/*.scss')
		.pipe(compass({
			config_file: 'config.rb',
			css: 'src/css',
			images: 'src/imagens',
			sass: 'src/sass'
		}))
		.pipe(browserSync.stream());
});

gulp.task('sass', function () {
	return gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
});

gulp.task('w', ['compass', 'server'], function () {
	gulp.watch('src/sass/**/*.scss', ['compass']);
	gulp.watch(files).on('change', browserSync.reload);
});