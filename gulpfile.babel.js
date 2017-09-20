'use strict';

/**
 * Import gulp modules:
 */
import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import pug from 'gulp-pug';
import svg from 'gulp-svgo';
import imagemin from 'gulp-imagemin';
import fontcustom from 'gulp-fontcustom';
import clean from 'gulp-clean';
import base64 from 'gulp-base64';
import data from 'gulp-data';

/**
 * Import modules:
 */
import path from 'path';
// import cssnext from 'postcss-cssnext';
// import precss from 'precss';
import sass from 'gulp-sass';
import mqpacker from 'css-mqpacker';
import cssnano from 'cssnano';
import atImport from 'postcss-import-url';
import browserSync from 'browser-sync';
// import getcolor from 'postcss-get-color';

/**
 * Initial Properties
 */
const dirs = {
	src: 'dev',
	dest: 'public'
};
const reload = browserSync.reload;
const processors = [
	atImport(),
	// getcolor(),
	mqpacker(),
	cssnano({
		reduceIdents: false,
	})
];


/**
 * gulp:tasks
 */
gulp.task('styles', () => {
	return gulp.src(`${dirs.src}/sass/*.scss`)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 6 versions', 'ie 8']
		}))
		// .pipe(base64({
		// 	extensions: ['svg'],
		// 	maxImageSize: 8*1024, // bytes
		// 	exclude:	['woff', 'woff2', 'ttf']
		// }))
		.pipe(postcss(processors))
		// .pipe(importCss())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(`${dirs.dest}/assets/css/`))
});

gulp.task('babel', ['copyLibs'], () => {
	return gulp.src([`${dirs.src}/js/**/*.+(js|es6)`, `!${dirs.src}/js/lib/*.js`])
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		// .pipe(concat('app.js', {newLine: ';'}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(`${dirs.dest}/assets/js/`));
});


gulp.task('copyLibs', () => {
	return gulp.src([`${dirs.src}/js/lib/*.js`])
		.pipe(gulp.dest(`${dirs.dest}/assets/js/lib/`));
});



gulp.task('images', ['svgs'], () => {
	return gulp.src(`${dirs.src}/img/**/*.+(jpg|png|jpeg)`)
		.pipe(imagemin())
		.pipe(gulp.dest(`${dirs.dest}/assets/img`));
});

gulp.task('svgs', () => {
	return gulp.src([`${dirs.src}/img/**/*.svg`])
		.pipe(svg({
			removeTitle: true,
		}))
		.pipe(gulp.dest(`${dirs.dest}/assets/img/`));
});

gulp.task('fonts', () => {
	return gulp.src([`${dirs.src}/fonts/**/*`])
		.pipe(gulp.dest(`${dirs.dest}/assets/fonts/`));
});

// gulp.task('icons', ['minify-css_fonts'], () => {
// 	return gulp.src(`${dirs.src}/img/icons/*.svg`)
// 	.pipe(fontcustom({
// 		'config' : __dirname + "/icons.yml",
// 	}))
// 	.pipe(gulp.dest(`${dirs.dest}/assets/fonts/icons/`));
// });

// gulp.task('minify-css_fonts', () => {
// 	return gulp.src(`${dirs.dest}/assets/fonts/icons/*.css`)
// 		.pipe(postcss(processors))
// 		.pipe(gulp.dest(`${dirs.dest}/assets/fonts/icons`));
// });

gulp.task('views', () => {
	return gulp.src(`${dirs.src}/pug/*.+(pug)`)
	// .pipe(data(function(file) {
	// 	return require(`./${dirs.src}/pug/json/data.json`);
	// }))
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('${dirs.dest}'));
});


gulp.task('watch', () => {
	gulp.watch(`${dirs.src}/pug/**/*.+(html|pug|json)`, ['views', reload]);
	gulp.watch(`${dirs.src}/sass/**/*.scss`, ['styles', reload]);
	gulp.watch(`${dirs.src}/img/**/*.+(jpg|jpeg|svg|png)`, ['images']);
	gulp.watch(`${dirs.src}/js/**/*.+(js|es6)`, ['babel', reload]);
});

gulp.task('sync', () => {
	browserSync({
		server: {
			baseDir: "./"
		},
		notify: false,
		port: 9991
	});
});


/**
 * Register Tasks:
 */
gulp.task('default', ['styles', 'babel', 'views', 'images', 'sync', 'watch', 'fonts']);
gulp.task('production', ['styles', 'babel', 'views', 'images', 'fonts']);
