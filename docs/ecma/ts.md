
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
