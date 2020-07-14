let http = require('http');
var query= require('querystring');

http.createServer((req, res)=> {
    let result='';
    let body='';
    req.on('data',chunk=>{body+=chunk.toString();});
    req.on('end',()=>{
        console.log('Сообщение от клиента:');
        console.log(body);
        let os = JSON.parse(body);
        result={
            req:"Ответ.Обработка JSON от клиента",
            x_value:os.x,
            y_value:os.y,
            Length_req:os.req.length
        };
        res.writeHead(200,{'Content-Type': 'application/json'});
        console.log('Ответ клиенту:');
        console.log(result);
        res.end(JSON.stringify(result));});
}).listen(5000);
console.log('server start');