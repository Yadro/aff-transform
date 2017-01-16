var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: 'build/bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'ts-loader'},
    ]
  },
  devtool: 'source-map',

  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8000,
      server: { baseDir: ['./'] }
    })
  ]
};