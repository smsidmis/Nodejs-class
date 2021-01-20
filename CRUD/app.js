//express package for starting server
const express = require('express')
const app = express()
const PORT = 4000

//for getting inputs in form field in html to app.js and saving in req.body
//for parsing data in inputs from urlencoded form to readable-string form
const bodyParser = require('body-parser')
//app.use() function makes it available for all the functions in the entire app.js file
app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())

//Connection to Database
//DB
var mongoose = require('mongoose')
//mongoose.set('useFindAndModify',false)

//one cluster can have multiple database.
//one database can have multiple collections.
//one collection can have multiple JSON objects
//using this connection url when u fill database name you connect to one database in that cluster
//syntax for connection to mongodb atlas
// mongoose.connect('', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("Successful"))
// .catch((err) => console.log("Unsuccessful",err))

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log("Successful"))
.catch((err) => console.log("Unsuccessful",err))

//defining structure for the JSON objects in the collection in the database that you connected to using connection url
var studSchema = new mongoose.Schema({
    name : String,
    age: Number,
    dept: String
})

//defining studModel using studCollection and giving it the studSchema
//model is defined so that we can make use of it to store JSON objects in collection
//here studModel will have the structure of studSchema,that is, it will have { name: String } structure
//date : {type: Date, default : Date.now}
var studModel = mongoose.model('studCollection', studSchema)
//CRUD operations
// C- create -- POST
// R- read -- GET
// U- update -- PUT
// D- delete -- DELETE HTTP METHODS
//C-Create
//localhost:4000/ POST
app.post('/', function(req,res){
    console.log("I am in POST")
    //defining a JSON object locally for the studModel for the studCollection
    var studObject = new studModel()
    //filling in the JSON values of the structure for the newly created JSON object studSchema { name : String }
    studObject.name = req.body.name
    studObject.age = req.body.age
    studObject.dept = req.body.dept
    //Saving the studObject that was defined locally-->online that is on mongodb atlas
    studObject.save().then(()=>{
        //used then() after save() to ensure that the hoobyObject was saved first on atlas and then the following function was called
        //the followinf function fetches all the JSON objects saved in studCOllection of which we defined the studModel
         res.send("Student saved")
    })
})

//R-Read
//localhost:4000/ GET
app.get('/', function(req,res){
    console.log("I am in GET")
    //Syntax for fetching all the JSON objects in studCollection
    studModel.find({}, function(err, doc){
        if(err)
            res.send(err)
        else
            res.send(doc)
    })
})

//Query
app.get('/query',function(req,res){
    console.log("I am in GET")
    studModel.find({dept : "IT"}, 'name age',function(err,doc){
        if(err)
            res.send(err)
        else
            res.send(doc)
    })
})

//U-UPDATE
//localhost:4000/update/age/i38498kjnkjn PUT
app.put('/update/age/:id',function(req,res){
    console.log("I am in PUT")
    var id = req.params.id
    var input_age = Number(req.body.age)
    studModel.findByIdAndUpdate(id, {age : input_age},function(err){
        if(err)
            res.send(err)
        else
            res.send("Student Updated")
    })
})

//D-DELETE
//localhost:4000/delete/5ef4c6aaab1d5a1660d96ee3 DELETE
app.delete('/delete/:id', function(req,res){
    console.log("I am in DELETE")
    var id = req.params.id
    studModel.findByIdAndRemove(id, function(err){
        if(err)
            res.send(err)
        else
            res.send("Student deleted")
    })
})

app.listen(PORT, function(){
    console.log("Listening to port "+PORT)
})










// //CRUD
// //Create -- POST
// //Read -- GET
// //Update -- PUT
// //Delete -- DELETE



// //localhost:4000/update/name/5ef4c6aaab1d5a1660d96ee3
// app.put('/update/name/:id',function(req,res){
//     console.log("I am in PUT")
//     var id = req.params.id
//     var input_name = req.body.name
//     studModel.findByIdAndUpdate(id, {name : input_name},function(err){
//         if(err)
//             res.send(err)
//         else
//             res.send("Student Updated")
//     })
// })

// app.put('/update/dept/:id',function(req,res){
//     console.log("I am in PUT /dept")
//     var id = req.params.id
//     var input_dept = req.body.dept
//     studModel.findByIdAndUpdate(id, {dept : input_dept},function(err){
//         if(err)
//             res.send(err)
//         else
//             res.send("Student Updated")
//     })
// })