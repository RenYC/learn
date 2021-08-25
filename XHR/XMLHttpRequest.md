XMLHttpRequest(XHR)对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。XMLHttpRequest 在 AJAX 编程中被大量使用。

XMLHttpRequest -> XMLHttpRequestEventTarget -> EventTarget

尽管名称如此，XMLHttpRequest 可以用于获取任何类型的数据，而不仅仅是 XML。它甚至支持 HTTP 以外的协议（包括 file:// 和 FTP）, 尽管可能受到更多安全等原因的限制。

如果您的通信流程需要从服务器接收事件或消息数据，请考虑通过 EventSource 接口使用 server-sentevents。对于全双工的通信，WebSocket 可能是更好的选择。


## 构造函数

XMLHttpRequest()  
该构造函数用于初始化一个 XMLHttpRequest 实例对象。在调用下列任何其他方法之前，必须先调用该构造函数，或通过其他方式，得到一个实例对象。

## 属性

此接口继承了 XMLHttpRequestEventTarget 和 EventTarget 的属性。

- XMLHttpRequest.onreadystatechange  
  当 readyState 属性发送变化时，调用的 event handler。

- XMLHttpRequest.readyState 只读  
  返回一个无符号短整型数字，代表请求的状态吗。

* XMLHttpRequest.response 只读  
  返回一个 ArrayBuffer、Blob、Document，或DOMString，具体是哪种类型取决于 XMLHttpRequest.responseType 的值。其中包含整个响应实体。

* XMLHttpRequest.responseText 只读  
  返回一个 DOMString，该 DOMString 包含对请求的响应，如果请求未成功或尚未发送，则返回null。

* XMLHttpRequest.responseType  
  一个用域定义响应类型的枚举值。

