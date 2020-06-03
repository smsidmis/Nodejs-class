var express = require('express'); 
var app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{ 
    var data = {name:'Sid', hobbies:['Playing Table Tennis', 'Drawing', 'Reading']}
    res.render('home', {data:data}); 
}); 
    
app.listen(4000, function(){ 
    console.log('Listening to port 4000') 
});   