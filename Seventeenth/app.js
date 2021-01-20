var express = require('express'); 
var app = express();
var PORT = 4000;

app.set('view engine', 'ejs');

var bodyParser = require('body-parser')
//use this when using postman
app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())

//Connection to Database
var mongoose = require('mongoose')

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Successful"))
.catch((err) => console.log("Unsuccessful",err))

var studSchema = new mongoose.Schema({
    name : String,
    age: Number,
    dept: String
})

var studModel = mongoose.model('studCollection',studSchema)

//localhost:4000/ GET
//Fetching all students
//Read
app.get('/', (req, res)=>{ 
    studModel.find( {} , function(err,students){
        if(err)
            res.send(err)
        else
        {
            console.log(students)
            res.render('home.ejs', {studs : students}); 
        }
    }) 
}); 

//localhost:4000/ POST
//Creating a student
//Create
app.post('/',function(req,res){
    console.log(req.body)
    var studObject = new studModel()
    studObject.name = req.body.name
    studObject.age = req.body.age
    studObject.dept = req.body.dept
    studObject.save().then(()=>{
        res.send("Student saved")
    })
})

//Query
//Get all students of certain age
//localhost:4000/age/20
//localhost:4000/age/10/30
//ageNo --- 20
app.get('/age/:greater/:less',function(req,res){
    studModel.find( {age: { $gt: req.params.greater, $lt: req.params.less },dept : "IOT"}, 'name', function(err,students){
        if(err)
            res.send(err)
        else
        {
            console.log(students)
            res.render('home.ejs', {studs : students}); 
        }
    }) 
})

app.listen(PORT, function(){ 
    console.log('Listening to port '+ PORT) 
})