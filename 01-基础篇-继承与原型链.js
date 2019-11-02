/**
 * 对象继承
 * 
 * 结论1： 使用对象字面量创建对象时，会隐式指定Object.prototype为新对象的[[Prototype]]
 * 
 * 结论2： 使用 Object.create() 方法创建对象时，可以显示指定对象的[[Prototype]]
 * 
 * 结论3： hasOwnProperty 可以检测属性或方法是否存在该对象上而非原型链上
 */

// const rectangle1 = { sizeType: '四边形' }
// // 等价于 ↑
// const rectangle2 = Object.create(Object.prototype, {
//     sizeType: {
//         configurable: true,
//         enumerable: true,
//         value: '四边形',
//         writable: true
//     }
// })

// var rectangle = {
//     sizeType: '四边形',
//     getSize: function() {
//         console.log(this.sizeType)
//     }
// }

// var square = Object.create(rectangle, {
//     sizeType: { value: '正方形' }
// })

// rectangle.getSize()   // "四边形"
// square.getSize()      // "正方形"

// console.log(rectangle.hasOwnProperty('getSize')) // true
// console.log(rectangle.isPrototypeOf(square))     // true
// console.log(square.hasOwnProperty('getSize'))    // false
// console.log('getSize' in square)                 // true

// console.log(square.__proto__ === rectangle)                       // true
// console.log(square.__proto__.__proto__ === Object.prototype)      // true


/**
 * 原型链继承
 * 
 * 结论1： 
 *  prototype ——> 原型对象
 *  __proto__  ——> 创建原型 / 实例的原型对象
 *  构造函数 ——> 调用原型对象的函数 
 *  实例 ——> 构造函数生产的对象
 * 
 * 结论2：Object.prototype.__proto__ = null
 * 
 * 结论3：每一个函数在创建之后都会拥有一个名为prototype的属性，Function.prototype.bind方法构造出来的函数是个例外，它没有prototype属性
 * 
 */

// function YourConstructor() {}

// // JavaScript 引擎在背后做的：
// // YourConstructor.prototype = Object.create(Object.prototype, {
// //     constructor: {
// //         configurable: true,
// //         enumerable: true,
// //         value: YourConstructor,
// //         writable: true
// //     }
// // })
// console.log('YourConstructor.prototype :', YourConstructor.__proto__);
// console.log(YourConstructor.prototype.__proto__ === Object.prototype)         // true

/* 四边形 */
// function Rectangle(length, width) {
//     this.length = length   // 长
//     this.width = width     // 宽
// }

// /* 获取面积 */
// Rectangle.prototype.getArea = function() {
//     return this.length * this.width
// }

// /* 获取尺寸信息 */
// Rectangle.prototype.getSize = function() {
//     console.log(`Rectangle: ${ this.length }x${ this.width }，面积: ${ this.getArea() }`)
// }

// /* 正方形 */
// function Square(size) {
//     this.length = size
//     this.width = size
// }

// Square.prototype = new Rectangle()
// Square.prototype.constructor = Square   // 原本为 Rectangle，重置回 Square 构造函数

// Square.prototype.getSize = function() {
//     console.log(`Square: ${ this.length }x${ this.width }，面积: ${ this.getArea() }`)
// }

// var rect = new Rectangle(5, 10)
// var squa = new Square(6)
// // console.log('rect.__proto__ :', rect.__proto__);
// // console.log('squa.__proto__ :', squa.__proto__);
// // console.log('squa.__proto__.__proto__ :', squa.__proto__.__proto__);
// // console.log('rect.__proto__.__proto__ :', rect.__proto__.__proto__);
// // console.log('squa.__proto__.__proto__.__proto__ :', squa.__proto__.__proto__.__proto__ === Object.prototype);
// // console.log('squa.__proto__.__proto__.__proto__ :', squa.__proto__.__proto__.__proto__ === Object.prototype);
// rect.getSize()       // Rectangle: 5x10，面积: 50
// squa.getSize()       // Square: 6x6，面积: 36


/**
 * 构造继承： 在子类型构造函数的内部调用父类构造函数
 */

// function getArea() {
//     return this.length * this.width
// }

// /* 四边形 */
// function Rectangle(length, width) {
//     this.length = length
//     this.width = width
// }

// /* 获取面积 */
// Rectangle.prototype.getArea = getArea

// /* 获取尺寸信息 */
// Rectangle.prototype.getSize = function() {
//     console.log(`Rectangle: ${ this.length }x${ this.width }，面积: ${ this.getArea() }`)
// }

// /* 正方形 */
// function Square(size) {
//     Rectangle.call(this, size, size)
    
//     this.getArea = getArea
    
//     this.getSize = function() {
//         console.log(`Square: ${ this.length }x${ this.width }，面积: ${ this.getArea() }`)
//     }
// }

// var rect = new Rectangle(5, 10)
// var squa = new Square(6)

// rect.getSize()       // Rectangle: 5x10，面积: 50
// squa.getSize()       // Square: 6x6，面积: 36


/**
 * 组合继承： 组合继承是 JavaScript 中最常用的继承模式，但是父类构造函数被调用了两次
 */
/* 四边形 */
// function Rectangle(length, width) {
//     this.length = length
//     this.width = width
//     this.color = 'red'
// }

// /* 获取面积 */
// Rectangle.prototype.getArea = function() {
//     return this.length * this.width
// }

// /* 获取尺寸信息 */
// Rectangle.prototype.getSize = function() {
//     console.log(`Rectangle: ${ this.length }x${ this.width }，面积: ${ this.getArea() }`)
// }

// /* 正方形 */
// function Square(size) {
//     Rectangle.call(this, size, size)  // 第一次调用 Rectangle 函数
//     this.color = 'blue'
// }

// Square.prototype = new Rectangle()    // 第二次调用 Rectangle 函数
// Square.prototype.constructor = Square

// Square.prototype.getSize = function() {
//     console.log(`Square: ${ this.length }x${ this.width }，面积: ${ this.getArea() }`)
// }

// var rect = new Rectangle(5, 10)
// var squa = new Square(6)

// rect.getSize()       // Rectangle: 5x10，面积: 50
// squa.getSize()       // Square: 6x6，面积: 36

/**
 * 寄生组合式继承
 */
/* 实现继承逻辑 */
// function inheritPrototype(sub, sup) {
//     var prototype = Object.create(sup.prototype)
//     prototype.constructor = sub
//     sub.prototype = prototype
// }
// /* 四边形 */
// function Rectangle(length, width) {
//     this.length = length
//     this.width = width
//     this.color = 'red'
// }

// /* 获取面积 */
// Rectangle.prototype.getArea = function() {
//     return this.length * this.width
// }

// /* 获取尺寸信息 */
// Rectangle.prototype.getSize = function() {
//     console.log(`Rectangle: ${ this.length }x${ this.width }，面积: ${ this.getArea() }`)
// }

// /* 正方形 */
// function Square(size) {
//     Rectangle.call(this, size, size)  // 第一次调用 Rectangle 函数
//     this.color = 'blue'
// }

// // 实现继承
// inheritPrototype(Square, Rectangle)

// Square.prototype.getSize = function() {
//     console.log(`Square: ${ this.length }x${ this.width }，面积: ${ this.getArea() }`)
// }

// var rect = new Rectangle(5, 10)
// var squa = new Square(6)

// rect.getSize()       // Rectangle: 5x10，面积: 50
// squa.getSize()       // Square: 6x6，面积: 36


/**
 * ES6 extends
 */
/* 四边形 */
class Rectangle {
    constructor(length, width) {
        this.length = length
        this.width = width
        this.color = 'red'
    }
    
    /* 获取面积 */
    getArea() {
        return this.length * this.width
    }
    
    /* 获取尺寸信息 */
    getSize() {
        console.log(`Rectangle: ${ this.length }x${ this.width }，面积: ${ this.getArea() }`)
    }
}

/* 正方形 */
class Square extends Rectangle {
    constructor(size) {
        super(size, size)
        this.color = 'blue'
    }
    
    getSize() {
        console.log(`Square: ${ this.length }x${ this.width }，面积: ${ this.getArea() }`)
    }
}


var rect = new Rectangle(5, 10)
var squa = new Square(6)

rect.getSize()       // Rectangle: 5x10，面积: 50
squa.getSize()       // Square: 6x6，面积: 36