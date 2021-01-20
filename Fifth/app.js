var http = require('http')

var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type' : 'text/plain'})
    res.end('Hello')
})

server.listen(3000)
console.log('Listening to port 3000')


// Client --- Server