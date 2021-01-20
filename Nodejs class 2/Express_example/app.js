const express = require('express')
const app = express()
 
//localhost:3000 == localhost:3000/
//HTTP requests get post put delete
//localhost:3000
//localhost:3000/
app.get('/',function(req,res){
    res.send("Bye")
})

app.get('/hi', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000, function(){
    console.log("Listening to port 3000")
})