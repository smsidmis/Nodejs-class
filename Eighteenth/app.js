var express = require('express'); 
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

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
app.get('/', (req, res)=>{ 
    studModel.find( {} , function(err,students){
        if(err)
            res.send(err)
        else
        {
            console.log(students)
            res.render('home', {studs : students}); 
        }
    }) 
}); 

//localhost:4000/ POST
app.post('/',function(req,res){
    var studObject = new studModel()
    studObject.name = "Jack"
    studObject.age = "20"
    studObject.dept = "IT"
    studObject.save().then(()=>{
        studModel.find({},function(err,students){
            if(err)
                res.send(err)
            else
            {
                console.log(students)
                students.forEach((stud)=>{
                    console.log(stud.name)
                    console.log(stud.age)
                    console.log(stud.dept)
                })
                res.render('home', {studs: students})
            }
        })
    })
})

app.listen(4000, function(){ 
    console.log('Listening to port 4000') 
})