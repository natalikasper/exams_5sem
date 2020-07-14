let http = require('http');
let fs = require('fs');

http.createServer((req, res)=>{
    if(req.method == 'GET'){
        res.writeHead(200, {'content-type':'text/html; charset = utf-8'});
        rs = fs.createReadStream('./43file.txt')
        rs.pipe(res);
    }
}).listen(3000);