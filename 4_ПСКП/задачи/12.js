var http = require('http');
var url = require('url');

http.createServer( (req, res)=> 
{
    if(req.method=='GET'){
        if(url.parse(req.url).pathname === '/dogs'){
          console.log('GET/dogs');
          res.writeHead(200,{'Content-Type': 'text/html'});
          res.end('I love dogs');
        }
        else if(url.parse(req.url).pathname === '/cats'){
            console.log('GET/dogs');
            res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
            res.end('I love cats');
        }
        else if (url.parse(req.url).pathname === '/smth'){
            console.log('GET/smth');
            res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
            res.end('I love you');
        }
        else HTTP404(req, res);
    }
    else HTTP404(req, res);
}).listen(3000, (v)=>{console.log('localhost')});

let HTTP404 = (req, res) =>{
    console.log(`${req.method}, HTTP status 404`);
    res.writeHead(404, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(`error: ${req.method}, HTTP status 404`);
}