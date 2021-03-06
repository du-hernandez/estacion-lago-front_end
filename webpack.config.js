module.exports = {
  entry : "./src/main.jsx",
  output : {
    filename : "/public/build/bundle.js"
  },
  module : {
    loaders : [
      {
        test : /\.jsx?$/,
        loader : 'babel-loader',
        exclude : /(node_modules|bower_components)/,
        query : {
          presets : ['react', 'es2015']
        }
      }
    ]
  }
}
