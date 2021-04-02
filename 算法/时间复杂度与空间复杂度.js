// 时间复杂度
// 下面这段代码，一共会执行多少次？
function traverse(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    console.log(arr[i]);
  }
}

// 第一行代码会被执行一次
// var len = arr.length

// 循环体会执行一次
// console.log(arr[i]);

/**
 * for 循环跑了n次，因此这条语句就会被执行n次。
 * 循环体上面的几个部分我们拆开来看，首先是i的初始化语句：
 * var i = 0
 * 初始化只有一次，因此它也只合被执行1次。
 *
 * 接着是 i<len 这个判断。
 * 在这里有个规律大家可以记下：所有的for循环里，判断语句都会比递增语句多执行一次。在这里，判断语句执行的次数就是n+1。
 * 在往下就是递增语句 i++ 了，它跟随整个循环体，毫无疑问会执行 n 次。
 * 例如把总的执行次数记为 T(n)，下面咱们就可以来做个简单的加法：
 * T(n) = 1 + n + 1 (n+1) + n = 3n + 3
 */

/**
 * 接下来我们看看规模为 n*n 的二维数组的遍历，一共需要执行多少次代码：
 */
function traverse(arr) {
  var outLen = arr.length;

  for (var i = 0; i < outLen; i++) {
    var inLen = arr[i].length;

    for (var j = 0; j < inLen; j++) {
      console.log(arr[i][j]);
    }
  }
}
/**
 * 首先仍然是没有悬念的第一行代码，它只会被执行一次：
 * var outLen = arr.length
 *
 * 接下来我们来看最内层的循环体：
 * console.log(arr[i][j])
 *
 * 因为咱们是两层循环，所以这货会被执行 n*n = n^2 次。
 * 其它语句的计算思路和咱们第一个🌰区别不大
 *
 * 继续来做个求总执行次数 T(n) 的加法看看：
 * T(n) = 1 + 1 + (n+1) + n + n + n + n*(n+1) + n*n + n*n = 3n^2 + 5n + 3
 *
 */
