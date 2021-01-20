var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req,res){
    fs.readFile('index.html',function(err,data){
        if(err)
            console.log(err)
        else{
            res.writeHead(200,{'Content-Type' : 'text/html'}) 
            res.end(data)
        }
    })
})

server.listen(3000)
console.log('Listening to port 3000')