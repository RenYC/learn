
async function getComponent() {
  // 创建一个新的 div 元素
  const element = document.createElement('div')
  const { default: _ } = await import('lodash')

  element.innerHTML = _.join(['Hello', 'webpack'], '');

  return element;
}

getComponent().then(component=>{
  document.body.appendChild(component)
})
