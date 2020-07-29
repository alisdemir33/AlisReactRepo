var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
<<<<<<< HEAD
=======
    devtool: 'source-map',
>>>>>>> f4ade43ded49289c3463f654208bd7c9df04deb7
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
<<<<<<< HEAD
            apiUrl: 'http://localhost:4000'
        })
    }
=======
            apiUrl: 'http://localhost:44384'
        })
    }
    
>>>>>>> f4ade43ded49289c3463f654208bd7c9df04deb7
}