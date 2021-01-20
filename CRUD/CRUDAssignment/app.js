var express = require('express')
var app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
//DB
var mongoose = require('mongoose')

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{console.log("Successful")})
.catch((err)=>{console.log("Unsuccessful",err)})

const companySchema = new mongoose.Schema({
    name: String,
    nod: Number,
    location: String
})

const companyModel = mongoose.model('companyCollection', companySchema)

//Create
app.post('/',function(req,res){
    console.log("POST")
    var companyObj = new companyModel()
    companyObj.name = req.body.name
    companyObj.nod = req.body.nod
    companyObj.location = req.body.location
    companyObj.save().then(()=>{
        res.send("Company Saved")
    })
})

//READ
app.get('/',function(req,res){
    console.log("GET")
    companyModel.find({}, function(err, companies){
        if(err)
            res.send(err)
        else
            res.send(companies)
    })
})

//UPDATE
app.put('/update/numberofdept/:id',function(req,res){
    console.log("PUT")
    var id = req.params.id
    companyModel.findByIdAndUpdate(id,{nod : Number(req.body.nod)},function(err){
        if(err)
            res.send(err)
        else
            res.send("Company Updated")
    })
})

//DELETE
app.delete('/delete/:id',function(req,res){
    console.log("DELETE")
    var id = req.params.id
    companyModel.findByIdAndRemove(id, function(err){
        if(err)
            res.send(err)
        else
            res.send("Company Deleted")
    })
})

app.listen(3000, function() {
    console.log("Listening to port 3000")
})