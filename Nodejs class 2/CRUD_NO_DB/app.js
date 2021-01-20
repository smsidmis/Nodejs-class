var express = require('express')
var app = express()
var PORT = 4000

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())

var students = ["Harry","Hermoine","Ron"]

//CRUD
//Create -- POST
//Read -- GET
//Update -- PUT
//Delete -- DELETE

//R-Read

//localhost:4000/ === localhost:4000
app.get('/',function(req,res){
    console.log("I am ")
    res.send(students)
})

//C-Create
app.post('/',function(req,res){
    console.log("I am in POST")
    var stud = req.body.name
    console.log(req.body.name)
    students.push(stud)
    res.send("Student saved")
})

//U-UPDATE
//localhost:4000/update/name/0
app.put('/update/name/:id',function(req,res){
    console.log("I am in PUT")
    students[req.params.id] = req.body.name
    res.send("Student Name Updated")
})

//D-DELETE
//localhost:4000/delete/1
app.delete('/delete/:id',function(req,res){
    console.log("I am in DELETE")
    //const index = array.indexOf(5);
    var index = req.params.id
    if (index > -1) {
        students.splice(index, 1)
    }
    res.send("Student deleted")
})

app.listen(PORT,function(){
    console.log("Listening to port "+PORT)
})