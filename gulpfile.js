var pkg = require('./package.json')
    , fs = require('fs')
    , gulp = require('gulp')
    , header = require('gulp-header')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , rename = require('gulp-rename')
    , minifyCss = require('gulp-minify-css')
    , inject = require('gulp-inject-string')
    , sourcemaps = require('gulp-sourcemaps')
    , babelify = require('babelify')
    , exorcist = require('exorcist')
    , browserify = require('browserify')
    , buffer = require('vinyl-buffer')
    , source = require('vinyl-source-stream');

// ------------------------------------------

var buildDate = JSON.stringify(new Date());

var jsfileHeader = ['/*!',
    ' * Brick SpreadSheet',
    ' * <%= pkg.description %>',
    ' * ',
    ' * @version v<%= pkg.version %>',
    ' * @author <%= pkg.author %>',
    ' * @license <%= pkg.license %>',
    ' * ',
    ' * Build on: <%= date %>',
    ' *   -   handsontable version: <%= pkg.vendors.handsontable %>',
    ' *   -      formulajs version: <%= pkg.dependencies.formulajs %>',
    ' *   -         moment version: <%= pkg.vendors.moment %>',
    ' *   -         numbro version: <%= pkg.vendors.numbro %>',
    ' *   -        pikaday version: <%= pkg.vendors.pikaday %>',
    ' *   -  zeroclipboard version: <%= pkg.vendors.zeroclipboard %>',
    ' * ',
    ' * See also https://github.com/ssbunny/handsontable',
    ' */',
    ''].join('\n');

var uglifyMangle = [
    'require', 'exports', 'module', 'import', 'from',
    'export', 'default'
];

var libsPath = '/Users/ssbunny/Code/web/handsontable-lnsoft/dist';


// ------------------------------------------

gulp.task('scripts-libs', function () {
    gulp.src(
        [
            libsPath + '/moment/moment.js',
            libsPath + '/moment/locale/zh-cn.js',
            libsPath + '/pikaday/pikaday.js',
            libsPath + '/numbro/numbro.js',
            libsPath + '/numbro/languages/zh-CN.min.js',
            libsPath + '/zeroclipboard/ZeroClipboard.js',
            libsPath + '/handsontable.js'
        ])
        .pipe(concat(`spreadsheet-libs-${pkg.version}.js`))
        .pipe(uglify({
            mangle: {except: uglifyMangle}
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts-core', function () {
    browserify({
        entries: 'src/browser.js',
        debug: false
    }).transform(babelify, {presets: ['es2015']})
        .bundle()
        .pipe(source(`spreadsheet-${pkg.version}.js`))
        .pipe(buffer())
        .pipe(uglify({
            mangle: {except: uglifyMangle}
        }))
        .pipe(inject.replace('@@_version_@@', pkg.version))
        .pipe(header(jsfileHeader, {pkg: pkg, date: buildDate}))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts-core-debug', function () {
    browserify({
        entries: 'src/browser.js',
        debug: true
    }).transform(babelify, {presets: ['es2015']})
        .bundle()
        .pipe(source(`spreadsheet-${pkg.version}-debug.js`))
        .pipe(gulp.dest('dist'));
    /*
     .pipe(exorcist(`dist/spreadsheet-${pkg.version}-debug.js.map`))
     .pipe(fs.createWriteStream(`dist/spreadsheet-${pkg.version}-debug.js`, 'utf8'));
     */
});

gulp.task('styles', function () {
    gulp.src(
        [
            libsPath + '/handsontable.full.css',
            'src/css/common.css',
            'src/css/tabs.css'
        ])
        .pipe(concat(`spreadsheet-${pkg.version}.css`))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
});


gulp.task('scripts', ['scripts-libs', 'scripts-core', 'scripts-core-debug']);
gulp.task('scripts-nolibs', ['scripts-core', 'scripts-core-debug']);
gulp.task('default', ['styles', 'scripts']);