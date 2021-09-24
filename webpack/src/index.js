import _ from 'lodash'
import printMe from './print';

function component() {
  // 创建一个新的 div 元素
  const element = document.createElement('div')
  const btn = document.createElement('button');

  // lodash（目前通过一个 script 引入）对于指向这一行是必须的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!'
  btn.onclick=printMe;

  element.appendChild(btn)

  return element;
}

document.body.appendChild(component());