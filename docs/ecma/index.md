<link rel="stylesheet" href="https://zhmhbest.gitee.io/hellomathematics/style/index.css">
<script src="https://zhmhbest.gitee.io/hellomathematics/style/index.js"></script>

# [ECMAScript](../index.html)

[TOC]

>按语法版本：
>
>- ECMAScript 2015
>- ECMAScript 2016
>- ECMAScript 2017
>- ECMAScript ...
>- TypeScript
>
>按照运行环境划分：
>
>- WebJS
>- NodeJS

## 文档注释

### 定义变量

```js
/** @type {number} */
const PI = 3.1415926;
```

### 自定义类型

#### 定义联合体

```js
/**
 * @typedef {string|number} myType
 */
/** @type {myType} */
let x;
x = 123;
x = "abc";
```

#### 定义结构体

```js
/**
 * @typedef {{x: number, y:number, z?: number|undefined}} Position
 */
/**
 * @type {Position}
 */
let pos = {};
pos.x = 1366;
pos.y = 768;
console.log(pos);
```

#### 定义回调函数

```js
/**
 * @callback Callback
 * @param {string} name
 * ...
 * @return {number}
 */
```

### 注释函数

```js
/**
 * 说你好
 * @param {string} name
 * @param {string} [age]
 * @return {void}
 * @example sayHello("Peter");
 */
const sayHello = (name, age) => {
    age = age || 0;
    console.log(`${name} ${age}: Hello!`);
}
```
