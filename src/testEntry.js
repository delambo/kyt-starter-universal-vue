
// require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context
var testsContext = require.context('.', true, /\.test.js$/);
console.log(testsContext)
testsContext.keys().forEach(testsContext);
