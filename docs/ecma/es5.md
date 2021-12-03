## ES5

### 数据类型

`string`、`number`、`boolean`、`function`、`object`、`undefined`

### string

```js
/**
 * 以左侧第一次发现的separator将字符串切割为两部分
 * @function String#splitFirst
 * @this {string}
 * @param {string} separator 切割字符
 * @return {[string, string]}
 */
String.prototype.splitFirst = function(separator) {
    const s = this;
    const p = s.indexOf(separator);
    if (-1 === p) return [s, ""];
    return [
        s.substr(0, p),
        s.substr(p + separator.length)
    ];
};

/**
 * @dependency String.splitFirst
 * String->Object
 * @function String#parseUrlForm
 * @this {string}
 * @param {string} [sep] Separator
 * @param {string} [eqs] Equal-sign
 * @return {object}
 */
String.prototype.parseUrlForm = function(sep, eqs) {
    sep = sep || '&';
    eqs = eqs || '=';
    const str = this;
    let obj = {};
    if (0 === str.length) return obj;
    for (let item of str.split(sep)) {
        let [k, v] = item.splitFirst(eqs);
        Object.defineProperty(obj, k, {
            // enumerable: false,
            // configurable: false,
            // writable: false,
            value: JSON.parse(decodeURIComponent(v))
        });
    }
    return obj;
};

/**
 * Object->String
 * @function Object#stringify
 * @this {object}
 * @param {string} [sep] Separator
 * @param {string} [eqs] Equal-sign
 * @return {string}
 */
 Object.prototype.stringify = function(sep, eqs) {
    sep = sep || '&';
    eqs = eqs || '=';
    const ret = [];
    const obj = this;
    for (let key of Object.keys(obj)) {
        let val = obj[key];
        ret.push(`${key}${eqs}${encodeURIComponent(JSON.stringify(val))}`);
    }
    return ret.join(sep);
};

// demo
(() => {
    console.log("1||2||3".splitFirst("||"));
    const o1 = {
        x: 123,
        y: [4, 5, 6],
        z: {
            a: 1,
            b: 2
        }
    }
    const s1 = o1.stringify();
    const o2 = s1.parseUrlForm();
    console.log(s1);
    console.log(o2);
})();
```

### arguments

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

### Factory

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

### Prototype

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
