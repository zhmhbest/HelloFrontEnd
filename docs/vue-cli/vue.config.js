// https://cli.vuejs.org/config/#pages
// du -h --max-depth=1 ./dist


/**
 * 获取CDN资源地址
 * @param {string} lib
 * @param {string} ver
 * @param {string} [file]
 * @return {string}
 */
 const cdnUrl = (lib, ver, file) => {
    // 【bootcdn】 https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js
    // const cdnPath = 'https://cdn.bootcdn.net/ajax/libs';
    // file = file || `${lib}.min.js`;
    // return `${cdnPath}/${lib}/${ver}/${file}`;

    // 【jsdelivr】 https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js
    const cdnPath = 'https://cdn.jsdelivr.net/npm';
    file = file || `dist/${lib}.min.js`;
    return `${cdnPath}/${lib}@${ver}/${file}`;
};


/**
 * CDN资源表
 */
const cdnResources = [
    {
        moduleName: 'axios',
        globalName: 'axios',
        js: [cdnUrl('axios', '0.21.1')]
    },
    {
        moduleName: 'vue',
        globalName: 'Vue',
        js: [cdnUrl('vue', '2.6.11')]
    },
    {
        moduleName: 'vuex',
        globalName: 'Vuex',
        js: [cdnUrl('vuex', '3.5.1')]
    },
    {
        moduleName: 'vue-router',
        globalName: 'VueRouter',
        js: [cdnUrl('vue-router', '3.2.0')]
    },
    {
        moduleName: 'moment',
        globalName: 'moment',
        js: [
            cdnUrl('moment', '2.21.0', 'moment.min.js'),
            cdnUrl('moment', '2.21.0', 'locale/zh-cn.js')
        ],
    },
    {
        moduleName: 'ant-design-vue',
        globalName: 'antd',
        js: [cdnUrl('ant-design-vue', '1.7.6', 'dist/antd.min.js')],
        css: [cdnUrl('ant-design-vue', '1.7.6', 'dist/antd.min.css')]
    },
];


/**
 * CDN资源替换表
 */
const cdnExternals = (() => {
    let obj = {/* moduleName: globalName */ };
    for (let res of cdnResources) {
        obj[res.moduleName] = res.globalName;
    }
    return obj;
})();
console.log(cdnResources);
console.log(cdnExternals);


/**
 * exports
 */
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