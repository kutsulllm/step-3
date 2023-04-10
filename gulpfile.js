import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import imagemin from "gulp-imagemin";
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-minify";
import BS from 'browser-sync';
const browserSync = BS.create();
import dartSass from 'sass';
const sass = gulpSass(dartSass);

const cleanDist = () => gulp.src(['dist/js/', 'dist/css/'], {allowEmpty: true, read: false}).pipe(clean());

const purgeDist = () => gulp.src('dist/**/*', {allowEmpty: true, read: false}).pipe(clean());

const buildCss = () => gulp.src('src/scss/**/*', {allowEmpty: true})
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({cascade: false}))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(concat('styles.min.css'))
  .pipe(gulp.dest('dist/css'));

const buildJs = () => gulp.src('src/js/**/*', {allowEmpty: true})
  .pipe(concat('scripts.js'))
  .pipe(minify())
  .pipe(gulp.dest('dist/js')).on('end', () => gulp.src('dist/js/scripts.js', {allowEmpty: true}).pipe(clean()));

const buildImg = () => gulp.src('src/img/**/*', {allowEmpty: true})
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'));

const purgePages = () => gulp.src('public/**/*', {allowEmpty: true, read: false}).pipe(clean());

const buildPages = () => gulp.src('dist/**/*')
  .pipe(gulp.dest('public/dist'))
  .on('end', () => gulp.src('index.html').pipe(gulp.dest('public')));

const dev = () => {
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });
  gulp.watch(['src/**/*', 'index.html']).on('change', gulp.series('clean', 'buildCss', 'buildJs', browserSync.reload));
}

gulp.task('clean', cleanDist);
gulp.task('purge', purgeDist);
gulp.task('buildCss', buildCss);
gulp.task('buildJs', buildJs);
gulp.task('buildImg', buildImg);
gulp.task('purgePages', purgePages);
gulp.task('buildPages', buildPages);

gulp.task('dev', dev);
gulp.task('build', gulp.series('purge', 'buildCss', 'buildJs', 'buildImg'));