/**
 * 高阶函数： 输入参数里有函数，或者输出是函数的函数。
 */
// var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

// var result = words.filter(function(word) {
//     return word.length > 6
// })
// console.log('result :', result);

/**
 * 柯里化： 把接受多个参数的原函数变换成接受一个单一参数（原函数的第一个参数）的函数，并且返回一个新函数
 *         新函数能够接受余下的参数，最后返回同原函数一样的结果
 * 作用： 参数复用 / 提前返回 / 延迟计算
 */
// ES5 方式
// function currying(fn) {
//     var rest1 = Array.prototype.slice.call(arguments)
//     rest1.shift()
//     return function() {
//         var rest2 = Array.prototype.slice.call(arguments)
//         return fn.apply(null, rest1.concat(rest2))
//     }
// }
// ES6 方式
// function currying(fn, ...rest1) {
//     return function(...rest2) {
//         return fn.apply(null, rest1.concat(rest2))
//     }
// }
// // 高阶柯里化
// function curryingHelper(fn, len) {
//     const length = len || fn.length
//     return function(...rest) {
//         return rest.length >= length ? fn.apply(this, rest) : curryingHelper(currying.apply(this, [fn].concat(rest)), length - rest.length)
//     }
// }

// function sayHello(name, age, fruit) {
//     console.log(`我叫 ${name},我 ${age} 岁了, 我喜欢吃 ${fruit}`)
// }

// const curryingShowMsg1 = curryingHelper(sayHello)
// curryingShowMsg1('小明')(22)('西瓜')


/**
 * 反柯里化： 意义和用法与柯里化相反，可以把原生方法借出来，让任何对象拥有原生对象的方法
 */
// ES5 方式
// function unCurrying(fn) {
//     return function(tar) {
//         var rest = Array.prototype.slice.call(arguments)
//         rest.shift()
//         return fn.apply(tar, rest)
//     }
// }

// ES6 方式
// function unCurrying(fn) {
//     return function(tar, ...args) {
//         return fn.apply(tar, args)
//     }
// }
// var push = unCurrying(Array.prototype.push)
// function execPush() {
//     push(arguments, 4)
//     console.log('arguments :', arguments);
// }
// execPush(1, 2, 3)


/**
 * 偏函数: 
 */
// const isType = function(type) {
//     return function(obj) {
//         return Object.prototype.toString.call(obj) === `[object ${type}]`
//     }
// }

// const isString = isType('String')
// const isFunction = isType('Function')

// const str = "123"
// console.log('str :', isString(str));  // true