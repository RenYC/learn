Tasks, microtasks, queues and schedules

## Try it
首先来看一段JavaScript的程序，及其输出的顺序
```
console.log('script start');
 
setTimeout(function() {
  console.log('setTimeout');
}, 0);
 
Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
 
console.log('script end');
```

```
script start
script end
promise1
promise2
setTimeout
```

正确答案是 script start, script end, promise1, promise2, setTimeout

原文中提到可能浏览器的差异 可能setTimeout 会在 promise1 与 promise2之前打印，在firefox与Safari 8.0.7中总是正确的。（非原文：浏览器的差异本文中不考虑，具体查看原文）。

## Why this happens
要理解这一点，您需要知道事件循环（event loop）如何处理任务和微任务。当你第一次遇到它的时候，你可能会有很多的想法。请保持呼吸......

每个“线程”都有自己的事件循环（event loop），因此每个web worker都有自己的事件循环（event loop），因此它可以独立执行，然而，同源上的所有windows窗口都共享一个事件循环（even t loop）,保证它们可以同步通信。事件循环（event loop）持续执行队列中的任何任务。事件循环（event loop）可以有多个任务源，页可需确保各个任务源的执行讯息（IndexedDB等规范定义了它们自己的执行讯息），但是浏览器可以决定在循环的每个回合中选择哪个源来执行任务（非本文：回答为什么会有不同的执行循序）。这允许浏览器优先处理性能敏感的任务，比如用户输入等。

Task任务被调度，这样浏览器就可以从内部获取Javascript/DOM，并确保这些操作按顺序发生。在任务之间，浏览器可能呈现更新。从鼠标单击到事件回调需要调度任务，解析HTML以及上述setTimeout一样。setTimeout等待一个给定的延迟，然后为它的回调安排一个新的任务。这就是为什么在script end后打印 setTimeout，因为打印script end是第一个任务的一部分，并且setTimeout记录在一个单独的任务中。

Micro Task 微任务通常被安排在当前执行脚本之后应该立即发生的事情上，例如对一批操作做出反应，或者使某些东西异步执行，而不需要承担整个新任务的代价。只要没有其他Javascript在执行过程中，并且在每个任务的末尾，微任务队列在回调之后被处理。在微任务期间排队等待的任何其他微任务都被添加到队列的末尾并被处理。微任务包括mutation observer回调，promise 回调等。一旦一个 promise 设定了，或者它已经resolve，就把它加入microTask队列中。这确保了 promise 回调时异步的，即使 promise 已经resolve。调用 .then(yey, nay)让promise任务立即步入 microTask的任务队列中。这就是为什么promise1和promise2会在 script end 之后被打印，因为当前运行的脚本必须在微任务处理之前完成。promise1和promise2在setTimeout之前被打印，因为微任务总是在下一个任务之前发生。

## STEPS
一步一步的图示

console.log('script start')

|Tasks|Run script|
|---|---|
|Micro Tasks||
|JS stack|script|
|log|script start|

setTimeout的回调会被加入到Task中,promise 回调加入到Microtasks中

console.log('script end')
|Tasks|Run script setTimeout-callback|
|---|---|
|Micro Tasks|promise then|
|JS stack||
|Log|script start script end|

打印 script end，已经到最后一行代码了 JS stack 中执行完成，开始执行 micro task Run script 一致存在一直在当前任务执行完成后。 

执行 microTask 任务
|Tasks|Run script setTimeout callback|
|---|---|
|MicroTasks|promise then promise then|
|JS stack|promise callback|
|Log|script start script end promise1|

执行完成第一个promise 后return undefined，继续 将下一个promise callback加入micro task

|Tasks|Run script setTimeout callback|
|---|---|
|Micro Tasks|promise then|
|JS stack||
|log|script start script end promise1|
执行完之后清空

重复以上步骤，执行完promise then 打印 promise2 后
|Tasks|Run script setTimeout callback|
|---|---|
|Micro Tasks||
|JS stack||
|Log|script start script end promise1 promise2|

上面提到过：微任务总是在下一个任务之前发生。所有的微任务执行完成后，在执行下一个任务之前（例如，浏览器预备重新渲染之前）此时第一个RunScript的任务也即是执行完成了。

接下来继续分析另外一段代码
```
<div class="outer">
  <div class="inner"></div>
</div>
```

```
// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function(){
  console.log('mutate')
}).observe(outer, {
  attribute: true
})

// here's a click listener...
function onClick(){
  console.log('click)

  setTimeout(function(){
    console.log('timeout)
  }, 0);

  Promise.resolve().then(function(){
    console.log('promise)
  })

  outer.setAttribute('data-random', Math.random())
}


// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
```
mutationObser主要用来监听DOM的变动，callback会在每次DOM变动后调用，observe中第一个参数表示监听的DOM元元的article 第二个表示变动的类型 attribute：true表示监听属性的变动；前文提到过mutationObserve也是microTask。

继续分析下:触发click事件，setTimeout  是tasks,  mutation observe和 promise是microtasks
|Tasks|Dispatch click setTimeout callback|
|---|---|
|Micro Tasks|promise then Mutationobservers|
|JS stack|onClick|
|Log|click|

触发事件后，接收JS stack当前为onClick，分析onClick函数中的代码执行将任务分配如下，console.log直接执行，
输出clickpromise加入microtasks,修改DOM后mutationObserver的任务也会加入到microtask中

onClick已经执行完，微任务总是在下一个任务之前发生
|Tasks|Dispatch click setTimeout callback|
|---|---|
|MicroTasks||
|JS stack||
|Log|click promise mutate|

在JS stack为空的时候执行下一个任务前执行 micro task，具体分析如上

但是由于冒泡的原因 会再次的onClick回调
|Tasks|Dispatch click setTimeout callback|
|---|---|
|Micro Tasks|promise then mutation observers|
|JS stack|onClick|
|Log|click promise mutate click|

注意新加的setTimeout callback

|Tasks|Dispatch click setTimeout callback setTimeout callback|
|---|---|
|Micro Tasks||
|JS stack||
|Log|click promise mutate click promise mutate|

执行逻辑同上

|Tasks||
|---|---|
|Micro Tasks||
|JS stack||
|Log|click promise mutate click promise mutate timeout timeout|

没有微任务会继续执行下一个任务

加深了印象之后进一步的深入

inner.click

注意直接click 的时候与Run Script是同步的，之前的是runScript之后dispatch click; 在JS stack为空的时候执行下一个任务前执行micro task
|Tasks|Run script setTimeout callback|
|---|---|
|JS stack|script onClick|
|log|click|

在执行完innerClick后，此时stak并没有空，冒泡 会触发另一个onClick，此时仍然是在Run Script阶段 mutation observer已经pending无法加入再次加入microtask

一切只有当同步的执行完之后，run script结束 JS stack为空去执行下一个任务时会清空microtask中的任务。

## You made it!
总结：

1. Tasks按顺序执行，浏览器可以在两个任务之间进行渲染
2. microTasks按下规则执行：
   1. 在所有回调执行完成（如：冒泡时会触发两次回调），并且在没有其他的Javascript在运行中的时候
   2. 在最后一个任务的最后



