let http = require('http');
let fs = require('fs');

http.createServer((req, res)=>{
    if(req.method == 'POST'){
        res.writeHead(200, {'content-type':'text/html; charset = utf-8'});
        ws = fs.createWriteStream('./43file.txt')
        req.pipe(ws);
        res.end();
    }
}).listen(3000);