require! <[ gulp gulp-util gulp-concat gulp-if gulp-jsmin ]>
gutil = gulp-util
production = true if gutil.env.env is \production

PORT = 3000

gulp.task 'ls' ->
  require! 'gulp-livescript'
  gulp.src 'web/*.ls'
    .pipe gulp-livescript!
    .pipe gulp.dest 'web'

gulp.task 'js:app' ->
  app = gulp.src [
    * 'web/js/app.js'
    * 'web/js/controllers.js'
    * 'web/js/jquery.tablesort.js'
    * 'web/js/services.js'
  ]
    .pipe gulp-concat 'app.js'
    .pipe gulp-if production, gulp-jsmin!
    .pipe gulp.dest 'public'

gulp.task 'assets' ->
  gulp.src 'web/**/*'
    .pipe gulp.dest 'public'

gulp.task 'build' <[ ls js:app assets ]> ->

gulp.task 'dev' <[ build ]>  ->
  require! <[ express path ]>
  app = express!

  app.use express.static path.resolve 'public'
  app.listen PORT, ->
    gutil.log "Server Listen on #{PORT}"

gulp.task 'default' <[ dev ]>
