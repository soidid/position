require! <[ gulp gulp-util ]>
gutil = gulp-util

PORT = 3000

gulp.task 'ls' ->
  require! 'gulp-livescript'
  gulp.src 'web/*.ls'
    .pipe gulp-livescript!
    .pipe gulp.dest 'web'

gulp.task 'build' <[ls]> ->
  gulp.src 'web/**/*'
    .pipe gulp.dest 'public'

gulp.task 'dev' <[ ls ]>  ->
  require! <[ express path ]>
  app = express!

  app.use express.static path.resolve 'web'
  app.listen PORT, ->
    gutil.log "Server Listen on #{PORT}"

gulp.task 'default' <[ dev ]>