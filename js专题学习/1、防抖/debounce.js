var count = 1;
var container = document.getElementById('container');

function getUserAction() {
  container.innerHTML = count++
}

// container.onmousemove = getUserAction;

// 第一版
// function debounce(func, wait) {
//   var timeout;
//   return function () {
//     clearTimeout(timeout)
//     timeout = setTimeout(func, wait);
//   }
// }

// 第二版
// function debounce(func, wait) {
//   var timeout;

//   return function(){
//     var context = this;

//     clearTimeout(timeout)
//     timeout = setTimeout(function(){
//       func.apply(context)
//     }, wait)
//   }
// }

// 第三版
// function debounce(func, wait) {
//   var timeout;

//   return function() {
//     var context = this;
//     var args = arguments;

//     clearTimeout(timeout)
//     timeout = setTimeout(function(){
//       func.apply(context, args)
//     }, wait)
//   }
// }

// 第四版
// function debounce(func, wait){
//   var timeout, result;

//   return function() {
//     var context = this;
//     var args = arguments;

//     clearTimout(timeout)
//     timeout = setTimeout(function(){
//       result = func.apply(context, args)
//     }, wait)

//     return result;
//   }
// }

// 第五版
// function debounce(func, wait, immediate){
//   var timeout, result;

//   return function () {
//     var context = this;
//     var args = arguments;

//     if(timeout) clearTimeout(timeout);
//     if(immediate){
//       // 如果已经执行过，不在执行
//       var callNow = !timeout;
//       timeout = setTimeout(function(){
//         timeout = null
//       }, wait)
//       if(callNow) result = func.apply(context, args)
//     }else{
//       timeout = setTimeout(function(){
//         result = func.apply(context, args)
//       }, wait)
//     }
//     return result;
//   }
// }

// 第六版
function debounce(func, wait, immediate) {
  var timeout, result;

  var debounced = function () {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function(){
        timeout = null;
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function(){
        result = func.apply(context, args)
      }, wait)
    }
    return result;
  }

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  }
  return debounced;
}
container.onmousemove = debounce(getUserAction, 1000, true);