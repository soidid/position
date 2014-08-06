require! <[ gulp gulp-util gulp-concat gulp-if gulp-uglify gulp-clean ]>
gutil = gulp-util
production = true if gutil.env.env is \production

PORT = 3000

gulp.task 'clean' ->
  gulp.src ['public/*' '!public/.*' '!public/CNAME']
    .pipe gulp-clean!

gulp.task 'ls' <[ clean ]> ->
  require! 'gulp-livescript'
  gulp.src 'web/*.ls'
    .pipe gulp-livescript!
    .pipe gulp.dest 'web'

gulp.task 'js:app' <[ clean ls ]> ->
  app = gulp.src [
    * 'web/js/app.js'
    * 'web/js/controllers.js'
    * 'web/js/jquery.tablesort.js'
    * 'web/js/services.js'
    * 'web/petition.js'
  ]
    .pipe gulp-concat 'app.js'
    .pipe gulp-if production, gulp-uglify!
    .pipe gulp.dest 'public'

gulp.task 'css' <[ clean ]> ->
  gulp.src 'web/css/**/*'
    .pipe gulp.dest 'public/css'

gulp.task 'data' <[ clean ]> ->
  gulp.src 'web/data/**/*'
    .pipe gulp.dest 'public/data'

gulp.task 'images' <[ clean ]> ->
  gulp.src 'web/images/**/*'
    .pipe gulp.dest 'public/images'

gulp.task 'assets' <[ clean css data images ]> ->
  gulp.src [
    * 'web/index.html'
  ]
    .pipe gulp.dest 'public'
  gulp.src 'web/partials/**/*'
    .pipe gulp.dest 'public/partials'
  gulp.src 'web/packaged/**/*'
    .pipe gulp.dest 'public/packaged'

gulp.task 'build' <[ clean ls js:app assets ]> ->

gulp.task 'dev' <[ build ]>  ->
  require! <[ express path ]>
  app = express!

  app.use express.static path.resolve 'public'
  app.listen PORT, ->
    gutil.log "Server Listen on #{PORT}"

gulp.task 'default' <[ dev ]>
