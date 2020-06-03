const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static(__dirname))

// app.get('/', function (req, res) {
//   res.render('index')
// })

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html')
})

app.post('/', function (req, res) {
  console.log(req.body.username)
  res.send("New")
})

app.listen(3000)
console.log('Express-Listening to port 3000')