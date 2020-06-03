var http = require('http')

var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type' : 'application/json'})
    var obj = {
        name: 'Sid',
        branch: 'IT'
    }
    res.end(JSON.stringify(obj))
})

server.listen(3000)
console.log('Listening to port 3000')