## JS Doc

**变量类型标记**：

```js
/** @type {number} */
const PI = 3.1415926;
```

**联合体**：

```js
/**
 * @typedef {string|number} myType
 */
/** @type {myType} */
let x;
x = 123;
x = "abc";
```

**结构体**：

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

**枚举**：

```js
/**
 * 文件类型
 * @enum
 * @property {number} FileType.Image 图片
 * @property {number} FileType.Video 视频
 * @property {number} FileType.Audio 音频
 */
const FileType = {
    Image: 1,
    Video: 2,
    Audio: 3,
}
```

**回调函数**：

```js
/**
 * @callback CallbackName
 * @param {string} name
 * ...
 * @return {number}
 */
```

**函数注释**：

```js
/**
 * 说你好
 * @function
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
