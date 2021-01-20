var express = require('express')
var app = express()

app.set('view engine', 'ejs')

//localhost:4000/ GET
app.get('/', (req, res)=>{ 
    console.log("I am in localhost:4000/")
    var data = {name:'Siddharthi', 
                roll : "123"}
    res.render('home.ejs', {data : data})
})
    
//home.ejs ,{data:data} -->home.html

app.listen(4000, function(){ 
    console.log('Listening to port 4000') 
})