var gulp = require("gulp"),
    gulpLoadPlugins = require("gulp-load-plugins"),
    plugins = gulpLoadPlugins({ camelize: true }),
    colors = require("colors"),
    fs = require("fs"),
    runSeq = require('run-sequence'),
    Server = require('karma').Server,
    protractor = require('gulp-protractor').protractor,
    pkg = require("./package.json");

gulp.task('reload', function () {
    plugins.livereload.reload();
});
gulp.task('reloadCSS', function () {
    return gulp.src('build/styles/style.css').pipe(plugins.livereload());
});

gulp.task('styles', function() {
    return gulp.src(["styles/**/*.scss", "styles/**/_*.scss"])
      .pipe(plugins.sass({ outputStyle: 'expanded' }))
      .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  		.pipe(plugins.concat('style.css'))
      .pipe(gulp.dest('build/styles'))

	    .pipe(plugins.minifyCss())
      .pipe(plugins.header(fs.readFileSync("header.txt", "utf8"), {pkg: pkg}))
	    .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function() {
    return gulp.src(["app/app.js","app/**/*.js"])
    	.pipe(plugins.plumber())
    	//Lint
    	.pipe(plugins.jshint())
    	.pipe(plugins.jshint.reporter('default'))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat("main.js"))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest('build/scripts'))

      .pipe(plugins.uglify({ preserveComments: 'some' }))
      .pipe(plugins.header(fs.readFileSync("header.txt", "utf8"), {pkg: pkg}))
      .pipe(gulp.dest('dist/scripts'));
});


gulp.task("other-files", function() {
    return gulp.src([
        "src/**/*",
        "!src/styles/**/*.scss",
        "!src/app/**/*.js"
    ])
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest('dist'));
});

gulp.task("preview", function() {
    var server = plugins.liveServer("server.js", {env: {DIRECTORY: "dist"}});
    server.start();
});


gulp.task("preview", function() {
    var server = plugins.liveServer("server.js", {env: {DIRECTORY: "dist"}});
    server.start();
});

gulp.task('test', function(done) {
  new Server({
    configFile: __dirname +'/tests/karma.conf.js',
    singleRun: true
  }, done).start();

  gulp.src([__dirname + '/tests/e2e/**/*.js'])
    .pipe(protractor({
      configFile: __dirname + '/tests/protractor-conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function(e) { throw e });
});

gulp.task('build', function () {
    runSeq(['styles','scripts','other-files', 'test']);
});

gulp.task('default',function(){
    gulp.start('build');

    gulp.watch("styles/**/*.scss", function() {
        runSeq('styles', ['reloadCSS','reload']);
    });

    gulp.watch(["server.js", "app/**/*.js"], function() {
        runSeq('scripts', 'reload');
    });

    gulp.watch(["index.html", "app/**/*.html"], ['reload']);

    plugins.livereload.listen();
});
