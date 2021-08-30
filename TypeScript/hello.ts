/**
 * 
 * @param {*} person 
 * @returns 
 * 
 * 使用 : 指定变量的类型， : 的前后有没有空格都可以
 * 
 * TypeScript 只会在编译时对类型进行静态检查，如果发现错误，编译时就会报错。
 */
// function sayHello(person: string) {
//   if(typeof person === 'string') {
//     return 'Hello, ' + person
//   } else {
//     throw new Error('person is not a string')
//   }
// }

// let user = 'Tom'
// console.log(sayHello(user));

/**
 * 联合类型：表示取值可以为多种类型中的一种
 */

/**
 * 对象的类型 -- 接口
 * 
 * 在 TypeScript 中，我们使用接口（interfaces）来定义对象的类型。
 * 
 * 什么是接口
 * 在面向对象语言中，接口（interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类(classes)去实现(implement)。
 * 
 * TypeScipt 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为抽象以外，也常用于对【对象的形状(Shape)】进行描述。
 */
// 简单的例子
// 赋值的适合，变量的形状必需和接口的形状保持一致。多一个或少一个变量都不行
interface Person {
  name: string
  age: number
}
let tom: Person = {
  name: 'Tom',
  age: 25
}

interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1,1,2,3,5]

// NumberArray 表示：只要索引的类型是数字时，那么值得类型必需是数字。