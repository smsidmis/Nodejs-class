const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.urlencoded({extended: true}))

//localhost:3000/
app.get('/',function(req,res){
  console.log("localhost:3000/ GET")
  console.log(__dirname)
  console.log('/index.html')
  console.log(path.join(__dirname,'/index.html'))
  res.sendFile(path.join(__dirname,'/index.html'))
})

//localhost:3000/ POST
app.post('/login', function (req, res) {
  console.log("localhost:3000/ POST")
  console.log(req.body.username)
  console.log(req.body.dept)
  console.log(req.body)
  res.send("POST")
})

app.listen(3000, function(){
  console.log('Listening to port 3000')
})

























// a.Create a folder, app.js file and index.html file 
// a.Install necessary packages and Create a server. 
// b.Create GET request and display the html file(a form)
// c.Create POST request, console on terminal and send response.
// d.(OPTIONAL) Update POST request, console on terminal and now send response with the data entered by the user.
// e.Try testing on browser and POSTMAN.