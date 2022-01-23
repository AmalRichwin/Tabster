const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
    port: 3080,
  },

  devtool: 'cheap-module-source-map',
  plugins: [new ReactRefreshWebpackPlugin()],
}
