// class SingleDog {
//   show() {
//     console.log('我是一个单例对象');
//   }
// }

// const s1 = new SingleDog()
// const s2 = new SingleDog()

// // false
// s1 === s2

// 而单例模式想要做到的是，不管我们尝试去创建多少次，它都只给你返回第一次所创建的那唯一的一个实例。

// 具备判断自己是否已经创建过一个实例
// class SingleDog {
//   show() {
//     console.log('我是一个单例对象');
//   }
//   static getInstance() {
//     // 判断是否已经new过1个实例
//     if (!SingleDog.instance) {
//       // 若这个唯一的实例不存在，那么先创建它
//       SingleDog.instance = new SingleDog()
//     }
//     // 如果这个唯一的实例已经存在，则直接返回
//     return SingleDog.instance
//   }
// }

// const s1 = SingleDog.getInstance()
// const s2 = SingleDog.getInstance()

// // true
// s1 === s2

// 闭包
SingleDog.getInstance = (function () {
  // 定义自由变量instance, 模拟私有变量
  let instance = null
  return function () {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null则new 出唯一实例
      instance = new SingleDog()
    }
    return instance
  }
})()



// 生产实践：Vuex中的单例模式

// 理解 Vuex 中的 Store
