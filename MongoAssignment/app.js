var express = require('express'); 
var app = express();

app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

//DB
const mongoose = require('mongoose');

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{console.log('Successful')})
.catch((err)=>{console.log('Unsuccessful '+err)})

var hobbySchema = new mongoose.Schema({
    name: String
})

const hobbyModel = mongoose.model('hobbies2collection', hobbySchema);

//var hobbies = ['Playing Table Tennis', 'Drawing', 'Reading','Watching Tv']
//localhost:4000/ GET
//READ --> GET
app.get('/', (req, res)=>{ 
    hobbyModel.find({}, function (err, docs) {
        if(err)
            console.log(err)
        else
        {
            console.log(docs)
            res.render('home.ejs',{hobbies:docs})
        }
    });
}); 

//localhost:4000/ POST
//Create --> POST
app.post('/',function(req,res){
    
    var hobbyObject = new hobbyModel()
    hobbyObject.name = req.body.hobby
    hobbyObject.save()

    res.redirect('/')
    //GET localhost:4000/
})

app.listen(4000, function(){ 
    console.log('Listening to port 4000') 
});
