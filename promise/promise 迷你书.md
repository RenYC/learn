# 1. Chapter.1 - 什么是Promise
本章将主要对JavaScript中的Promise进行入门级的介绍。

## 1.1. 什么是Promise

首先让我们来了解一下到底什么是Promise。

Promise是抽象异步处理对象以及对其进行各种操作的组件。其详细内容在接下来我们还会进行介绍，Promise并不是从JavaScript中发现的概念。

Promise最初被提出是在E语言中，它是基于并列/并行处理设计的一种编程语言。

现在JavaScript也拥有了这种特性，这就是本书所介绍的JavaScript Promise。

另外，如果说到基于JavaScript的异步处理，我想大多数都会想到利用回调函数。

---
使用了回调函数的异步处理
```
getAsync("fileA.txt", function(error, result){
  if(error){ // 取得失败时的处理
    throw error;
  }
  // 取得成功时的处理
})
```
<1>传给回调函数的参数为（error对象，执行结果）组合

---

Node.js 等则规定在JavaScript的回调函数的第一个参数为Error对象，这也是他的一个惯例。

而Promise则是把类似的异步处理对象和处理规则进行规范化，并按照采用统一的接口来编写，而采取规定方法之外的写法都会出错。

---
下面是使用了Promise进行异步处理的一个例子
```
var promise = getAsyncPromise("fileA.txt"); 1
promise.then(function(result){
  // 获取文件内容成功时的回调
}).catch(function(error){
  // 获取文件内容失败时的处理
})
```
<1>返回promise对象

---

我们可以向这个预设了抽象化异步处理的promise对象，注册这个promise对象执行成功时和失败时相应的回调函数。

这和回调函数方式相比有哪些不同之处呢？ 在使用promise进行一步处理的时候，我们必须按照接口规定的方法编写处理代码。

也就是说，除promise对象规定的方法(这里的 then 或 catch)以外的方法都是不可以使用的，而不会像回调函数方式那样可以自己自由的定义回调函数的参数，而必须严格遵守固定、统一的编程方式来编写代码。

这样，基于Promise的统一接口的做法， 就可以形成基于接口的各种各样的异步处理模式。

所以，promise的功能是可以将复杂的异步处理轻松地进行模式化， 这也可以说得上是使用promise的理由之一。

接下来，让我们在实践中来学习JavaScript的Promise吧。

---

## 1.2. Promise简介

在 ES6 Promises 标准中定义的API还不是很多。

目前大致有下面三种类型。

**Constructor**

Primose类似于XMLHttpRequest，从构造函数Promise来创建一个新promise对象作为接口。

要想创建要给promsie对象、可以使用new来调用Promise的构造器来进行实例化。
```
var promise = new Promise(function(resolve, reject){
  // 异步处理
  // 处理结束后、调用resolve 或 reject
})
```

**Instance Method**

对通过new生成的promise对象为了设置其值在resolve(成功)/reject(失败)时调用的回调函数 可以使用promise.then()实例方法。
```
promise.then(onFulfilled, onRejected)
```

**resolve(成功)时**  
onFulfilled会被调用

**reject(失败)时**  
onReject会被调用

onFulfilled、onRejected两个都为可选参数。

promise.then成功和失败时都可以使用。另外在只想对异常进行处理时可以采用promise.then(undefined, onRejected)这种方式，只指定reject时的回调函数即可。不过这种情况下promise.catch(onRejected)应该是个更好的选择。
```
promise.catch(onRejected)
```

**Static Method**

像Promise这样的全局对象还拥有一些静态方法。

包括Promise.all()还有Promise.resolve()等在内，主要都是一些对Promise进行操作的辅助方法。

## 1.2.1. Promise workflow

我们先来看一看下面的实例代码。

**promise-workflow.js**
```
function asyncFunction(){
  // 1
  return new Promise(function (resolve, reject){
    setTimeout(function(){
      resolve('Async Hello world')
    }, 16)
  })
}
// 2
asyncFunction().then(function(value){
  console.log(value) // =>'Async Hello world'
}).catch(function(error){
  console.log(error)
})
```
>1 new Promise构造器之后，会返回要给promise对象  
>2 <1>为promise对象用设置.then调用返回值时的回调函数。

asyncFunction这个函数会返回promise对象，对于这个promise对象，我们调用它的then方法来设置resolve后的回调函数，catch方法来设置发生错误的回调函数。

该promise对象会在setTimeout之后的16ms时被resolve，这时then的回调函数会被调用，并输出'Async Hello world'。

在这种情况下 catch 的回调函数并不会被执行（因为promise返回了resolve）， 不过如果运行环境没有提供 setTimeout 函数的话，那么上面代码在执行中就会产生异常，在 catch 中设置的回调函数就会被执行。

当然，像promise.then(onFulfilled, onRejected) 的方法声明一样， 如果不使用catch 方法只使用 then方法的话，如下所示的代码也能完成相同的工作。

当然，像promise.then(onFulfilled, onRejected) 的方法声明一样， 如果不使用catch 方法只使用 then方法的话，如下所示的代码也能完成相同的工作。
```
asyncFunction().then(function (value) {
    console.log(value);
}, function (error) {
    console.log(error);
});
```

## 1.2.2. Promise的状态

我们已经大概了解二了Promise的处理流程，接下来让我们来稍微整理一下Promise的状态。

用new Promise 实例化的promise对象有以下三个状态。

**"has-resolution" - Fulfilled**  
resolve(成功)时。此时会调用onFulfilled

**"has-rejection" - Rejected**  
reject(失败)时。此时会调用onRejected

**"unresolved" - Pending**  
既不是resolve也不是reject的状态。也就是promise对象刚被创建后的初始化状态等

关于上面这三种状态的读法，其中左侧为在ES6 Promise规范中定义的术语，而右侧则是在Promise/A+中描述状态的术语。

基本上状态在代码中是不会涉及到的，所以名称也无需太在意。在这本书中，我们会基于 Promises/A+ 中 Pending 、 Fulfilled 、 Rejected 的状态名称进行讲述。

![ ](http://liubin.org/promises-book/Ch1_WhatsPromises/img/promise-states.png)

到此在本文中我们已经介绍了promise所有的三种状态。

promise对象的状态，从Pending转换为Fulfilled或Rejected之后，这个promise对象的状态就不会再发生任何变化。

也就是说，Promise与Event等不同，在.then 后执行的函数可以肯定地说只会被调用一次。

另外，Fulfilled和Rejected这两个中的任一状态都可以表示为Settled(不变的)。

**Settled**  
resolve(成功) 或 reject(失败)。

从Pending和Settled的对称关系来看，Promise状态的种类/迁移是非常简单易懂的。

当promise的对象状态发生变化时，用.then 来定义只会被调用一次的函数。

## 1.3. 编写Promise代码
这里我们来介绍一下如何编写Promise代码。

### 1.3.1. 创建promise对象
创建promise对象的流程如下所示。

1. new Promise(fn) 返回一个promise对象
2. 在fn 中指定异步等处理
     * 处理结果正常的话，调用resolve(处理结果值)
     * 处理结果错误的话，调用reject(Error对象)

按这个流程我们来实际编写下promise代码吧。

我们的任务是用Promise来通过异步处理方式来获取XMLHttpRequest(XHR)的数据。

## 创建XHR的promise对象

首先，创建一个用Promise把XHR处理包装起来的名为getURL的函数。
```
function getURL(URL) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.onload = function(){
      if(req.status === 200) {
        resolve(req.respnseText)
      }else{
        reject(new Error(req.statusText))
      }
    }
    req.onerror = function() {
      reject(new Error(req.statusText))
    }
    req.send()
  })
}
// 运行示例
var URL = "http://httpbin.org/get";
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.error(error);
});
```
getURL只有在通过XHR取得结果状态为200时才会调用resolve-也就是只有数据取得成功时，而其他情况（取得失败）时则会调用reject方法。

resolve(req.reponseText)在response的内容中加入了参数。resolve方法的参数并没有特别的规则，基本上行把要传给回调函数参数放进去就可以了。（then方法可以接收到这个参数值）

熟悉Node.js的人，经常会在写回调函数时将 callback(error, response) 的第一个参数设为error对象，而在Promise中resolve/reject则担当了这个职责（处理正常和异常的情况），所以 在resolve方法中只传一个response参数是没有问题的。

接下来我们来看一下reject函数。

XHR中 onerror 事件被触发的时候就是发生错误时，所以理所当然调用reject。 这里我们重点来看一下传给reject的值。

发生错误时要像这样 reject(new Error(req.statusText)); 创建一个Error对象后再将具体的值传进去。传给reject 的参数也没有什么特殊的限制，一般只要是Error对象（或者继承自Error对象）就可以。

传给reject 的参数，其中一般是包含了reject原因的Error对象。本次因为状态值不等于200而被reject，所以reject 中放入的是statusText。（这个参数的值可以被 then 方法的第二个参数或者 catch 方法中使用）

## 1.3.2. 编写promise对象处理方法
让我们在实际中使用一下刚才创建的返回promise对象的函数
```
getURL("http://example.com/"); // => 返回promise对象
```
如Promises Overview 中做的简单介绍一样，promise对象拥有几个实例方法，我们使用这些实例方法来为promise对象创建依赖于promise的具体状态、并且只会被执行一次的回调函数。

为promise对象添加处理方法主要有以下两种  
- promise对象被 resolve 时的处理(onFulfilled)
- promise对象被 reject 时的处理(onRejected)  
![](http://liubin.org/promises-book/Ch1_WhatsPromises/img/promise-onFulfilled_onRejected.png)

**Figure 2. promise value flow**

首先，我们来尝试一下为 getURL 通信成功并取到值时添加的处理函数。

此时所谓的 通信成功 ， 指的就是在被resolve后， promise对象变为FulFilled状态。

被resolve后的处理，可以在.then 方法中传入想要调用的函数。
```
var URL = "http://httpbin.org/get";
getURL(URL).then(function onFulfilled(value){ // 1
    console.log(value);
});
// 1 为了方便理解我们把函数命名为 onFulfilled
```
getURL函数 中的 resolve(req.responseText); 会将promise对象变为resolve（Fulfilled）状态，同时使用其值调用 onFulfilled 函数。

不过目前我们还没有对其中可能发生的错误做任何处理， 接下来，我们就来为 getURL 函数添加发生错误时的异常处理。

此时 发生错误 ， 指的也就是reject后 promise对象变为Rejected状态。

被reject后的处理，可以在.then 的第二个参数 或者是在 .catch 方法中设置想要调用的函数。

把下面reject时的处理加入到刚才的代码，如下所示。
```
var URL = "http://httpbin.org/status/500"; // 1
getURL(URL).then(function onFulfilled(value){
  console.log(value);
}).catch(function onRejected(error){ // 2
    console.error(error);
});

// 1 服务端返回的状态码为500
// 2 为了方便理解函数被命名为 onRejected
```
在getURL 的处理中发生任何异常，或者被明确reject的情况下，该异常原因（Error对象）会作为 .catch 方法的参数被调用。

其实 .catch只是 promise.then(undefined, onRejected) 的别名而已， 如下代码也可以完成同样的功能。
```
getURL(URL).then(onFulfilled, onRejected);
// onFulfilled, onRejected 是和刚才相同的函数
```
一般说来，使用.catch来将resolve和reject处理分开来写是比较推荐的做法， 这两者的区别会在then和catch的区别中再做详细介绍。

**总结**
在本章我们简单介绍了以下内容：
- 用 new Promise 方法创建promise对象
- 用.then 或 .catch 添加promise对象的处理函数

到此为止我们已经学习了Promise的基本写法。 其他很多处理都是由此基本语法延伸的，也使用了Promise提供的一些静态方法来实现。

实际上即使使用回调方式的写法也能完成上面同样的工作，，而使用Promise方式的话有什么优点么？在本小节中我们没有讲到两者的对比及Promise的优点。在接下来的章节中，我们将会对Promise优点之一，即错误处理机制进行介绍，以及和传统的回调方式的对比。

---

# 2. Chapter.2 - 实战Promise
本章我们将会学习Promise提供的各种方法以及如何进行错误处理。

## 2.1. Promise.resolve
一般情况下我们都会使用 new Promise() 来创建promise对象，但是除此之外我们也可以使用其他方法。

在这里，我们将会学习如何使用 Promise.resolve 和 Promise.reject这两个方法。

### 2.1.1. new Promise的快捷方式
静态方法Promise.resolve(value) 可以认为是 new Promise() 方法的快捷方式。

比如 Promise.resolve(42); 可以认为是以下代码的语法糖。
```
new Promise(function(resolve){
  resolve(42)
})
```
在这段代码中的 resolve(42); 会让这个promise对象立即进入确定（即resolved）状态，并将 42 传递给后面then里所指定的 onFulfilled 函数。

方法 Promise.resolve(value); 的返回值也是一个promise对象，所以我们可以像下面那样接着对其返回值进行 .then 调用。
```
Promise.resolve(42).then(function(value){
  console.log(value)
})
```
Promise.resolve作为new Promise()的快捷方式，在进行promise对象的初始化或者编写测试代码的时候都非常方便。

### 2.1.2. Thenable
Promise.resolve方法另一个作用就是将taenable对象转换为promise对象。

ES6 Promise里提到了Thenable这个概念，简单来说它就是一个非常类似promise的东西。

就像我们有时称具有.length方法的非数组对象为Array like一样，thenable指的是一个具有.then方法的对象。

这种将thenable对象转换为promise对象的机制要求thenable对象所拥有的 then 方法应该和Promise所拥有的 then 方法具有同样的功能和处理过程，在将thenable对象转换为promise对象的时候，还会巧妙的利用thenable对象原来具有的 then 方法。

到底什么样的对象能算是thenable的呢，最简单的例子就是 jQuery.ajax()，它的返回值就是thenable的。

因为jQuery.ajax() 的返回值是 jqXHR Object 对象，这个对象具有 .then 方法。
```
$.ajax('/json/comment.json'); // => 拥有 `.then` 方法的对象
```
这个thenable的对象可以使用 Promise.resolve 来转换为一个promise对象。

变成了promise对象的话，就能直接使用 then 或者 catch 等这些在 ES6 Promises里定义的方法了。

**将thenable对象转换promise对象**
```
var promise = Promise.resolve($.ajax('/json/comment.json'));// => promise对象
promise.then(function(value){
   console.log(value);
});
```
Promise.resolve 只使用了共通的方法 then ，提供了在不同的类库之间进行promise对象互相转换的功能。

这种转换为thenable的功能在之前是通过使用 Promise.cast 来完成的，从它的名字我们也不难想象它的功能是什么。

除了在编写使用Promise的类库等软件时需要对Thenable有所了解之外，通常作为end-user使用的时候，我们可能不会用到此功能。

简单总结一下 Promise.resolve 方法的话，可以认为它的作用就是将传递给它的参数填充（Fulfilled）到promise对象后并返回这个promise对象。

此外，Promise的很多处理内部也是使用了 Promise.resolve 算法将值转换为promise对象后再进行处理的。

---

## 2.2. Promise.reject
Promise.reject(error)是和 Promise.resolve(value) 类似的静态方法，是new Promise() 方法的快捷方式。

比如 Promise.reject(new Error("出错了")) 就是下面代码的语法糖形式。
```
new Promise(function(resolve,reject){
    reject(new Error("出错了"));
});
```
这段代码的功能是调用该promise对象通过then指定的 onRejected 函数，并将错误（Error）对象传递给这个 onRejected 函数。
```
Promise.reject(new Error("BOOM!")).catch(function(error){
    console.error(error);
});
```
它和Promise.resolve(value) 的不同之处在于promise内调用的函数是reject而不是resolve，这在编写测试代码或者进行debug时，说不定会用得上。

---

## 2.3. 专栏: Promise只能进行异步操作？
在使用Promise.resolve(value) 等方法的时候，如果promise对象立刻就能进入resolve状态的话，那么你是不是觉得 .then 里面指定的方法就是同步调用的呢？

实际上， .then 中指定的方法调用是异步进行的。
```
var promise = new Promise(function (resolve){
    console.log("inner promise"); // 1
    resolve(42);
});
promise.then(function(value){
    console.log(value); // 3
});
console.log("outer promise"); // 2
```
执行上面的代码会输出下面的log，从这些log我们清楚地知道了上面代码的执行顺序。
```
inner promise // 1
outer promise // 2
42            // 3
```
由于JavaScript代码会按照文件的从上到下的顺序执行，所以最开始 <1> 会执行，然后是 resolve(42); 被执行。这时候 promise 对象的已经变为确定状态，FulFilled被设置为了 42 。

下面的代码 promise.then 注册了 <3> 这个回调函数，这是本专栏的焦点问题。

由于 promise.then 执行的时候promise对象已经是确定状态，从程序上说对回调函数进行同步调用也是行得通的。

但是即使在调用 promise.then 注册回调函数的时候promise对象已经是确定的状态，Promise也会以异步的方式调用该回调函数，这是在Promise设计上的规定方针。

因此 <2> 会最先被调用，最后才会调用回调函数 <3> 。

为什么要对明明可以以同步方式进行调用的函数，非要使用异步的调用方式呢？

### 2.3.1. 同步调用和异步调用同时存在导致的混乱
其实在Promise之外也存在这个问题，这里我们以一般的使用情况来考虑此问题。

这个问题的本质是接收回调函数的函数，会根据具体的执行情况，可以选择是以同步还是异步的方式对回调函数进行调用。

下面我们以 onReady(fn) 为例进行说明，这个函数会接收一个回调函数进行处理。
```
// mixed-onready.js
function onReady(fn) {
  var readyState = document.readyState;
  if (readyState === 'interactive' || readyState === 'complete') {
    fn();
  } else {
    window.addEventListener('DOMContentLoaded', fn);
  }
}
onReady(function () {
  console.log('DOM fully loaded and parsed');
});
console.log('==Starting==');
```
mixed-onready.js会根据执行时DOM是否已经装载完毕来决定是对回调函数进行同步调用还是异步调用。

**如果在调用onReady之前DOM已经载入的话**  
- 对回调函数进行同步调用

**如果在调用onReady之前DOM还没有载入的话**
- 通过注册 DOMContentLoaded 事件监听器来对回调函数进行异步调用

因此，如果这段代码在源文件中出现的位置不同，在控制台上打印的log消息顺序也会不同。

为了解决这个问题，我们可以选择统一使用异步调用的方式。
```
// async-onready.js
function onReady(fn) {
  var readyState = document.readyState;
  if (readyState === 'interactive' || readyState === 'complete') {
    setTimeout(fn, 0);
  } else {
    window.addEventListener('DOMContentLoaded', fn);
  }
}
onReady(function () {
  console.log('DOM fully loaded and parsed');
});
console.log('==Starting==');
```
关于这个问题，在 Effective JavaScript 的 第67项 不要对异步回调函数进行同步调用 中也有详细介绍。
- 绝对不能对异步回调函数（即使在数据已经就绪）进行同步调用。
- 如果对异步回调函数进行同步调用的话，处理顺序可能会与预期不符，可能带来意料之外的后果。
- 对异步回调函数进行同步调用，还可能导致栈溢出或异常处理错乱等问题。
- 如果想在将来某时刻调用异步回调函数的话，可以使用 setTimeout 等异步API。

前面我们看到的 promise.then 也属于此类，为了避免上述中同时使用同步、异步调用可能引起的混乱问题，Promise在规范上规定 Promise只能使用异步调用方式 。

最后，如果将上面的 onReady 函数用Promise重写的话，代码如下面所示。
```
// onready-as-promise.js
function onReadyPromise() {
  return new Promise(function(resolve, reject){
    var readyState = document.redayState;
    if(readyState === 'interactive' || readyState === 'complete'){
      resolve();
    }else{
      window.addEventListener('DOMContentLoaded', resolve);
    }
  })
}
onReadyPromise().then(function () {
  console.log('DOM fully loaded and parsed');
});
console.log('==Starting==');
```
由于Promise保证了每次调用都是以异步方式进行的，所以我们在实际编码中不需要调用 setTimeout 来自己实现异步调用。

---

## 2.4. Promise#then
在前面的章节里我们对Promise基本的实例方法 then 和 catch 的使用方法进行了说明。

这其中，我想大家已经认识了 .then().catch() 这种链式方法的写法了，其实在Promise里可以将任意个方法连在一起作为一个方法链（method chain）。

**promise可以写成方法链的形式**
```
aPromise.then(function taskA(value){
  // task A
}).then(function taskB(value){
  // task B
}).catch(function onRejected(error){
  console.log(error)
})
```
如果把在then中注册的每个回调函数称为task的话，那么我们就可以通过Promise方法链方式来编写能以taskA → task B 这种流程进行处理的逻辑了。

Promise方法链这种叫法有点长（其实是在日语里有点长，中文还可以 --译者注），因此后面我们会简化为 promise chain 这种叫法。

Promise之所以适合编写异步处理较多的应用，promise chain可以算得上是其中的一个原因吧。

在本小节，我们将主要针对使用 then 的promise chain的行为和流程进行学习。

### 2.4.1. promise chain
在第一章 promise chain 里我们看到了一个很简单的 then → catch 的例子，如果我们将方法链的长度变得更长的话，那在每个promise对象中注册的onFulfilled和onRejected将会怎样执行呢？
>promise chain - 即方法链越短越好。 在这个例子里我们是为了方便说明才选择了较长的方法链。

我们先来看看下面这样的promise chain。

promise-then-catch-flow.js
```
function taskA() {
    console.log("Task A");
}
function taskB() {
    console.log("Task B");
}
function onRejected(error) {
    console.log("Catch Error: A or B", error);
}
function finalTask() {
    console.log("Final Task");
}
var promise = Promise.resolve();
promise.then(taskA).then(taskB).catch(onRejected).then(finealTask)
```
上面代码中的promise chain的执行流程，如果用一张图来描述一下的话，像下面的图那样。
![Figure 3. promise-then-catch-flow.js附图](http://liubin.org/promises-book/Ch2_HowToWrite/img/promise-then-catch-flow.png)

在 上述代码 中，我们没有为 then 方法指定第二个参数(onRejected)，也可以像下面这样来理解。

**then**
- 注册onFulfilled时的回调函数
  
**catch**
- 册onRejected时的回调函数

再看一下 上面的流程图 的话，我们会发现 Task A 和 Task B 都有指向 onRejected 的线出来。

这些线的意思是在 Task A 或 Task B 的处理中，在下面的情况下就会调用 onRejected 方法。
- 发生异常的时候
- 返回了一个Rejected状态的promise对象

在 第一章 中我们已经看到，Promise中的处理习惯上都会采用 try-catch 的风格，当发生异常的时候，会被 catch 捕获并被由在此函数注册的回调函数进行错误处理。

另一种异常处理策略是通过返回一个Rejected状态的promise对象 来实现的，这种方法不通过使用 throw 就能在promise chain中对 onRejected 进行调用。

关于这种方法由于和本小节关系不大就不在这里详述了，大家可以参考一下第4章 使用reject而不是throw 中的内容。

此外在promise chain中，由于在 onRejected 和 Final Task 后面没有 catch 处理了，因此在这两个Task中如果出现异常的话将不会被捕获，这点需要注意一下。

面我们再来看一个具体的关于 Task A → onRejected 的例子。

**Task A产生异常的例子**

ask A 处理中发生异常的话，会按照TaskA → onRejected → FinalTask 这个流程来进行处理。
![Figure 4. Task A产生异常时的示意图](http://liubin.org/promises-book/Ch2_HowToWrite/img/promise-taska-rejected-flow.png)

将上面流程写成代码的话如下所示。

promise-then-taska-throw.js
```
function taskA() {
    console.log("Task A");
    throw new Error("throw Error @ Task A")
}
function taskB() {
    console.log("Task B");// 不会被调用
}
function onRejected(error) {
    console.log(error);// => "throw Error @ Task A"
}
function finalTask() {
    console.log("Final Task");
}
var promise = Promise.resolve();
promise
    .then(taskA)
    .then(taskB)
    .catch(onRejected)
    .then(finalTask);
```
执行这段代码我们会发现 Task B 是不会被调用的。

>在本例中我们在taskA中使用了 throw 方法故意制造了一个异常。但在实际中想主动进行onRejected调用的时候，应该返回一个Rejected状态的promise对象。关于这种两种方法的异同，请参考 使用reject而不是throw 中的讲解。

### 2.4.2. promise chain 中如何传递参数
前面例子中的Task都是相互独立的，只是被简单调用而已。

这时候如果 Task A 想给 Task B 传递一个参数该怎么办呢？

答案非常简单，那就是在 Task A 中 return 的返回值，会在 Task B 执行时传给它。

我们还是先来看一个具体例子吧。

promise-then-passing-value.js
```
function doubleUp(value) {
    return value * 2;
}
function increment(value) {
    return value + 1;
}
function output(value) {
    console.log(value);// => (1 + 1) * 2
}

var promise = Promise.resolve(1);
promise
    .then(increment)
    .then(doubleUp)
    .then(output)
    .catch(function(error){
        // promise chain中出现异常的时候会被调用
        console.error(error);
    });
```
这段代码的入口函数是 Promise.resolve(1); ，整体的promise chain执行流程如下所示。
1. Promise.resolve(1); 传递 1 给 increment 函数
2. 函数 increment 对接收的参数进行 +1 操作并返回（通过return）
3. 这时参数变为2，并再次传给 doubleUp 函数
4. 最后在函数 output 中打印结果

![figure 5. promise-then-passing-value.js示意图](http://liubin.org/promises-book/Ch2_HowToWrite/img/promise-then-passing-value.png)

每个方法中 return 的值不仅只局限于字符串或者数值类型，也可以是对象或者promise对象等复杂类型。

return的值会由 Promise.resolve(return的返回值);  进行相应的包装处理，因此不管回调函数中会返回一个什么样的值，最终 then 的结果都是返回一个新创建的promise对象。

>关于这部分内容可以参考 专栏: 每次调用then都会返回一个新创建的promise对象 ，那里也对一些常见错误进行了介绍。

也就是说， Promise#then 不仅仅是注册一个回调函数那么简单，它还会将回调函数的返回值进行变换，创建并返回一个promise对象。

---

### 2.5. Promise#catch
在 前面的Promise#then 的章节里，我们已经简单地使用了 Promise#catch 方法。

这里我们再说一遍，实际上 Promise#catch 只是promise.then(undefined, onRejected); 方法的一个别名而已。也就是说，这个方法用来注册当promise对象状态变为Rejected时的回调函数。

>关于如何根据场景使用 Promise#then 和 Promise#catch 可以参考 then or catch? 中介绍的内容。

### 2.5.1. IE8的问题
![](http://liubin.org/promises-book/Ch2_HowToWrite/img/promise-catch-error.png)

上面的这张图，是下面这段代码在使用 polyfill 的情况下在个浏览器上执行的结果。
>polyfill是一个支持在不具备某一功能的浏览器上使用该功能的Library。这里我们使用的例子则来源于 jakearchibald/es6-promise 。

Promise#catch的运行结果
```
var promise = Promise.reject(new Error("message"));
promise.catch(function (error) {
    console.error(error);
});
```
如果我们在各种浏览器中执行这段代码，那么在IE8及以下版本则会出现 identifier not found 的语法错误。

这是怎么回事呢？ 实际上这和 catch 是ECMAScript的 保留字 (Reserved Word)有关。

在ECMAScript 3中保留字是不能作为对象的属性名使用的。  而IE8及以下版本都是基于ECMAScript 3实现的，因此不能将 catch 作为属性来使用，也就不能编写类似 promise.catch() 的代码，因此就出现了 identifier not found 这种语法错误了。

而现在的浏览器都是基于ECMAScript 5的，而在ECMAScript 5中保留字都属于 IdentifierName ，也可以作为属性名使用了。
>在ECMAScript5中保留字也不能作为 Identifier 即变量名或方法名使用。如果我们定义了一个名为 for 的变量的话，那么就不能和循环语句的 for 区分了。 而作为属性名的话，我们还是很容易区分 object.for 和 for 的，仔细想想我们就应该能接受将保留字作为属性名来使用了。

当然，我们也可以想办法回避这个ECMAScript 3保留字带来的问题。

点标记法（dot notation） 要求对象的属性必须是有效的标识符（在ECMAScript 3中则不能使用保留字），

但是使用 中括号标记法（bracket notation）的话，则可以将非合法标识符作为对象的属性名使用。

也就是说，上面的代码如果像下面这样重写的话，就能在IE8及以下版本的浏览器中运行了（当然还需要polyfill）。

**解决Promise#catch标识符冲突问题**
```
var promise = Promise.reject(new Error("message"));
promise["catch"](function (error) {
    console.error(error);
});
```
或者我们不单纯的使用 catch ，而是使用 then 也是可以避免这个问题的。

**使用Promise#then代替Promise#catch**
```
var promise = Promise.reject(new Error("message"));
promise.then(undefined, function (error) {
    console.error(error);
});
```
由于 catch 标识符可能会导致问题出现，因此一些类库（Library）也采用了 caught 作为函数名，而函数要完成的工作是一样的。

而且很多压缩工具自带了将 promise.catch 转换为 promise["catch"] 的功能，所以可能不经意之间也能帮我们解决这个问题。

如果各位读者需要支持IE8及以下版本的浏览器的话，那么一定要将这个 catch 问题牢记在心中。

---

## 2.6. 专栏: 每次调用then都会返回一个新创建的promise对象
从代码上乍一看， aPromise.then(...).catch(...) 像是针对最初的 aPromise 对象进行了一连串的方法链调用。

然而实际上不管是 then 还是 catch 方法调用，都返回了一个新的promise对象。

下面我们就来看看如何确认这两个方法返回的到底是不是新的promise对象。
```
var aPromise = new Promise(function (resolve) {
    resolve(100);
});
var thenPromise = aPromise.then(function (value) {
    console.log(value);
});
var catchPromise = thenPromise.catch(function (error) {
    console.error(error);
});
console.log(aPromise !== thenPromise); // => true
console.log(thenPromise !== catchPromise);// => true
```
=== 是严格相等比较运算符，我们可以看出这三个对象都是互不相同的，这也就证明了 then 和 catch 都返回了和调用者不同的promise对象。
![](http://liubin.org/promises-book/Ch2_HowToWrite/img/then_catch.png)

我们在对Promise进行扩展的时候需要牢牢记住这一点，否则稍不留神就有可能对错误的promise对象进行了处理。

如果我们知道了 then 方法每次都会创建并返回一个新的promise对象的话，那么我们就应该不难理解下面代码中对 then 的使用方式上的差别了。
```
// 1: 对同一个promise对象同时调用 `then` 方法
var aPromise = new Promise(function (resolve) {
    resolve(100);
});
aPromise.then(function (value) {
    return value * 2;
});
aPromise.then(function (value) {
    return value * 2;
});
aPromise.then(function (value) {
    console.log("1: " + value); // => 100
})

// vs

// 2: 对 `then` 进行 promise chain 方式进行调用
var bPromise = new Promise(function (resolve) {
    resolve(100);
});
bPromise.then(function (value) {
    return value * 2;
}).then(function (value) {
    return value * 2;
}).then(function (value) {
    console.log("2: " + value); // => 100 * 2 * 2
});
```
第1种写法中并没有使用promise的方法链方式，这在Promise中是应该极力避免的写法。这种写法中的 then 调用几乎是在同时开始执行的，而且传给每个 then 方法的 value 值都是 100 。

第2中写法则采用了方法链的方式将多个 then 方法调用串连在了一起，各函数也会严格按照 resolve → then → then → then 的顺序执行，并且传给每个 then 方法的 value 的值都是前一个promise对象通过 return 返回的值。

下面是一个由方法1中的 then 用法导致的比较容易出现的很有代表性的反模式的例子。

**✘ then 的错误使用方法**
```
function badAsyncCall() {
  var promise = Promise.resolve();
  promise.then(function() {
      // 任意处理
      return newVar;
  });
  return promise;
}
```
这种写法有很多问题，首先在 promise.then 中产生的异常不会被外部捕获，此外，也不能得到 then 的返回值，即使其有返回值。

由于每次 promise.then 调用都会返回一个新创建的promise对象，因此需要像上述方式2那样，采用promise chain的方式将调用进行链式化，修改后的代码如下所示。

**then 返回返回新创建的promise对象**
```
function anAsyncCall() {
  var promise = Promise.resolve();
  return promise.then(function() {
    // 任意处理
    return newVar;
  })
}
```
关于这些反模式，详细内容可以参考 Promise Anti-patterns 。

这种函数的行为贯穿在Promise整体之中，包括我们后面要进行说明的 Promise.all 和 Promise.race，他们都会接收一个promise对象为参数，并返回一个和接收参数不同的、新的promise对象。

---


