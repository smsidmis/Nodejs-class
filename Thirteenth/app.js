var express = require('express'); 
var app = express();

app.set('view engine', 'ejs');

//app.set('views',path.join(__dirname,'/public'))
//localhost:4000 == localhost:4000/
//localhost:4000/ GET
// GET 
app.get('/', (req, res)=>{ 
    var data = {name:'Siddharthi',hobbies:['Playing Table Tennis', 'Drawing', 'Reading','Obj1','Obj2']}

     data.hobbies.forEach((item)=>{ 
        console.log(item)
     });

     res.render('home.ejs', {data:data}); 
}); 
    
app.listen(4000, function(){ 
    console.log('Listening to port 4000') 
});