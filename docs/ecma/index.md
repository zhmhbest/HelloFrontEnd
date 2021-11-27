<link rel="stylesheet" href="https://zhmhbest.gitee.io/hellomathematics/style/index.css">
<script src="https://zhmhbest.gitee.io/hellomathematics/style/index.js"></script>

# [ECMAScript](../index.html)

[TOC]

>**按语法版本**：ES5、ES6、ES+、TS
>**按运行环境**：WebJS、NodeJS

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

**回调函数**：

```js
/**
 * @callback Callback
 * @param {string} name
 * ...
 * @return {number}
 */
```

**函数注释**：

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

## ES5

### 数据类型

`string`、`number`、`boolean`、`function`、`object`、`undefined`

### 动态参数

```js
function f() {
    console.log(typeof arguments, arguments.length, arguments);
}
f(1);
f(1, 2);
f(1, 2, 3);
```

### this

`call`、`apply`可指定上下文

```js
// this指代函数所属对象
let objA = {
    name: "A",
    say: function(s) { console.log(this.name, s) }
};
objA.say("Hi!");

let objB = Object();
objB.name = "B";
objB.say = function(s) { console.log(this.name, s) };
objB.say("Hi!");

// call、apply
function printThisName(s) {
    console.log(this.name, s);
}
printThisName.call(objA, 'call');
printThisName.apply(objB, ['apply']);

// lambda无法传递this
(function () {
    console.log(this.name)
}).call({name: 'function'});
(() => {
    console.log(this.name)
}).call({name: 'lambda'});
```

### 工厂模式

```js
// 拼接对象1
function newFactory1(name) {
    return {
        name: name,
        sayName: function () {
            console.log(this.name);
        }
    }
}
newFactory1('张3').sayName();
newFactory1('李4').sayName();

// 拼接对象2
function newFactory2(name) {
    var obj = {}; // Object()
    obj.name = name;
    obj.sayName = function () {
        console.log(this.name);
    };
    return obj
}
newFactory2('王5', 1).sayName();
newFactory2('赵6', 1).sayName();

// this构建1
function Factory1(name) {
    this.name = name;
    this.sayName = function () {
        console.log(this.name);
    };
    return this
}
var objF1_1 = new Factory1('钱7');
var objF1_2 = new Factory1('宋8');
console.log(objF1_1.sayName === objF1_2.sayName);

// this构建2
var Factory2 = (function () {
    function sayName() {
        console.log(this.name);
    }
    return function(name) {
        this.name = name;
        this.sayName = sayName;
        return this
    }
})();
var objF2_1 = new Factory2('钱9');
var objF2_2 = new Factory2('宋A');
console.log(objF2_1.sayName === objF2_2.sayName);
```

### 原型链

|             | 获取                         | 说明                    |
| ----------: | ---------- | ---------- |
| `__proto__`<br>`[[Prototype]]` | `obj.__proto__`<br>`Object.getPrototypeOf(obj)` | 隐式原型<br>对象持有 |
| `prototype` | `Fn.prototype`<br>`obj.prototype` | 显式原型<br>函数持有 |
| `constructor` | `obj.constructor` | 对象持有 |

```js
// 在创建函数时，以下内容为自动赋值
Fn.constructor = Function;
Fn.__proto__ = Function.prototype;
Fn.prototype.constructor = Fn;

// 在使用函数创建对象时
f.constructor = Fn;
f.__proto__ = Fn.prototype;
f.prototype = undefined;
```

```js
function Fn(name) {
    this.name = name;
    this.sayName = function() { console.log(`My name is '${this.name}'`); }
}
Fn.prototype.sayHello = function () { console.log(this.name, "Hello"); };

var f = new Fn("Peter");
f.sayName();
f.sayHello();
console.log(f.hasOwnProperty('sayName'));   // true
console.log(f.hasOwnProperty('sayHello'));  // false
```

### Array

```js
// 扩充
console.log(['a', 'b', 'c'].concat([1, 2, 3]));

// 切片
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("Left    ", nums.slice(0, 3));
console.log("Right   ", nums.slice(-3));
console.log("DelLeft ", nums.slice(5));
console.log("DelRight", nums.slice(0, -5));
console.log("Mid[startL, endL)", nums.slice(2, 5));
console.log("Mid[startL, endR]", nums.slice(5, -2));
console.log("Mid[startR, endR]", nums.slice(-4, -2));
```

```js
const A = ['a', 'b'];

// forEach
A.forEach((item, i) => {
    console.log("each", i, item);
});

// Map
console.log("map", A.map((item, i) => {
    return i + 1; // 决定元素是什么
}));

// Filter
console.log("filter", A.filter((item, i) => {
    return true; // 决定是否有此元素
}));

// Every
console.log("every", A.every((item, i) => {
    return true; // 每一项都是true结果为true
}));

// Some
console.log("some", A.some((item, i) => {
    return true; // 有一项是true结果为true
}));

// 遍历索引值
for (let i of A.keys()) {
    console.log("keys", i);
}

// 遍历元素值
for (let e of A.values()) {
    console.log("values", e);
}

// 遍历 索引值 元素值
for (let [i, e] of A.entries()) {
    console.log("entries", i, e);
}

// 用于从左累加元素
A.reduce((pre, cur, idx) => {
    console.log("reduce", pre, cur, idx);
});

// 用于从右累加元素
A.reduceRight((pre, cur, idx) => {
    console.log("reduceRight", pre, cur, idx);
});

// 返回true即停止循环
console.log("find", A.find(function (item, index) {
    return true;
}));
```

```js
// 并、交、差
Array.prototype.union = function (a) {
    return this.concat(a.filter(v => -1 === this.indexOf(v)))
};
Array.prototype.intersection = function (a) {
    return this.filter(v => a.indexOf(v) > -1)
};
Array.prototype.difference = function (a) {
    return this.filter(v => -1 === a.indexOf(v))
};
const set1 = [1, 2, 3];
const set2 = [3, 2, 5];
const union1 = set1.union(set2);
const union2 = set2.union(set1);
console.log("set1 ∪ set2 =", union1);
console.log("set2 ∪ set1 =", union2);
const intersection1 = set1.intersection(set2);
const intersection2 = set2.intersection(set1);
console.log("set1 ∩ set2 =", intersection1);
console.log("set2 ∩ set1 =", intersection2);
const difference1 = set1.difference(set2);
const difference2 = set2.difference(set1);
console.log( set1, "-", intersection1, "=", difference1);
console.log( set2, "-", intersection2, "=", difference2);
```

### Date

```js
/**
 * 日期格式化
 * @param {string} fmt
 * @returns {string}
 */
Date.prototype.format = function (fmt) {
    fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
    var o = {
        "M+": this.getMonth() + 1,                      // 月
        "d+": this.getDate(),                           // 日
        "h+": this.getHours(),                          // 时
        "m+": this.getMinutes(),                        // 分
        "s+": this.getSeconds(),                        // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3),    // 季
        "S": this.getMilliseconds()                     // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, this.getFullYear().toString().substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
```

```js
/**
 * 计算活了多少天
 * @param {Date|string} birth
 */
 function getLivedDays(birth) {
    birth = birth instanceof Date ? birth : new Date(birth);
    return Math.trunc((new Date() - birth) / (1000 * 60 * 60 * 24)) + 1;
}
console.log(getLivedDays('2020-10-1'));
```

## ES6

### 变量定义

```js
// none：变量被定义为全局变量
(() => {
    global = "Global Variable";
})();
console.log(global);

// var：变量作用域仅以函数划分
(() => {
    console.log("可以提前访问", varVariable);
    var varVariable = "Var Variable";
    console.log("可以之后访问", varVariable);
    var varVariable = "Var Variable Redefined";
    console.log("可以重复定义", varVariable);
})();
try { varVariable } catch (e) { console.log("函数外不可以访问", e.message) }

// let：有明显的作用域
(() => {
    try { letVariable } catch (e) { console.log("不可以提前访问", e.message) }
    let letVariable = "Let Variable";
    console.log("可以之后访问", letVariable);
    {
        let letVariable = "Another Let Variable";
        console.log("存在块级作用域", letVariable);
    }
    console.log("可以之后访问", letVariable);
})();
try { letVariable } catch (e) { console.log("函数外不可以访问", e.message) }


// const：不可变变量
// 略
```

### 字符串

```js
// Multiline
console.log(`Hey,
can you stop angry now?`);

// Format
console.log(`My Name is ${(() => { return "Oliver" })()}, I will be ${12 + 1} years old next year.`);
```

### 解构

```js
/*
 * Array Deconstruction
 */
{
    const A = [1, 2, 3];
    const S = "Hi";
    {// 解构
        let [a, b, c] = A;
        console.log({a, b, c})
    }
    {// 忽略
        let [a, , c] = A;
        console.log({a, c});
    }
    {// 剩余
        let [a, ...s] = A;
        console.log({a, s});
    }
    {// 字符串
        let [a, b] = S;
        console.log({a, b});
    }
    {// 不存在
        let [a, b, c] = S;
        console.log({a, b, c});
    }
    {// 默认值
        let [a, b, c = '#'] = S;
        console.log({a, b, c});
    }
}

/*
 * Object Deconstruction
 */
{
    const O = {A: 'aaa', B: 'bbb', C: 'ccc'};
    {// 解构
        let {A, B, C} = O;
        console.log({A, B, C});
    }
    {// 解构
        let {A: a, B: b, C: c} = O;
        console.log({a, b, c});
    }
    {// 部分
        let {A, C} = O;
        console.log({A, C});
    }
    {// 剩余
        let {A, ...others} = O;
        console.log({A, others});
    }
    {// 不存在
        let {A, B, D} = O;
        console.log({A, B, D});
    }
    {// 默认
        let {A, B, D = '###'} = O;
        console.log({A, B, D});
    }
}
```

### 面向对象

```js
class Animal {
    // 静态方法
    static sum(num1, num2) {
        return num1 + num2;
    }

    // 构造函数
    constructor(age) {
        this.m_age = age;
    }

    // getter | setter
    get age() { return this.m_age }
    set age(val) { this.m_age = val }

    // method
    nextYearAge() {
        return Animal.sum(this.m_age, 1);
    }
}

class Mammal extends Animal{
    constructor(gender, age) {
        super(age);
        this.m_gender = gender;
    }
    set gender(val) { this.m_gender = val }
    get gender() { return this.m_gender }
}

class Human extends Mammal {
    constructor(name, gender, age) {
        super(gender, age);
        this.m_name = name;
    }
    set name(val) { this.m_name = val }
    get name() { return this.m_name }
    printMessage() {
        console.log(this.name, this.gender, this.age)
    }
}

const man = new Human("Peter", false, 16);
man.printMessage();
console.log(man.nextYearAge());
```

### Set

```js
let set = new Set();
set.add(1);
set.add(2);
set.add(2); // 重复添加无效
set.add(3);
// 迭代
for (let ele of set) {
    console.log(ele);
}
// 从字符串创建
console.log(new Set("Hello"));
// 从数组创建
console.log(new Set(['a', 'b', 'b', 'c']));

let set1 = new Set([1, 2, 3]);
let set2 = new Set([2, 3, 4]);
// 并集
console.log(new Set([...set1, ...set2]));
// 交集
console.log(new Set([...set1].filter(x => set2.has(x))));
// 差集
console.log(new Set([...set1].filter(x => !set2.has(x))));
console.log(new Set([...set2].filter(x => !set1.has(x))));
```

### Map

```js
/**
 * 从对象创建Map
 * @param {Object} obj
 */
function MapBuilder(obj) {
    const map = new Map();
    for (let key of Object.keys(obj) ) map.set(key, obj[key]);
    return map;
}
const map1 = MapBuilder({a: 'A', b: 'B'});
const map2 = MapBuilder({c: 'C', d: 'D'});

// 转为数组
console.log(Array.from(map1));

// 克隆
console.log(new Map(map1));

// 合并
console.log(new Map([...map1, ...map2]));
```

### SequenceGenerator

```js
/** @return {number} */
function* Generator123() {
    yield 1; yield 2; return 3;
}
const generators = {
    /** @return {number} */
    *Generator456() {
        let i; for (i = 4; i < 6; i++) yield i;
        return i;
    },
    /** @return {number} */
    Generator789: function* () {
        let i; for (i = 7; i < 9; i++) yield i;
        return i;
    }
};
function runGenerator(g) {
    for (; ;) {
        let next = g.next();
        console.log(next.value);
        if (next.done) break;
    }
}
//
runGenerator(Generator123());
runGenerator(generators.Generator456());
runGenerator(generators.Generator789());
```

### Promise

```js
/**
 * 手动创建并返回一个Promise
 * @return {Promise}
 */
function getPromise(ok) {
    return new Promise((resolve, reject) => {
        if (ok) {
            resolve("Promise: Success!");
        } else {
            reject("Promise: Error!");
        }
    });
}

getPromise(true).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
});
getPromise(false).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
});

/**
 * async方法默认返回一个Promise
 * 在函数体里`return r`相当于`resolve(r)`
 * @return {Promise}
 */
async function asyncFn(ok) {
    if (ok) {
        return "async: Success!";
    } else {
        return "async: Error!";
    }
}

asyncFn(true).then(res => {
    console.log(res)
});

asyncFn(false).then(res => {
    console.log(res)
});

/**
 * 在async方法中可以使用await关键字，使异步变同步。
 */
(async function() {
    for (let i=0; i<3; i++) {
        let res = await getPromise(i);
        console.log(res );
    }
})();
```

### Symbol

```js
// 表示独一无二的值
const syb1 = Symbol("SYMBOL");
const syb2 = Symbol("SYMBOL");
console.log({syb1, syb2});
console.log('type:', typeof syb1, typeof syb2);
console.log('syb1 === syb2:', syb1 === syb2);

// 用来定义对象的唯一属性名
{
    const syb = Symbol("the_key");
    {// 写法1
        let obj = {};
        obj[syb] = "first";
        console.log(obj[syb]);
    }
    {// 写法2
        let obj = {
            [syb]: "second"
        };
        console.log(obj[syb]);
    }
    {// 写法3
        let obj = {};
        Object.defineProperties(obj, {
            [syb]: {value: "third"}
        });
        console.log(obj[syb]);
    }
}
```

### ArrayBuffer

```js
/*
 * ArrayBuffer: 代表内存之中的一段二进制数据
 * TypedArray:
 *      Int8Array、Uint8Array、Uint8ClampedArray、
 *      Int16Array、Uint16Array、
 *      Int32Array、Uint32Array、
 *      Float32Array、Float64Array
 * DataView: 复合格视图
*/
ArrayBuffer.prototype.toHexString = function (splitter) {
    splitter = splitter || ',';
    const D = [];
    const B = new Uint8Array(this);
    const L = this.byteLength;
    for (let i=L-1; i>=0; i--) {
        let ch = B[i].toString(16).toUpperCase();
        D.push(1===ch.length ? `0${ch}` : ch);
    }
    return D.join(splitter);
};

// TypedArray
{
    const buf = new ArrayBuffer(4);
    // 以32位整数赋值缓冲区
    const x1 = new Uint32Array(buf);
    x1[0] = 0xAABBCCDD;
    // 按字节读取缓冲区：低位在前
    const x2 = new Uint8Array(buf);
    console.log(
        x2[0].toString(16),
        x2[1].toString(16),
        x2[2].toString(16),
        x2[3].toString(16)
    );
    console.log(buf.toHexString());
}

// DataView
{
    const buf = new ArrayBuffer(8);
    const dataView = new DataView(buf);
    for (let i=0;i<8;i++) {
        dataView.setUint8(i, i + 0xa0);
    }
    console.log(buf.toHexString());
    for (let i=0;i<2;i++) {
        console.log(dataView.getUint32(i*4).toString(16));
    }
}
```

## TS

### 数据类型

基本类型：`string`、`number`、`boolean`、`any`、`Array<T>`

```ts
// 元组
let ele: [string, number] = ["Anne", 16];
console.log(ele);

// 联合类型
let un: string | number;
un = 99999; console.log("num:", un);
un = "str"; console.log("str:", un);

// 枚举类型
enum Color {Red, Green, Blue}
let r: Color = Color.Red;
let g: Color = Color.Green;
let b: Color = Color.Blue;
console.log({r, g, b});

// 函数定义
function sum(x: number, y: number): number {
    return x + y;
}
const mul = (x: number, y: number): number => {
    return x * y;
};
```

### 循环

```ts
for (let i: number = 0; i < 3; i++) { console.log(i); }
for (let i in ['a', 'b', 'c']) { console.log(i); }
for (let it of ['a', 'b', 'c']) { console.log(it); }
while (true) break;
do { break; } while (true);
```

### 命名空间

```ts
namespace TheSpace {
    // export的属性或方法可以被外部访问
    export function saySomething() {
        console.log("Something!");
    }
    // sayNothing不能被外部访问
    function sayNothing() {
        console.log("Nothing!");
    }
}
TheSpace.saySomething();
TheSpace.sayNothing(); // <= Property 'sayNothing' does not exist
```

### 面向对象

```ts
interface Animal {
    getAge(): number;
    setAge(age: number);
}
abstract class Mammal implements Animal {
    protected name: string;
    protected gender: boolean;
    protected age: number;
    public constructor(name: string, gender: boolean, age: number) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }
    public getName(): string { return this.name; }
    public setName(name: string) { this.name = name; }
    public getGender(): boolean { return this.gender; }
    public setGender(gender: boolean) { this.gender = gender; }
    public getAge(): number { return this.age; }
    public setAge(age: number) { this.age = age; }
    //
    public abstract say(): void;
}
class People extends Mammal {
    public constructor(name: string, gender: boolean, age: number) {
        super(name, gender, age);
    }
    public say(): void {
        console.log("People:", this.name + ", " + (this.gender ? "male" : "female") + ", " + this.age);
    }
}
let p: People = new People("Peter", false, 12);
p.say();
```

## XMLHttpRequest

```js
/**
 * @callback onStateChangeCallback
 * @param {number} state
 * @param {XMLHttpRequest} request
 * @param {Event} ev
 * @return {void}
 */

/**
 * @param {string} requestUrl
 * @param {string} requestMethod
 * @param {BodyInit | null} requestBody
 * @param {onStateChangeCallback} stateCallback
 * @return {void}
 */
 const requestBase = (requestUrl, requestMethod, requestBody, stateCallback) => {
    const request = new XMLHttpRequest();
    /**
     * @param {XMLHttpRequest} this
     * @param {Event} ev
     */
    request.onreadystatechange = function (ev) {
        /*readyState
            0 === XMLHttpRequest.UNSENT
            1 === XMLHttpRequest.OPENED
            2 === XMLHttpRequest.HEADERS_RECEIVED
            3 === XMLHttpRequest.LOADING
            4 === XMLHttpRequest.DONE
        */
        stateCallback(this.readyState, this, ev);
    };
    request.open(requestMethod, requestUrl);
    request.send(requestBody);
};

/**
 * @param {string} requestUrl
 * @param {string} [requestMethod]
 * @param {XMLHttpRequestResponseType} [expectType] default json
 * @param {BodyInit | null} [requestBody] default null
 * @param {object} [requestHeaders] default nothing
 * @return {Promise<any>}
 */
const requestCommon = (requestUrl, requestMethod, expectType, requestBody, requestHeaders) => {
    return new Promise((resolve, reject) => {
        requestBase(
            requestUrl,
            (requestMethod || 'GET'),
            (requestBody || null),
            (state, request, ev) => {
                switch (state) {
                    case XMLHttpRequest.OPENED:
                        // 设置接受值
                        request.responseType = expectType || 'json';
                        // 设置请求头
                        if (undefined !== requestHeaders) {
                            for (let key of Object.keys(requestHeaders)) {
                                request.setRequestHeader(key, requestHeaders[key]);
                            }
                        }
                        break;
                    case XMLHttpRequest.DONE:
                        if (
                            request.status >= 200 && request.status < 300 ||
                            304 === request.status /* ReadCache */
                        ) {
                            resolve({
                                header: request.getAllResponseHeaders().split('\n'),
                                data: request.response
                            });
                        } else {
                            reject(new Error(request.statusText));
                        }
                        break;
                }
            }
        );
    });
};
```
