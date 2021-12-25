const BootCDN = 'https://cdn.bootcdn.net/ajax/libs';
const cdnResources = [
    {
        moduleName: 'axios',
        globalName: 'axios',
        js: [`${BootCDN}/axios/0.21.1/axios.min.js`]
    },
    {
        moduleName: 'vue',
        globalName: 'Vue',
        js: [`${BootCDN}/vue/2.6.11/vue.min.js`]
    },
    {
        moduleName: 'vuex',
        globalName: 'Vuex',
        js: [`${BootCDN}/vuex/3.5.1/vuex.min.js`]
    },
    {
        moduleName: 'vue-router',
        globalName: 'VueRouter',
        js: [`${BootCDN}/vue-router/3.2.0/vue-router.min.js`]
    }
];
const cdnExternals = (function (rs) {
    for (let r of rs) { this[r.moduleName] = r.globalName; } return this;
}).call({}, cdnResources);
console.log(cdnExternals);


module.exports = {
    // publicPath: '/',
    configureWebpack: {
        externals: cdnExternals,
    },
    pages: {
        index: {
            entry: "src/main.js",
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
            title: "网站标题",
            cdnResources: cdnResources
        }
    }
}