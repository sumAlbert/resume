var gulp=require("gulp");
var less=require("gulp-less");
var plumber=require("gulp-plumber");
var notify=require("gulp-notify");

gulp.task("less-compile",function () {
   gulp.src("./web/less/*.less")
       .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
       .pipe(less())
       .pipe(gulp.dest("./web/css/"))
});

gulp.task("less-watch",function () {
   gulp.watch("./web/less/*.less",["less-compile"])
});

gulp.task("default",['less-compile']);




















// var gulp=require("gulp");
// var less=require("gulp-less");
// var plumber=require("gulp-plumber");
// var notify=require("gulp-notify");
//
//
// gulp.task("less-compile",function () {
//     gulp.src("web/less/*.less")
//         .pipe(plumber({errorHandler:notify.onError('Error: <%= error.message %>')}))
//         .pipe(less())
//         .pipe(gulp.dest("web/css/"))
// });
//
// gulp.task("less-watch",function () {
//     gulp.watch("web/less/*.less",['less-compile']);
// });
//
// gulp.task("default",["less-watch"]);