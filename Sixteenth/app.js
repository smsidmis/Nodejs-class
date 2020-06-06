//express package for starting server
var express = require('express'); 
var app = express();

//for setting view engine to ejs
app.set('view engine', 'ejs');

//for getting inputs in form field in html to app.js and saving in req.body
//for parsing data in inputs from urlencoded form to readable-string form
var bodyParser = require('body-parser')
//app.use() function makes it available for all the functions in the entire app.js file
app.use(bodyParser.urlencoded({extended: true}))

//Connection to Database
var mongoose = require('mongoose')

//one cluster can have multiple database.
//one database can have multiple collections.
//one collection can have multiple JSON objects

//using this connection url when u fill database name you connect to one database in that cluster

//syntax for connection to mongodb atlas
mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Successful"))
.catch((err) => console.log("Unsuccessful",err))

//defining structure for the JSON objects in the collection in the database that you connected to using connection url
var hobbySchema = new mongoose.Schema({
    name : String
})

//defining hobbyModel using hobbyCollection and giving it the hobbySchema
//model is defined so that we can make use of it to store JSON objects in collection
//here hobbyModel will have the structure of hobbySchema,that is, it will have { name: String } structure
var hobbyModel = mongoose.model('hobbyCollection',hobbySchema)

//localhost:4000/ GET
app.get('/', (req, res)=>{ 
    //Syntax for fetching all the JSON objects in hobbyCollection and it will saved in 'hobbies'
    hobbyModel.find( {} , function(err,hobbies){
        if(err)
            res.send(err)
        else
        {
            console.log(hobbies)
            res.render('home', {hobbies : hobbies}); 
        }
    }) 
}); 

//localhost:4000/ POST

//CRUD operations
// C- create -- POST
// R- read -- GET
// U- update -- PUT
// D- delete -- DELETE HTTP METHODS
app.post('/',function(req,res){
    //defining a JSON object locally for the hobbyModel for the hobbyCollection
    var hobbyObject = new hobbyModel()
    //filling in the JSON values of the structure for the newly created JSON object hobbySchema { name : String }
    //req.body.hobby-->input field with name="hobby" in form defined in home.ejs
    hobbyObject.name = req.body.hobby
    //Saving the hobbyObject that was defined locally-->online that is on mongodb atlas
    hobbyObject.save().then(()=>{
        //used then() after save() to ensure that the hoobyObject was saved first on atlas and then the following function was called
        //the followinf function fetches all the JSON objects saved in hobbyCOllection of which we defined the hobbyModel
        hobbyModel.find({},function(err,whatever){
            if(err)
                res.send(err)
            else
            {
                console.log("Whatever == " + whatever)
                //Displaying home.ejs and sending all the JSON objects that got saved in 'whatever' after fetching from atlas
                //Sending 'whatever' (which is a list of all the JSON objects in hobbyCollection) as 'hobbies'
                //this list will be accessed as 'hobbies' in home.ejs
                res.render('home', {hobbies : whatever}); 
            }
        })
    })
})

//By the following syntax the server starts listening to port 4000
app.listen(4000, function(){ 
    //If the server was successfully run and it started listening to port 4000
    //then the 'Listening to port 4000' will be printed in console/terminal
    console.log('Listening to port 4000') 
});
