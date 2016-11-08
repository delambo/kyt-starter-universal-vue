const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const jsdom = require('jsdom').jsdom;

module.exports = {
  debug: false,

  modifyJestConfig(kytConfig) {
    const jestConfig = Object.assign({}, kytConfig);
    jestConfig.rootDir = path.join(__dirname, 'build');
    return jestConfig;
  },

  modifyWebpackConfig(config, options) {
    // Add stage-2 to kyt's .babelrc query.
    const babelLoader = config.module.loaders.find(loader => loader.loader === 'babel-loader');
    babelLoader.query.presets.push('babel-preset-stage-2');

    // Add vue's loader which will support local
    // concision for templates, scripts, and styles.
    // http://vue-loader.vuejs.org/en/index.html
    config.module.loaders.push({
      test: /\.vue$/,
      loader: 'vue-loader'
    });

    // Include kyt's .babelrc query.
    config.vue = {
      loaders: {
        js: 'babel-loader?' + JSON.stringify(babelLoader.query),
      },
    };

    if (options.type === 'server') {
      // To create a bundle renderer, vue needs a separate server bundle.
      config.entry.server = path.join(__dirname, 'src/server/server.js');
    }

    // In production, we need to extract the styles into
    // a css file so that we can import it in template.js.
    if (options.type === 'client' && options.environment === 'production') {
      config.vue.loaders.sass = ExtractTextPlugin.extract({
        loader: 'css!sass',
        fallbackLoader: 'vue-style-loader',
      });
      config.plugins.push(new ExtractTextPlugin('styles.css'))
    }

    return config;
  },
};
