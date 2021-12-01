## Web

```txt
├── dist
├── node_modules
├── src
│   ├── assets
│   ├── index.ejs
│   └── index.js
├── webpack.config.js
├── package.json
└── yarn.lock
```

`packages.json`

```json
"scripts": {
    "build": "webpack",
    "serve": "webpack-dev-server --inline --progress"
},
"devDependencies": {
    "webpack": "^4.46.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.3",
    "html-webpack-plugin": "^4.5.2",
    "copy-webpack-plugin": "^6.4.1",
    "mini-css-extract-plugin": "^1.6.2",
    "css-loader": "^5.2.7",
    "json5-loader": "^4.0.1"
},
"dependencies": {
    "axios": "^0.24.0"
}
```

`webpack.config.js`

```js
const path = require('path');
const root = path.resolve(__dirname);
const sourcePath = path.resolve(root, 'src');
const outputPath = path.resolve(root, 'dist');
const cdnResources = [
    // {
    //     moduleName: 'ant-design-vue',
    //     globalName: 'antd',
    //     js: 'https://cdn.bootcss.com/ant-design-vue/1.7.2/antd.min.js',
    //     css: 'https://cdn.bootcss.com/ant-design-vue/1.7.2/antd.min.css'
    // },
    {
        moduleName: 'axios',
        globalName: 'axios',
        js: 'https://cdn.bootcss.com/axios/0.21.0/axios.min.js'
    },
];
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // mode: 'production', // production | development
    entry: {
        index: path.join(sourcePath, "index.js")
    },
    output: {
        path: outputPath,
        filename: 'static/js/[name]-[hash].js'
    },
    devServer: {
        host: '0.0.0.0',
        port: 5000,
        progress: true,
        contentBase: false,
        compress: true
    },
    externals: (() => {
        let obj = {/* moduleName: globalName */ };
        for (let res of cdnResources) {
            obj[res.moduleName] = res.globalName;
        }
        return obj;
    })(),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(sourcePath, "index.ejs"),
            filename: 'index.html',
            templateParameters: { cdnResources },
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                hash: true
            }
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/assets',
                to: '.',
                globOptions: {
                    ignore: ["**/*.md"]
                }
            },]
        }),
        new MiniCssExtractPlugin({
            filename: 'static/style/[name]-[hash].css'
        }),
    ],
    module: {
        rules: [{
            test: /\.json5$/i,
            loader: 'json5-loader'
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }
        ]
    }
};
```

`index.ejs`

@import "index.ejs"

`index.js`

```js
document.querySelector('#app').innerText = "Hello";
```
