
// 实现一个 Storage

// 实现：静态方法版
{
  class Storage {
    static getInstance() {
      // 判断是否已经new过一个实例
      if (!Storage.instance) {
        // 若这个唯一的实例不存在，那么先创建它
        Storage.instance = new Storage()
      }
      // 如果这个唯一的实例已经存在，则直接返回
      return Storage.instance
    }
    getItem(key) {
      return localStorage.getItem(key)
    }
    setItem(key, value) {
      return localStorage.setItem(key, value)
    }
  }

  const storage1 = Storage.getInstance()
  const storage2 = Storage.getInstance()

  storage1.setItem('name', '李雷')
  // 李雷
  console.log(storage1.getItem('name'));
  // 也是李雷
  console.log(storage2.getItem('name'));

  // 返回true
  storage1 === storage2
}


// 实现： 闭包版
{
  // 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
  function StorageBase() { }
  StorageBase.prototype.getItem = function (key) {
    return localStorage.getItem(key)
  }
  StorageBase.prototype.setItem = function (key, value) {
    return localStorage.setItem(key, value)
  }

  // 以闭包的形式创建一个引用自由变量的构造函数
  const Storage = (function () {
    let instance = null
    return function () {
      // 判断自由变量是否为null
      if (!instance) {
        // 如果为null则new出唯一实例
        instance = new StorageBase()
      }
      return instance
    }
  })()

  // 这里其实不用 new Storage 的形式调用，直接 Storage() 也会有一样的效果
  const storage1 = new Storage()
  const storage2 = new Storage()

  storage1.setItem('name', '李雷')
  // 李雷
  storage1.getItem('name')
  // 也是李雷
  storage2.getItem('name')

  // 返回true
  storage1 === storage2
}