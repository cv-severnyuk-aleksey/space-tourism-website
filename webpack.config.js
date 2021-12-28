const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    script: './src/script.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            ['transform-react-jsx', { pragma: 'h' }]
          ]
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/i,
        use: ['file-loader', 'webp-loader?{quality: 90}'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              url: false,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      }
    ]
  },

  optimization: {
    minimize: true,
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].[chunkhash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/', to: 'assets/' },
        { from: 'src/data.json' },
        {
          from: "**/*.html",
          context: path.resolve(__dirname, "src"),
        },
      ],
    }),
  ],

  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    }
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    compress: true,
    open: true,
  }
}