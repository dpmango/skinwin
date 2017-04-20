# SKINWIN HTML/CSS LAYOUT
Based on gulp starter package to use with PostCss or sass, pug, autoprefixer, babel, compile bootstrap, minify assets and perform other common front-end tasks.

## DEMO
https://dpmango.github.io/skinwin/src

## Getting stated
__Development:__
- Install node.js and npm
- Run `npm i`
- Run `gulp` (default task)
- Work with `/src` folder and get the processing result in /dist

__Production__
- Run `gulp build` to build minified assets ready to use in production

## Tasks
- `postcss` - including sass like plugins, autoprefixer, SugarSS
- `sass` - compile .sass and .scss
- `bootstrap` - compile custom bootstrap 4 alpha 5 file
- `babel` - compile es2015 javascript code for older browsers
- `useref` - optimize .css and .js
- `cssnano` - minify css in dest folder
- `images` - imagemin for graphics optimization
- `fonts` - copy fonts to dist folder
- `browserSync` - serve assets with hot reload from `./src` folder
- `clean:dist` - clean dist folder to prevent conflicts before build


### Recent push command
gulp build && git add . && git commit -m "all pages show" && git push
