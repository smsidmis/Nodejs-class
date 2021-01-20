const express = require('express') 
const app = express()
const PORT = 4000
//localhost:4000/user/sid
//http://localhost:4000/user/514?name=Sid&dept=IT&pen=Mini
app.get('/user/:id', function(req,res){
    console.log(req.params)
    console.log(req.query)
    res.send('Welcome '+req.params.id + " " + req.query.pen)
})

app.listen(PORT, function(){
    console.log("Listening to port " + PORT)
})