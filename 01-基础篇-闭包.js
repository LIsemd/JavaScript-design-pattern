/**
 * 闭包 【一个持有外部环境变量的函数】
 * 
 * 结论1：一般来说，函数在执行完后会被销毁，而闭包会阻止某些 GC ，使得其不被回收
 * 
 * 结论2：由于 bar 拥有 foo 内部作用域的闭包，使得其作用域一直存活不被回收
 * 
 */
// function foo() {
//     var a = 2

//     function bar() {
//         console.log(a)
//     }

//     return bar
// }
// var baz = foo()
// baz()  

/**
 * 备忘模式：利用闭包实现结果缓存
 */
// ES5
// function memorize(fn) {
//     var cache = {}
//     return function() {
//         var args = Array.prototype.slice.call(arguments)
//         var key = JSON.stringify(args)
//         return cache[key] || (cache[key] = fn.apply(fn, args))
//     }
// }

// ES6
// function memorize(fn) {
//     const cache = {}
//     return function(...args) {
//         const key = JSON.stringify(args)
//         console.log('cache :', cache);
//         return cache[key] || (cache[key] = fn.apply(fn, args))
//     }
// }
// function add(a) {
//     return a + 1
// }
// const adder = memorize(add)
// adder(1)
// adder(1)
// adder(2)
// adder(2)
