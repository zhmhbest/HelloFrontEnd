<link rel="stylesheet" href="https://zhmhbest.gitee.io/hellomathematics/style/index.css">
<script src="https://zhmhbest.gitee.io/hellomathematics/style/index.js"></script>

# [NodeJS](../index.html)

[TOC]

## Environment

下载[Binary NodeJs](https://nodejs.org/en/download/)

### 安装

```batch
REM 设置安装目录
SET NODE_LOCAL=D:\ProgramFiles\Programming\Nodejs
IF NOT EXIST "%NODE_LOCAL%" MKDIR "%NODE_LOCAL%"
REM 设置下载版本
SET NODE_VERSION=v14.17.3
SET NODE_ARCH=x64
SET NODE_NAME=node-%NODE_VERSION%-win-%NODE_ARCH%
SET NODE_URL=https://nodejs.org/dist/%NODE_VERSION%/%NODE_NAME%.zip
ECHO %NODE_NAME%

REM 下载
REM wget "%NODE_URL%" -O "%NODE_LOCAL%\%NODE_NAME%.zip"
aria2c -c -x 8 -j 4 -d "%NODE_LOCAL%" "%NODE_URL%"

REM 安装
unzip "%NODE_LOCAL%/%NODE_NAME%.zip" -d "%NODE_LOCAL%"
SET PATH=%NODE_LOCAL%/%NODE_NAME%;%PATH%

REM 删除历史配置
DEL /F /Q %Userprofile%\.npmrc
DEL /F /Q %Userprofile%\.yarnrc

REM 配置镜像
npm config set registry https://registry.npm.taobao.org/
npm config set NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node/
npm config set NVMW_NPM_MIRROR=http://npm.taobao.org/mirrors/npm/
npm config set ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
npm config set ELECTRON_BUILDER_BINARIES_MIRROR=http://npm.taobao.org/mirrors/electron-builder-binaries/
npm config set SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass/
npm config set PYTHON_MIRROR=http://npm.taobao.org/mirrors/python/
npm config ls

REM 安装Yarn
npm -g i yarn

REM 环境变量
SETX "NODE_HOME" "%NODE_LOCAL%\%NODE_NAME%"
```

手动添加`%NODE_HOME%`到`%PATH%`中

```batch
REM 配置缓存目录
IF NOT EXIST "%NODE_HOME%\cache\npm"  MKDIR "%NODE_HOME%\cache\npm"
IF NOT EXIST "%NODE_HOME%\cache\yarn" MKDIR "%NODE_HOME%\cache\yarn"
npm config set cache "%NODE_HOME%\cache\npm"
yarn config set cache-folder "%NODE_HOME%\cache\yarn"

REM 配置执行文件目录（不建议）
npm config set prefix "%NODE_HOME%"
yarn config set global-folder "%NODE_HOME%"
```

### node-gyp

>gyp是为Chromium项目创建的项目生成工具，可以从平台无关的配置生成平台相关的项目文件。

将依赖[Python](https://www.python.org/downloads/)和[MSVC](https://visualstudio.microsoft.com/zh-hans/downloads/)（选择**Visual Studio 生成工具**、**使用C++的桌面开发**、可选项仅包含**MSVC**、**CMake**、**Windows SDK**）

```batch
npm -g i node-gyp

node-gyp rebuild
```

### 关联启动

`.js`

```batch
REM 在管理员命令窗口中输入
REM C:\Windows\System32\CScript.exe "%1" %*
reg add "HKCR\JSFile\Shell\Open\Command" /f /ve /t REG_SZ /d "\"%NODE_HOME%\node.exe\" \"%1\" %*"
```

`.ts`

```batch
npm -g i @types/node typescript ts-node
REM 在管理员命令窗口中输入
reg add "HKCR\.ts" /f /ve /t REG_SZ /d "TSFile"
reg add "HKCR\TSFile\DefaultIcon" /f /ve /t REG_SZ /d "\"%NODE_HOME%\node.exe\""
reg add "HKCR\TSFile\Shell\Open\Command" /f /ve /t REG_SZ /d "\"%NODE_HOME%\node.exe\" \"%NODE_HOME%\node_modules\ts-node\dist\bin.js\" \"%1\" %*"
```

## Package

### npm

```bash
# npm init
npm init -f

# 包信息
npm info <package_name>

# 安装
npm i                   # 根据package.json自动安装
npm -D i <package_name> # 开发环境
npm -S i <package_name> # 运行环境
npm -g i <package_name> # 全局安装

# 卸载
npm un <package_name>
npm -D un <package_name>
npm -S un <package_name>
npm -g un <package_name>
```

### yarn

```bash
yarn init

# 根据package.json自动安装
yarn install

# 当前开发环境
yarn -D add <package_name>

# 当前运行依赖环境
yarn add <package_name>

# 卸载
yarn remove <package_name>

# 全局安装（不建议使用）
yarn global add <package_name>
```

## Module

### CommonJS

`exports`是`module.exports`的引用。

```js
/**
 * @file mod0.js
 */
exports.name = "CommonoJSModule0"
let count = 0;
exports.count = count;
exports.plus = function() {
    count++;
}
exports.say = function() {
    console.log(this.name, "Number is", this.count);
};
```

```js
/**
 * @file mod0.js
 */
let count = 0;
module.exports = {
    name: "CommonoJSModule1",
    count: count,
    plus: function() {
        count++;
    },
    say: function() {
        console.log(this.name, "Number is", this.count);
    }
};
```

```js
/**
 * @file index.js
 */
const mod0 = require("./mod0.js");
mod0.say();
mod0.plus();
mod0.say();
// CommonoJSModule0 Number is 0
// CommonoJSModule0 Number is 0

const mod1 = require("./mod1.js");
mod1.say();
mod1.plus();
mod1.say();
// CommonoJSModule1 Number is 0
// CommonoJSModule1 Number is 0
```

### ECMAScript6

```ts
/**
 * @file mod.ts
 */
export let name = "ECMAScript6Module";
export let count = 0;
export function plus() {
    count++;
}
export function say() {
    console.log(name, "Number is", count);
}
```

```ts
/**
 * @file index.ts
 */
import { plus, say } from "./mod";
say();
plus();
say();
// ECMAScript6Module Number is 0
// ECMAScript6Module Number is 1
```

## File

`EasyFile.js`

@import "EasyFile.js" {code_block=true}
