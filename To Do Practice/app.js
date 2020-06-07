var express = require('express')
var app = express()
var PORT = 4000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs')
app.use(express.static('public'))

var mongoose = require('mongoose')
mongoose.set('useFindAndModify',false)

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Successful"))
.catch((err) => console.log("Unsuccessful",err))

var todoSchema = new mongoose.Schema({
    content: String
})

var todoModel = mongoose.model('todoCollection',todoSchema)

//CRUD
//R-Read
app.get('/',function(req,res){
    console.log("I am in GET")
    todoModel.find({},function(err,tasks){
        //console.log(tasks)
        res.render('todo',{tasks:tasks})
    })
})

//C-Create
app.post('/',function(req,res){
    console.log("I am in POST")
    var todoObject = new todoModel()
    todoObject.content = req.body.content
    todoObject.save().then(()=>
        // todoModel.find({},function(err,tasks){
        //     res.render('todo',{tasks:tasks})
        // })
        res.redirect("/")
    )
})

//UPDATE FORM RENDER
app.get('/edit/:id',function(req,res){
    console.log("I am in GET /edit")
    var id = req.params.id
    todoModel.find({},function(req,tasks){
        res.render('todoEdit.ejs',{todoList:tasks,idTask:id})
    })
})

//U-UPDATE
//NOTE-Should have been PUT but using POST
//HTML5 'form' only accepts GET and POST as method
//For throwing all GET, POST, PUT and DELETE requests --> use XHR or JQUERY/AJAX(part of front-end)
app.post('/edit/:id',function(req,res){
    console.log("I am in POST /edit")
    var id = req.params.id
    var input = req.body.content
    todoModel.findByIdAndUpdate(id, {content : input},function(err){
        if(err)
            res.send(err)
        else
            res.redirect("/")
    })

})

//D-DELETE
//NOTE-Should have been DELETE but using GET
//<a href=""></a> throws a GET request
app.get('/remove/:id',function(req,res){
    console.log("I am in get /remove")
    var id = req.params.id
    todoModel.findByIdAndRemove(id,function(err){
        if(err)
            res.send(err)
        else
            res.redirect("/")
    })
})


app.listen(PORT,function(){
    console.log("Listening to port "+PORT)
})