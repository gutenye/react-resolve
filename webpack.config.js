module.exports = {
  entry: "./src/index",

  output: {
    path: `${__dirname}/dist`,
    filename: "react-resolve.js",
    library: "ReactResolve",
    libraryTarget: "umd",
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: "babel", exclude: /node_modules/ },
    ]
  },

  devServer: {
    port: 3003,
    host: "0.0.0.0",
  },

  devtool: "cheap-module-eval-source-map",
}
