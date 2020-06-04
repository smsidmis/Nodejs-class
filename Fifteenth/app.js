var express = require('express'); 
var app = express();

app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

var hobbies = ['Playing Table Tennis', 'Drawing', 'Reading']

app.get('/', (req, res)=>{ 
    res.render('home', {hobbies : hobbies}); 
}); 

app.post('/',function(req,res){
    hobbies.push(req.body.hobby)
    res.render('home',{hobbies : hobbies})
})

app.listen(4000, function(){ 
    console.log('Listening to port 4000') 
});
