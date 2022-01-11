// 定义发布者类
class Publisher {
  constructor() {
    this.observers = []
    console.log('Publisher created');
  }
  // 增加订阅者
  add(observer) {
    console.log('Publisher.add invoked')
    this.observers.push(observer)
  }
  // 移除订阅者
  remove(observer) {
    console.log('Publisher.remove invoked')
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1)
      }
    })
  }
  // 通知所有订阅者
  notify() {
    console.log('Publisher.notify invoked')
    this.observers.forEach((observer) => {
      observer.update(this)
    })
  }
}

// 定义订阅者类
class Observer {
  constructor() {
    console.log('Observer created')
  }
  update() {
    console.log('Observer.update invoked')
  }
}

// 定义一个具体的需求文档（prd）发布类
class PrdPublisher extends Publisher {
  constructor() {
    super()
    // 初始化需求文档
    this.prdState = null
    // 韩梅梅还没有拉群，开发群目前为空
    this.observers = []
    console.log('PrdPublisher created')
  }

  // 该方法用于获取当前的prdState
  getState() {
    console.log('PrdPublisher.getState invoked')
    return this.prdState
  }

  // 该方法用于改变prdState的值
  setState(state) {
    console.log('PrdPublisher.setState invoked')
    // prd的值发生改变
    this.prdState = state
    // 需求文档变更，立刻通知所有开发者
    this.notify()
  }
}

class DeveloperObserver extends Observer {
  constructor() {
    super()
    // 需求文档一开始还不存在，prd初始为空对象
    this.prdState = {}
    console.log('DeveloperObserver created')
  }

  // 重写一个具体的update方法
  update(publisher) {
    console.log('DeveloperObserver.update invoked')
    // 更新需求文档
    this.prdState = publisher.getState()
    // 调用工作函数
    this.work()
  }

  // work方法，一个专门搬砖的方法
  work() {
    // 获取需求文档
    const prd = this.prdState
    // 开始基于需求文档提供的信息搬砖。。
    console.log('996 begins...')
  }
}



// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver()
// 创建订阅者：服务端开发小A（sorry。。。起名字真的太难了）
const A = new DeveloperObserver()
// 创建订阅者：测试同学小B
const B = new DeveloperObserver()
// 韩梅梅出现了
const hanMeiMei = new PrdPublisher()
// 需求文档出现了
const prd = {
  // 具体的需求内容
}

// 韩梅梅开始拉群
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 韩梅梅发送了需求文档，并@了所有人
hanMeiMei.setState(prd)



// ------------------------------------------

// Vue数据双向绑定（响应式系统）的实现原理

// 核心代码

// 实现observer
// observe方法遍历并包装对象属性
function observe(target) {
  // 若target是一个对象，则遍历它
  if (target && typeof target === 'object') {
    Object.keys(target).forEach((key) => {
      // defineReactive方法会给目标属性装上“监听器”
      defineReactive(target, key, target[key])
    })
  }
}

// 定义defineReactive方法
function defineReactive(target, key, val) {
  // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
  observe(val)
  // 为当前属性安装监听器
  Object.defineProperty(target, key, {
    // 可枚举
    enumerable: true,
    // 不可配置
    configurable: false,
    get: function () {
      return val;
    },
    // 监听器函数
    set: function (value) {
      console.log(`${target}属性的${key}属性从${val}值变成了了${value}`)
      val = value
    }
  })
}

// 下面实现订阅者 Dep：

// 定义订阅者类Dep
class Dep {
  constructor() {
    // 初始化订阅队列
    this.subs = []
  }

  // 增加订阅者
  addSub(sub) {
    this.subs.push(sub)
  }

  // 通知订阅者（是不是所有的代码都似曾相识？）
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

// 现在我们可以改写 defineReactive 中的 setter 方法，在监听器里去通知订阅者了：
function defineReactive(target, key, val) {
  const dep = new Dep()
  // 监听当前属性
  observe(val)
  Object.defineProperty(target, key, {
    set: (value) => {
      // 通知所有订阅者
      dep.notify()
    }
  })
}

// ---------------------------------
// 实现一个Event Bus/ Event Emitter

// 在Vue中使用Event Bus来实现组件间的通讯

// 创建一个 Event Bus（本质上也是 Vue 实例）并导出：

const EventBus = new Vue()
export default EventBus

// 在主文件里引入EventBus，并挂载到全局：
import bus from 'EventBus的文件路径'
Vue.prototype.bus = bus

// 订阅事件：
// 这里func指someEvent这个事件的监听函数
this.bus.$on('someEvent', func)

// 发布（触发）事件：
// 这里params指someEvent这个事件被触发时回调函数接收的入参
this.bus.$emit('someEvent', params)

// 下面，我们就一起来实现一个Event Bus（注意看注释里的解析）：
class EventEmitter {
  constructor() {
    // handlers是一个map，用于存储事件与回调之间的对应关系
    this.handlers = {}
  }

  // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 先检查一下目标事件名有没有对应的监听函数队列
    if (!this.handlers[eventName]) {
      // 如果没有，那么首先初始化一个监听函数队列
      this.handlers[eventName] = []
    }

    // 把回调函数推入目标事件的监听函数队列里去
    this.handlers[eventName].push(cb)
  }

  // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handlers[eventName]) {
      // 这里需要对 this.handlers[eventName] 做一次浅拷贝，主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
      const handlers = this.handlers[eventName].slice()
      // 如果有，则逐个调用队列里的回调函数
      handlers.forEach((callback) => {
        callback(...args)
      })
    }
  }

  // 移除某个事件回调队列里的指定回调函数
  off(eventName, cb) {
    const callbacks = this.handlers[eventName]
    const index = callbacks.indexOf(cb)
    if (index !== -1) {
      callbacks.splice(index, 1)
    }
  }

  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}