const fs = require("fs");
const path = require("path");

/**
 * 定义回调方法
 * @callback ReadDirectoryCallback
 * @param {String} name
 * @param {fs.Stats} stat
 * @return {void}
 */
/**
 * 枚举目录下所有文件和文件夹
 * @param {String} location
 * @param {ReadDirectoryCallback} callback
 * @return {Boolean} 是否可枚举
 * @example
    enumDirectory("C:/Windows/System32/Boot", (name, stat) => {
        if (stat.isFile()) {
            console.log("f", name, stat.size);
        } else if (stat.isDirectory()) {
            console.log("d", name, stat.size);
        } else {
            console.log("o", name, stat.size);
        }
    });
 */
const enumDirectory = (location, callback) => {
    try {
        const stat = fs.statSync(location);
        if (!stat.isDirectory()) return false;
        callback(location.replace(/\\/g, '/'), stat);
    } catch (err) {
        return false
    }
    const recursion = (loc) => {
        const files = fs.readdirSync(loc);
        for (let file of files) {
            const name = path.join(loc, file);
            const stat = fs.statSync(name);
            callback(name.replace(/\\/g, '/'), stat);
            if (stat.isDirectory()) {
                recursion(name);
            }
        }
    };
    recursion(location);
    return true;
};


/**
 * 保存为Text文件
 * @param {String} location
 * @param {String} text
 * @return {void}
 */
const writeText = (location, text) => {
    const fd = fs.openSync(location, 'w');
    fs.writeSync(fd, text);
    fs.closeSync(fd);
}


/**
 * 保存为JSON文件
 * @param {String} location
 * @param {Object} data
 * @param {String} [space]
 * @return {void}
 */
const writeJSON = (location, data, space) => {
    writeText(location, `${JSON.stringify(data, undefined, space)}`);
};


/**
 * EF BB BF
 * @type {Buffer}
 */
const UTF_8_SIG = Buffer.from("\uFEFF");


/**
 * 读取Text文件
 * @param {String} location
 * @return {String}
 */
const readText = (location) => {
    /** @type {Buffer} */
    let buff = fs.readFileSync(location, { flag: 'r' });
    if (UTF_8_SIG.equals(buff.slice(0, 3))) {
        buff = buff.slice(3);
        return buff.toString('utf-8');
    }
    return buff.toString();
};


/**
 * 格式化文件大小
 * @param {Number} size 多少个Byte
 * @return {String}
 */
const formatFileSize = (size) => {
    const UNIT = ["B", "K", "M", "G", "T", "P"];
    const UNIT_SIZE = UNIT.length;
    const UNIT_STEP = 1024;
    let unitIndex = 0;
    while (size >= UNIT_STEP && unitIndex < UNIT_SIZE - 1) {
        unitIndex++;
        size /= UNIT_STEP;
    }
    return `${size.toFixed(2)}${UNIT[unitIndex]}`;
};


/**
 * 文件扩展名
 * @param {String} location
 * @return {String}
 */
const extensionPureName = (location) => {
    return path.extname(location).toLowerCase().substr(1);
};


/**
 * 移动文件
 * @param {String} orgName
 * @param {String} newName
 * @param {Boolean} [isDel] default is true
 * @return {void}
 */
const moveFile = (orgName, newName, isDel) => {
    fs.createReadStream(orgName)
        .pipe(fs.createWriteStream(newName));
    if (undefined === isDel || isDel) {
        fs.unlinkSync(orgName);
    }
};


/**
 * 编码Base64
 * @param {String} data
 * @param {String} [encoding]
 * @return {String}
 */
const encodeBase64 = (data, encoding) => {
    return Buffer.from(data, (encoding || 'utf-8')).toString('base64');
};


/**
 * 解码Base64
 * @param {String} data
 * @param {String} [encoding]
 * @return {String}
 */
 const decodeBase64 = (data, encoding) => {
    return Buffer.from(data, 'base64').toString(encoding || 'utf-8');
};


module.exports = {
    pathResolve: path.resolve,
    pathJoin: path.join,
    //
    encodeBase64,
    decodeBase64,
    //
    enumDirectory,
    writeText,
    writeJSON,
    readText,
    formatFileSize,
    extensionPureName,
    moveFile
}