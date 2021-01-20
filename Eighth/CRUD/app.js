var express = require('express')
var app = express()

// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extended: true}))

var companyInfo = [];

// CRUD - Create Read Update Delete
//        POST GET PUT DELETE
//Create
//localhost:3000/create?company=ABCD
app.post('/create',function(req,res){
    console.log("POST")
    companyInfo.push(req.query.company)
    res.send("Company Created")
})

//READ
//localhost:3000/read
app.get('/read',function(req,res){
    console.log("GET")
    res.send(companyInfo)
})

//UPDATE
//localhost:3000/update/0?company=ABC
app.put('/update/:index',function(req,res){
    console.log("PUT")
    if(companyInfo.length <= req.params.index) {
        res.send("Invalid Index")
    } else {
        companyInfo[Number(req.params.index)] = req.query.company
        res.send("Company Updated")
    }
})

//DELETE
//localhost:3000/delete/0
app.delete('/delete/:index', function(req,res){
    console.log("DELETE")
    companyInfo.splice(req.params.index, 1)
    res.send("Company Deleted")    
})

app.listen(3000, function(){
    console.log("Listening to port 3000")
})