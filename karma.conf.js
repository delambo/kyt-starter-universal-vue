const merge = require('webpack-merge');
const baseConfig = require('./node_modules/kyt/config/webpack.base.js');
const devClientConfig = require('./node_modules/kyt/config/webpack.dev.server.js');
const kytConfig = require('./kyt.config.js');
const path = require('path');

let options = {
  type: 'client',
  serverURL: '',
  clientURL: '',
  environment: 'test',
  publicPath: '/',
  publicDir: path.join(__dirname, 'src/public'),
  clientAssetsFile: 'publicAssets.json',
  reactHotLoader: false,
};

let webpackConfig = merge.smart(baseConfig(options), devClientConfig(options));

try {
  webpackConfig = kytConfig.modifyWebpackConfig(webpackConfig, options);
} catch (error) {
  console.error('Error in your kyt.config.js modifyWebpackConfig():', error);
  process.exit(1);
}

delete webpackConfig.entry;
delete webpackConfig.output;

console.log(JSON.stringify(webpackConfig, null, '  '));

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    //files: ['src/testEntry.js'],
    files: ['src/**/*.test.js'],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      'src/**/*.test.js': ['webpack']
    },
    webpack: webpackConfig,
    // avoid walls of useless text
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true
  })
}
