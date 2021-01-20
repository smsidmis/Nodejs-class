const express = require("express")
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set("view engine", "ejs");

var mongoose = require('mongoose')

mongoose.set("useFindAndModify", false)

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Successful"))
  .catch((err) => console.log("Unsuccessful",err))
  
const todoSchema = new mongoose.Schema({
    content: {
        type: String
    }
})

var todoModel = mongoose.model('todoCollection',todoSchema)

//R-Read
app.get('/',(req, res) => {
    console.log("I am in GET")
    todoModel.find({}, function(err, tasks){
        res.render("todo", { todoList: tasks })
    })
})

//C-Create
app.post('/',(req, res) => {
    console.log(req.body);
    const todoObject = new todoModel()
    todoObject.content = req.body.content
    // todoObject.save().then(()=>{
    //     console.log("I am in POST")
    //     res.redirect("/")
    // })
    todoObject.save()
    res.redirect("/")
});

//UPDATE FORM DISPLAY
app.get('/edit/:id',(req, res) => {
    console.log("I am in /edit")
    const id = req.params.id;
    todoModel.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todoList: tasks, idTask: id })
    })
})

//U-UPDATE
//NOTE-Should have been PUT but using POST
//HTML5 'form' only accepts GET and POST as method
//For throwing all GET, POST, PUT and DELETE requests --> use XHR or JQUERY/AJAX(part of front-end)
app.post('/edit/:id',(req, res) => {
    console.log("I am in PUT")
    const id = req.params.id
    todoModel.findByIdAndUpdate( id, { content: req.body.content }, function(err){
        if (err)
            res.send(err)
        else
            res.redirect("/")
    })
})
//CRUD
// create // read // update // delete
// POST   // GET  // PUT    // DELETE

//D-DELETE
//NOTE-Should have been DELETE but using GET
//<a href=""></a> throws a GET request
app.get("/remove/:id",function(req, res){
    console.log("I am in DELETE")
    const id = req.params.id
    todoModel.findByIdAndRemove(id, err => {
        if (err) 
            res.send(500, err)
        else
            res.redirect("/")
    })
})

app.listen(PORT, function(){
    console.log("Listening to port "+PORT)
})