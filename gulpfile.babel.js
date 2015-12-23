import rimraf from "rimraf";
import gulp from "gulp";
import eslint from "gulp-eslint";
import sourcemaps from "gulp-sourcemaps";
import babel from "gulp-babel";

gulp.task("clean", function (done) {
	rimraf("lib", done);
});

gulp.task("lint-js", function () {
	return gulp.src(["src/**/*.js", "test/**/*.js"])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task("build-copy-other", ["clean"], function () {
	return gulp.src(["src/**/*", "!src/**/*.js"])
		.pipe(gulp.dest("lib"));
});

gulp.task("build-js", ["lint-js", "clean"], function (done) {
	return gulp.src("src/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(babel()).on("error", done)
		.pipe(sourcemaps.write("maps"))
		.pipe(gulp.dest("lib"));
});

gulp.task("build", ["build-js", "build-copy-other"]);
