
import axios from 'axios'
// function reqListener() {
//   console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();
// oReq.addEventListener('load', reqListener);
// oReq.open('GET', './example.txt');
// oReq.send()

axios.get('/get', {
  params: {
    a: 1,
    b: 2
  }
})

axios.get('/get', {
  params: {
    foo: ['bar', 'baz']
  }
})

axios.get('/get', {
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/get?foo=bar',
  params: {
    bar: 'baz'
  }
})