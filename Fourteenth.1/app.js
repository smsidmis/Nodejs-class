var express = require('express')
var app = express()
var path = require('path')
var PORT = 3000
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/views/form.html'))
})

app.post('/user',function(req,res){
    res.render('home',{username: req.body.username})
})

app.get('/profile/:id',function(req,res){
    res.render('profile',{name : req.params.id})
})

app.listen(PORT)
console.log("Listening to "+PORT)