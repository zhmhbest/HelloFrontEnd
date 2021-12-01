
## Vue

```txt.
├── dist
├── node_modules
├── src
│   ├── app.vue
│   ├── index.ejs
│   └── index.js
├── webpack.config.js
├── package.json
└── yarn.lock
```

`package.json`

```json
"scripts": {
    "build": "webpack",
    "serve": "webpack-dev-server --inline --progress"
},
"devDependencies": {
    "webpack": "^4.46.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.2",
    "html-webpack-plugin": "^4.5.2",

    "css-loader": "^5.2.7",
    "style-loader": "^2.0.0",

    "vue-loader": "^15.9.7",
    "vue-template-compiler": "^2.6.14"
},
"dependencies": {
    "vue": "^2.6.14"
}
```

`webpack.config.js`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    devServer: {
        host: '0.0.0.0',
        port: 5000
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            templateParameters: {},
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.vue$/i,
                loader: 'vue-loader'
            }
        ]
    },
};
```

`index.ejs`

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
</head>
<body><div id="app"></div></body>
</html>
```

`index.js`

```js
const Vue = require('vue').default;
const App = require('./app.vue').default;

new Vue({
    render: h => h(App)
}).$mount("#app");
```

`app.vue`

```html
<template>
    <div class="demo">{{ msg }}</div>
</template>

<script>
export default {
    data() {
        return {
            msg: "Hello world!",
        };
    },
};
</script>

<style scoped>
.demo {
    color: red;
}
</style>
```
