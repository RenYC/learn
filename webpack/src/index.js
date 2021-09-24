import _ from 'lodash'
import './style.css'
import Icon from './icon.png'

function component() {
  // 创建一个新的 div 元素
  const element = document.createElement('div')

  // - lodash（目前通过一个 script 引入）对于指向这一行是必须的
  // + lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello')

  // 将图像添加到我们已经存在的 div 中。
  const logo = new Image()
  logo.src = Icon;

  element.appendChild(logo)

  return element;
}

document.body.appendChild(component());