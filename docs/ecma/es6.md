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

### Proxy

```js
let target = {
    name: '',
    age: 0
}
let handler = {
    get: function(target, key) {
        console.log('get', key);
        return target[key];
    },
    set: function(target, key, value) {
        console.log('set', key);
        target[key] = value;
    }
}
let proxy = new Proxy(target, handler)
proxy.name = "Tom"  // 实际执行 handler.set
proxy.age = 25      // 实际执行 handler.set
proxy.name          // 实际执行 handler.get
proxy.age           // 实际执行 handler.get
console.log(target)
console.log(proxy)
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
