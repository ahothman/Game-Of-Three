var path = require('path')

module.exports = {
    entry: './client/App.jsx',
    output:{
        filename:'index.js',
        path:path.join(__dirname,'build','scripts')
    },
    devtool: "source-map",
    optimization: {
      minimize: false
   },
    module:{
        rules:[
            {
                test:/\.jsx?/,
                use:"babel-loader"
            },
            {
                test: /\.scss$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                         loader: 'css-loader'
                    },
                    {
                         loader: 'sass-loader'
                    }
                ]
             }
        ]
    }
}