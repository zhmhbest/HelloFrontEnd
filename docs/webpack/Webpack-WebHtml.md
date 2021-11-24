# 创建网页

## 初始化项目

```bash
mkdir src src/assets
touch src/index.js src/index.ejs src/assets/.gitkeep
npm init -y

# Webpack
yarn -D add webpack@^4 webpack-cli@^3
yarn -D add webpack-dev-server@^3 html-webpack-plugin@^4
yarn -D add copy-webpack-plugin@^6

# Loaders
yarn -D add mini-css-extract-plugin@^1 css-loader@^5
yarn -D add json5-loader

# Common Library
yarn add axios
```

`index.ejs`

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <link rel="shortcut icon" href="" type="image/x-icon">
    <title></title>
    <% for (let item of cdnResources) {%>
        <% if(undefined !== item.js) %>
        <script src="<%- item.js %>"></script>
        <% if(undefined !== item.css) %>
        <link href="<%- item.css %>" rel="stylesheet">
    <% } %>
</head>

<body>
    <div id="app"></div>
</body>

</html>
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
        port: 9000,
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

## 调试项目

```bash
npx webpack-dev-server --inline --progress
```

## 打包项目

```bash
npx webpack
```
