var http = require('http');

http.createServer( (req, res) =>
{
    if(req.method == 'GET' || req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE')
    {
        console.log(req.method, req.url);
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`method - ${req.method}; URL - ${req.url}`);
    }

    else HTTP404(req, res);
}
).listen(3000, (v)=> console.log('server listerning on the port 3000'));

let HTTP404 = (req, res) =>{
    console.log(`${req.method}, HTTP status 404`);
    res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`error: ${req.method}, HTTP status 404`);
}