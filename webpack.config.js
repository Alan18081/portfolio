const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATH = {
    src : G.path.join(__dirname,"src/js/"),
    dist: G.path.join(__dirname,"public/static")
};

const VENDOR_LIBS = ['jquery','svg4everybody','jquery.scrollbar',
  'jquery.nicescroll','validetta'];

module.exports = {
    entry : {
      main: PATH.src + "index.js",
      vendor: VENDOR_LIBS
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                loader : "babel-loader",
                exclude : /node_modules/,
                query : {
                    presets : ["es2015"]
                }
            },
            {
                test : /\.css$/,
                use: ExtractTextPlugin.extract('css-loader')
            }
        ]
    },
    output : {
        path : PATH.dist,
        filename : "js/[name].js"
    },
    plugins : [
        new ExtractTextPlugin('vendor.css'),
        new G.webpack.optimize.UglifyJsPlugin(),
        new G.webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
        })
    ]
};