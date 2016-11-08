const merge = require('webpack-merge');
const baseConfig = require('./node_modules/kyt/config/webpack.base.js');
let config = require('./node_modules/kyt/config/webpack.dev.client.js');
const shell = require('shelljs');
const webpack = require('webpack');
const kytConfig = require('./kyt.config.js');
const path = require('path');

shell.rm('-rf', path.join(__dirname, 'build'));
shell.mkdir(path.join(__dirname, 'build'));

let options = {
  type: 'client',
  serverURL: '',
  clientURL: '',
  environment: 'test',
};

config = merge.smart(baseConfig(options), config(options));
config = kytConfig.modifyWebpackConfig(config, options);
config.entry = { ['main.test']: path.join(__dirname, 'src/testEntry') };
config.output.path = path.join(__dirname, 'build');

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (stats.hasErrors()) console.error(`Test build failed\n`, stats.toString());

  // Now that
  shell.exec('NODE_ENV=test node_modules/.bin/kyt test');
});
