const express = require('express')
const app = express()
 // localhost:3000/
 //localhost:3000/hi
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/hi', function (req, res) {
  res.send('Hi')
})
 
app.listen(3000)
console.log('Express-Listening to port 3000')