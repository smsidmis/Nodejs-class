const express = require('express') //Importing Packages
const app = express() //Creating a server

//localhost:4000 OR localhost:4000/
app.get('/', function (req, res) {
    res.send('Hi World')
})

//localhost:4000/hello
app.get('/hello', function (req, res) {
    res.send('Hello World')
})

//localhost:4000/bye
app.get('/bye', function (req, res) {
    res.send('Bye World')
})

app.listen(4000) //To listen a particular port where the client will hit