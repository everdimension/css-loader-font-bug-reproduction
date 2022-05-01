const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const fromRoot = (str) => path.join(__dirname, str);

module.exports = {
  mode: "development",
  watchOptions: {
    ignored: /node_modules/,
  },

  entry: {
    app: fromRoot("./src/index.js"),
  },
  output: {
    path: fromRoot("./dist"),
    filename: "[name].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.module\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[hash:base64:5]",
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.png$|\.jpg$|\.jpeg$|\.gif$|\.otf$|\.ttf$|\.woff$|\.eot$|\.woff2$/,
        use: ["url-loader?limit=8192&name=[path][name].[hash].[ext]"],
        exclude: /file-loader(\.png$|\.jpg$|\.jpeg$|\.gif)$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: fromRoot("./src/index.html"),
    }),
  ],
};
