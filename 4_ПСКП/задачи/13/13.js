let http = require('http');
let stat = require('./static/13m')('./static');

let http_handler = (req, res)=>{
    if(stat.isStatic('html', req.url)) stat.sendFile(req, res,{'Content-Type': 'text/html; charset=utf-8'});
    else if(stat.isStatic('css', req.url)) stat.sendFile(req, res,{'Content-Type': 'text/css; charset=utf-8'});
    else if(stat.isStatic('js', req.url)) stat.sendFile(req, res,{'Content-Type': 'text/javascript; charset=utf-8'});
    else if(stat.isStatic('docx', req.url)) stat.sendFile(req, res,{'Content-Type': 'application/msword; charset=utf-8'});
    else if(stat.isStatic('png', req.url)) stat.sendFile(req, res,{'Content-Type': 'image/png; charset=utf-8'});
    else stat.writeHTTP404(res);
}

let server = http.createServer();
server.listen(5000, (v)=>{console.log('server.listen(5000)')})
    .on('error', (e)=>{console.log('server.listen(5000): error: ', e.code)})
    .on('request', http_handler);