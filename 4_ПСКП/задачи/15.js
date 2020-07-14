let http = require('http');
let url = require('url');

//http://localhost:3000/hhhh/dsdf/gs/выпы
http.createServer((req, res)=>{
    if(req.method = 'GET'){
        let p = url.parse(req.url, true);
        let result = '';
            
            //английский текст
            result = `pathname: ${p.pathname}</br>`;
            p.pathname.split('/').forEach(e => {result+=`${e}</br>`});
            console.log(p.pathname.split('/')); 

            //русский текст
            result = `pathname: ${decodeURI(p.pathname)}</br>`;
            decodeURI(p.pathname).split('/').forEach(e => {result+=`${e}</br>`});
            console.log(decodeURI(p.pathname).split('/')); 
            
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.write('<h1>uri-параметры</h1>');
        res.end(result);
    }
    else{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end('no other http-method not so');
    }
}).listen(3000);