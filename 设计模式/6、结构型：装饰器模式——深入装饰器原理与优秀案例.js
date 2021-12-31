// 结构型：装饰器模式——深入装饰器原理与优秀案例

// 前置知识：ES7 中的装饰器

// 装饰器函数，它的第一个参数是目标类
// function classDecorator(target) {
//   target.hasDecorator = true
//   return target
// }

// // 将装饰器“安装”到Button类上
// @classDecorator
// class Button {
//   // Button类的相关逻辑
// }

// // 验证装饰器是否生效
// console.log('Button 是否被装饰了：', Button.hasDecorator)

// 也可以用同样的语法糖去装饰类里面的方法：

// 具体的参数意义，在下个小节，这里大家先感知一下操作
function funcDecorator(target, name, descriptor) {
  let originalMethod = descriptor.value
  descriptor.value = function () {
    console.log('我是Func的装饰器逻辑')
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

class Button {
  @funcDecorator
  onClick() {
    console.log('我是Func的原有逻辑')
  }
}

// 验证装饰器是否生效
const button = new Button()
button.onClick()