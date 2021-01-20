var express = require('express')
var app = express()
var path = require('path')
var PORT = 3000
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
// app.set('views',path.join(__dirname,'/view'))

//localhost:3000/
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/views/form.html'))
})

//localhost:3000/user
app.post('/user',function(req,res){
    res.render('home',{username: req.body.username})
})
//localhost:3000/profile/sid
//id-->sid
app.get('/profile/:id',function(req,res){
    res.render('profile',{name : req.params.id})
})

app.listen(PORT)
console.log("Listening to "+PORT)