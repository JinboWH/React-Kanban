module.exports = {
  entry:  __dirname + "/app/App.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname,//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },

 module: {
     loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015','react']
        }
      }
    ]
 },

 devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  }
  
}
