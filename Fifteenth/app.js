var express = require('express'); 
var app = express();

app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

var hobbies = ['Playing Table Tennis', 'Drawing', 'Reading','Watching Tv']
//localhost:4000/ GET
//READ --> GET
app.get('/', (req, res)=>{ 
    res.render('home.ejs', {hobbies : hobbies}); 
}); 


//localhost:4000/ POST
//Create --> POST
app.post('/',function(req,res){
    console.log(req.body)
    console.log(req.body.type)
    console.log("Before Pushing :" + hobbies)
    console.log("Our Input : "+req.body.hobby)
    hobbies.push(req.body.hobby)
    console.log("After Pushing :" + hobbies)
    //res.render('home',{hobbies : hobbies})
    res.redirect('/')
    //GET localhost:4000/
})

app.listen(4000, function(){ 
    console.log('Listening to port 4000') 
});
