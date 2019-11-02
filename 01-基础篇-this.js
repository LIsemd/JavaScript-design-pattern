/**
 * this new 绑定
 * 
 * 结论1：
 * prototype 指向函数的原型对象
 * __proto__ 指向实例的原型对象
 * 实例.__proto__ = 对应构造函数.prototype
 * 
 * 结论2：
 * new一个实例的过程：
 * 1. 创建一个对象，
 * 2. 把新对象赋予当前的this 
 * 3. 如果构造函数没有返回值 (注意：返回值是数值/布尔值/字符串，将会被忽略) ，则自动返回新对象，并将构造函数的prototype赋予实例的__proto__ 
 * 4. 执行构造函数
 * 
 */
// function Foo() {
//     // var obj = 5         // 忽略返回值
//     // var obj = false     // 忽略返回值
//     // var obj = "5"       // 忽略返回值
//     // var obj = []
//     // var obj = { a: 5 }
//     // var obj = function() {}
//     console.log('this :', this); // Foo {}
//     // return obj
// }
// var bar = new Foo()
// console.log('bar :', bar); // Foo {} 或 '构造函数的返回值（）'
// console.log('typeof bar :', typeof bar); // object 或 'typeof 构造函数的返回值'
// console.log('bar.__proto__ :', bar.__proto__); // Foo {} 或 '构造函数的返回值.__proto__'
// console.log('bar.prototype :', bar.prototype); // undefined
// console.log('Foo.__proto__ :', Foo.__proto__); // function () { [native code] }
// console.log('Foo.prototype :', Foo.prototype); // Foo {}
// console.log('bar.__proto__ === Foo.prototype :', bar.__proto__ === Foo.prototype); // 当函数没有返回值时为true，否则根据函数返回值判断



/**
 * this 显示绑定
 * 
 * 结论1：
 * call 和 apply 的区别是 call 接受参数列表，而apply接受参数数组
 * 
 * 结论2：
 * bind 方法是设置 this 为给定的值，并返回一个新的函数，且在调用新函数时，合并参数列表
 * 
 * 结论3：
 * 如果 this 是 null 或 undefined ,调用时会被忽略，采用默认绑定规则
 * 
 */
// function foo(name, price) {
//     this.name = name
//     this.price = price
// }

// function Food(category, name, price) {
//     // foo.call(this, name, price)
//     foo.apply(this, [name, price])
//     this.category = category
//     console.log('this :', this);    // Food { name: '汉堡', price: '5块钱', category: '食品' }
// }
// new Food('食品', '汉堡', '5块钱')

// var food = {
//     name: '汉堡',
//     price: '5块钱',
//     getPrice: function(place) {
//         console.log(place + this.price)
//     }
// }
// var getPrice1 = food.getPrice.bind({ name: '鸡腿', price: '7块钱' }, '肯打鸡 ')
// var getPrice2 = food.getPrice.bind({ name: '鸡腿', price: '7块钱' })
// getPrice1() // 肯打鸡 7块钱
// getPrice2('肯打鸡 ') // 肯打鸡 7块钱


/**
 * 使用 apply 实现bind
 * 
 * 结论1：
 * arguments 是类数组，没有数组的slice方法，必须使用Array.prototype.slice.call
 * 
 */
// console.log('Function.prototype :', Function.prototype);
/**
 * ES5
 */
// Function.prototype.bind = function() {
//     var self = this
//     var rest1 = Array.prototype.slice.call(arguments)
//     var context = rest1.shift()
//     return function() {
//         var rest2 = Array.prototype.slice.call(arguments)
//         return self.apply(context, rest1.concat(rest2))
//     }
// }
/**
 * ES6
 */
// Function.prototype.bind = function(...rest1) {
//     const context = rest1.shift()
//     return (...rest2) => {
//         return this.apply(context, [...rest1, ...rest2])
//     }
// }
// var food = {
//     name: '汉堡',
//     price: '5块钱',
//     getPrice: function(place) {
//         console.log(place + this.price)
//     }
// }
// console.log('food.getPrice.bind :', food.getPrice.bind);
// var getPrice1 = food.getPrice.bind({ name: '鸡腿', price: '7块钱' }, '肯打鸡 ')
// var getPrice2 = food.getPrice.bind({ name: '鸡腿', price: '7块钱' })
// getPrice1() // 肯打鸡 7块钱
// getPrice2('肯打鸡 ') // 肯打鸡 7块钱


/**
 * this 隐式绑定
 * 
 * 结论1：this 绑定在函数调用的地方
 * 
 */
// var a = 'hello'
// var obj = {
//     a: 'world',
//     b:{
//         a:'China',
//         foo: function() {
//             console.log(this.a)
//         }
//     },
//     foo: function() {
//         console.log(this.a)
//     }
// }
// obj.foo()       // world
// obj.b.foo()       // China


/**
 * this 默认绑定
 * 
 * 结论1：函数独立调用( 只看调用 )时，非严格模式下绑定到全局对象，严格模式下绑定到undefined
 * 
 * 结论2：在 node 中 this = {} === exports 所以 this.name 是 undefined
 * 原因： node中，每个模块（文件）有自己模块作用域 exports ，声明一个变量并不会成为 node 的全局变量
 * 
 * 结论3：优先级： new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定
 */
// console.log('this :', this);    // {}
// console.log('this === exports :', this === exports); // true

// var a = 'hello' //浏览器
// global.a = 'hello' // node
// var obj = {
//     a: 'world',
//     foo: function() {
//         console.log(this.a)
//         console.log(this);
//     }
// }
// function foo() {
//     var a = 'world'
//     console.log(this.a)
//     console.log(this);
// }
// var bar = obj.foo
// foo()
// bar()

/**
 * 箭头函数的this
 * 
 * 结论1：箭头函数是根据声明的地方来决定this，且无法被call/apply/bind修改，又因为没有构造函数constructor,无法使用new调用
 * 
 * 结论2：箭头函数的 this 在 node 中不指向 global ,而是指向当前文件的 this 即 exports
 */

// var a = 'hello'
// global.a = 'hello global'
// exports.a = 'hello exports'
// var obj = {
//     a: 'world',
//     foo: () => {
//         console.log(this.a) // 浏览器： hello ||  node: exports.a
//         // node
//         console.log('this === global :', this === global); //false
//         console.log('this === exports :', this === exports); //true
//     },
//     foo2: function() {
//         console.log(this.a)
//         console.log('this :', this);
//     }
// }
// var bar = obj.foo
// bar()
// obj.foo()
// var bar = obj.foo2
// bar()
// obj.foo2()