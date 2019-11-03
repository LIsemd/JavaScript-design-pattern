/* Person 类 */
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

/* IIFE */
// const Singleton = (function() {
//     let _instance = null
//     const ProxySingleton = function(name, age) {
//         if(_instance) return _instance
//         _instance = new Person(name, age)
//         return _instance
//     }

//     ProxySingleton.getInstance = function(name, age) {
//         if (_instance) return _instance
//         _instance = new Singleton(name, age)
//         return _instance
//     }
//     return ProxySingleton
// })()
// const person1 = new Singleton('张小帅', 25)    // '张小帅', 25
// const person2 = new Singleton('李小美', 23)    // '张小帅', 25
// console.log('person1 :', person1);
// console.log('person2 :', person2);


/* Proxy */
function Singleton(FuncClass) {
    let _instance
    return new Proxy(FuncClass, {
        construct(target, args) {
            return _instance || (_instance = Reflect.construct(FuncClass, args)) // 使用 new FuncClass(...args) 也可以
        }
    })
}

const PersonInstance = Singleton(Person)

const person1 = new PersonInstance('张小帅', 25)    // '张小帅', 25
const person2 = new PersonInstance('李小美', 23)    // '张小帅', 25

console.log('person1 === person2 :', person1 === person2);  // true

// 饿汉式
const HungrySingleton = (function() {
    const _instance = new FuncClass()
    
    return function() {
        return _instance
    }
})()

// 懒汉式
const LazySingleton = (function() {
    let _instance = null
    
    return function() {
        return _instance || (_instance = new FuncClass())
    }
})()