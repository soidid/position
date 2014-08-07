99119 搶救消防員
==============

架構
==============
backend: firebase
/issues/:issue-id/petitioners/:fbid

frontend: angular (連署部分使用react)
web
|__ css
|   |___ style.css      (網站樣式)
|
|__ js
|   |___ app.js         (ng-app)
|   |___ controllers.js
|   |___ service.js
|
|__ data
|   |___ group.json
|   |___ ly-info.json
|   |___ ly-position.json
|
|__ partials            (html)
|
|__ petition.ls         (React Component)

開發
==============
需要先安裝nodejs

1. `$ npm install`
2. `$ ./node_modules/.bin/gulp`

部署
==============
部署到github-pages上

1. `$ ./deploy`