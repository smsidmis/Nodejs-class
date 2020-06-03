var express = require('express') 
var app = express()
var PORT = 4000

app.get('/user/:id',function(req,res){
    res.send('Welcome '+req.params.id)
})

app.listen(PORT)
console.log("Listening to port " + PORT)