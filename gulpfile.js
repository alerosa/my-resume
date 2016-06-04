var gulp = require('gulp');
var sass = require('gulp-sass');
var pdf = require('gulp-html-pdf');
var autoprefixer = require('gulp-autoprefixer');
var inlineCss = require('gulp-inline-css');

gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass({
			includePaths: ['./node_modules/normalize.scss']
		}).on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('pdf').src('resume.htm')
	.pipe(inlineCss())
	.pipe(pdf({
		format: 'A3',
		border: {
			'top': '15px',
	    'right': '0',
	    'bottom': '15px',
	    'left': '0'
		}
	}))
	.pipe(gulp.dest('./build'))

gulp.task('dev', ['sass:watch']);
gulp.task('build', ['sass', 'pdf']);
