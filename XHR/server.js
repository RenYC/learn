const express = require('express');

const app = express();

// app.get('/', (req, res)=>{
//   res.send('Hello World!')
// })

app.use(express.static(__dirname))

app.listen(3001, function(){
  console.log('http://localhost:3001 \n');
})