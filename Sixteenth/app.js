var express = require('express'); 
var app = express();

app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

//Connection to Database
var mongoose = require('mongoose')

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Successful")).catch((err) => console.log("Unsuccessful",err))

var hobbySchema = new mongoose.Schema({
    name : String
})

var hobbyModel = mongoose.model('hobbyModel',hobbySchema)

//localhost:4000/
app.get('/', (req, res)=>{ 
    hobbyModel.find({},function(err,whatever){
        if(err)
        res.send(err)
        else
        {
        console.log(whatever)
        res.render('home', {hobbies : whatever}); 
        }
    }) 
}); 

app.post('/',function(req,res){
    var hobbyObject = new hobbyModel()
    hobbyObject.name = req.body.hobby
    hobbyObject.save().then(()=>{
        hobbyModel.find({},function(err,whatever){
            if(err)
            res.send(err)
            else
            {
            console.log(whatever)
            res.render('home', {hobbies : whatever}); 
            }
        })
    })
})

app.listen(4000, function(){ 
    console.log('Listening to port 4000') 
});
