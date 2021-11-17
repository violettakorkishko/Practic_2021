var path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
console.log('dirname',path.resolve(__dirname, 'src'))
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './main.js',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
    devServer: {
        static: path.join(__dirname, 'src'),
        compress: true,
        port: 8000
    },
    watch: true,
};

