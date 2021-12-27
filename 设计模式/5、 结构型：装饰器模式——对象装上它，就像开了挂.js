// 结构型：装饰器模式——对象装上它，就像开了挂

// 不会对原有的功能产生任何影响，仅仅是具备了一种新的能力

// 装饰器模式初相见

// 为了不被已有的业务逻辑干扰，当务之急就是将旧逻辑与新逻辑分离，把旧逻辑抽出去：

// 将展示Modal的逻辑单独封装
function openModal() {
  const modal = new Modal()
  modal.style.display = 'block'
}

// 编写新逻辑：
// 按钮文案修改逻辑
function changeButtonText() {
  const btn = document.getElementById('open')
  btn.innerText = '快去登录'
}

// 按钮置灰逻辑
function disableButton() {
  const btn = document.getElementById('open')
  btn.setAttribute('disabled', true)
}

// 新版本功能逻辑整合
function changeButtonStatus() {
  changeButtonText()
  disableButton()
}

// 然后把三个操作逐个添加open按钮的监听函数里：
document.getElementById('open').addEventListener('click', function () {
  openModal()
  changeButtonStatus()
})

// 如此一来，我们就实现了“只添加，不修改”的装饰器模式，使用changeButtonStatus的逻辑装饰了旧的按钮点击逻辑。以上是ES5中的实现，ES6中，我们可以以一种更加面向对象化的方式去写：

// 定义打开按钮
class OpenButton {
  // 点击后展开弹窗（旧逻辑）
  onClick() {
    const modal = new Modal()
    modal.style.display = 'block'
  }
}

// 定义按钮对应的装饰器
class Decorator {
  // 将按钮实例传入
  constructor(open_button) {
    this.open_button = open_button
  }

  onClick() {
    this.open_button.onClick()
    // 包装 了一层新逻辑
    this.changeButtonStatus()
  }

  changeButtonStatus() {
    this.changeButtonText()
    this.disableButton()
  }

  disableButton() {
    const btn = document.getElementById('open')
    btn.setAttribute("disabled", true)
  }

  changeButtonText() {
    const btn = document.getElementById('open')
    btn.innerText = '快去登录'
  }
}

const openButton = new OpenButton()
const decorator = new Decorator(openButton)

document.getElementById('open').addEventListener('click', function () {
  // openButton.onClick()
  // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
  decorator.onClick()
})