var express = require('express')
var app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{ 
    res.render('home', {name:'Sid', roll : "1"})
})
    
app.listen(4000, function(){ 
    console.log('Listening to port 4000') 
})