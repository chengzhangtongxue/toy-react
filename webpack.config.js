const path = require('path');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
    },
    mode: 'development',
    optimization: {
        // 不压缩代码
        minimize: false,
    },
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        // compress: true,
        port: 8080,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-transform-react-jsx',{pragma: 'ToyReact.createElement'}],
                        ]
                    }
                }
            }
        ]
    }
}