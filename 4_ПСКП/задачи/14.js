let http = require('http');
let url = require('url');

//http://localhost:3000/hhhh/?d=3&s=kkkk&j=iii&p1=3&p2=t
http.createServer((req, res)=>{
    if(req.method = 'GET'){
        let p = url.parse(req.url, true);
        let result = '';
        let q = p.query;
            result = `href: ${p.href}</br>`;
            for (key in q) {result += `${key} = ${q[key]}</br>`;} 
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.write('<h1>query-параметры</h1>');
        res.end(result);
    }
    else{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end('no other http-method not so');
    }
}).listen(3000);