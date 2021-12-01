
## Config

`webpack.config.js`

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // 发布 | 调式
    mode: ?, // 'production' | 'development'

    // 编译目标
    target: ?, // 'web' | 'node'

    // 入口文件
    entry: {
        index: './src/index.js'
    },

    // 打包输出文件
    output: {
        // 输出目录（必须使用绝对目录）
        path: path.resolve(root, 'dist'),
        // 输出文件名
        filename: 'static/js/[name]-[hash].js',

        // 库导出
        library: {
            type: 'var',
            name: 'libraryName',
            export: 'default',
        }
    },

    // CDN引入的资源
    // 此处引入的CDN资源将使用全局变量代替包引入，最终打包结果将不会包括相关包
    externals: {
        // localModuleName: globalModuleName
    },

    resolve: {
        // 可以作为脚本模块引入的扩展名
        extensions: ['.ts', '.js', '.vue'],
        // import路径替换
        alias: {
            '@components': '../components'
        }
    },

    // 调试运行相关（依赖于HtmlWebpackPlugin）
    devServer: {
        port: 9999,
        progress: true,
        contentBase: false, // 建议关闭，配置拷贝
        compress: true
    },

    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',  // 模板HTML文件路径
            filename: 'index.html',     // 打包后HTML文件名称
            templateParameters: {
                // 变量: 值
            },
            minify: {
                removeAttributeQuotes: true,    // 删除多余的双引号
                collapseWhitespace: true,       // 删除换行
                hash: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'static/style/[name]-[hash].css'
        }),
    ],

    // Loader
    module: {
        rules: [
            {
                test: /\.json5$/,
                loader: 'json5-loader'
            },

            {
                test: /\.(png|jpe?g|gif|icon?)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 8, // 小于8KB则返回base64字符串
                            name: 'static/images/[name]-[hash].[ext]'
                        }
                    }
                ]
            },

            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },

            {
                test: /\.(sass|scss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    // 优化
    // https://www.webpackjs.com/plugins/split-chunks-plugin/
    optimization: {
        splitChunks: {
            chunks: 'all', // 从何处抽取代码: initial | async | all
            // minSize: 30000,
            // maxSize: 0,
            // minChunks: 1, // 最低被引用次数
            // maxAsyncRequests: 5, // 最大的异步加载次数
            // maxInitialRequests: 3, // 最大的初始化加载次数
            // automaticNameDelimiter: '~', // 默认文件名分隔符
            // name: true, // 抽取后的js文件名，true表示根据cacheGroups自动生成
            cacheGroups: {
                Echarts: {
                    name: 'chunk-echarts',
                    test: /[\\/]node_modules[\\/]echarts[\\/]/,
                    priority: 120
                },
                Vue: {
                    name: 'chunk-vue',
                    test: /[\\/]node_modules[\\/](@?vuex?|vue-.*?)[\\/]/,
                    priority: 110
                },
                AntDesign: {
                    name: 'chunk-antd',
                    test: /[\\/]node_modules[\\/](@ant-design|ant-design-vue)[\\/]/,
                    priority: 100
                },
                Modules: {
                    name: 'chunk-modules',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 2
                },
                default: {
                    name: 'chunk-default',
                    minChunks: 2,
                    priority: 1,
                    reuseExistingChunk: true
                }
            }
        }
    }
};
```
