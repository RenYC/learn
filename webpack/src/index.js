import _ from 'lodash'

function component() {
  // 创建一个新的 div 元素
  const element = document.createElement('div')

  // lodash（目前通过一个 script 引入）对于指向这一行是必须的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());