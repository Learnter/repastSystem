// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}

// module.exports = {
// 　　"plugins": {
// 　　　　"postcss-import": {},
// 　　　　"postcss-url": {},
// 　　　　"postcss-aspect-ratio-mini": {},
// 　　　　"postcss-write-svg": {
// 　　　　　　utf8: false
// 　　　　},
// 　　　　"postcss-cssnext": {},
// 　　　　"postcss-px-to-viewport": {
// 　　　　　　viewportWidth: 1920, // 视窗的宽度，一般为750px. 
// 　　　　　　viewportHeight: 1080, // 视窗的高度. 
// 　　　　　　unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）. 
// 　　　　　　viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw. 
// 　　　　　　selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换的类名，可以自定义，可以无限添加. 
// 　　　　　　minPixelValue: 1, // 小于或等于'1px'的转换. 
// 　　　　　　mediaQuery: false // 允许在媒体查询中转换'px'. 
// 　　　　},
// 　　　　"postcss-viewport-units": false,
// 　　　　"cssnano": {
// 　　　　　　preset: "advanced",
// 　　　　　　autoprefixer: false,
// 　　　　　　"postcss-zindex": false
// 　　　　}
// 　　 }
//   }
