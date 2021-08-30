
import axios from 'axios'
// function reqListener() {
//   console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();
// oReq.addEventListener('load', reqListener);
// oReq.open('GET', './example.txt');
// oReq.send()

axios.get('http://localhost:3001/get', {
  params: {
    foo: ['bar', 'baz']
  }
}).then(res=>{
  console.log(res);
})

console.log(1);