let http = require('http');

/*
как у меня в примере
[{
	"m":"nataliii",
	"x":1,
	"y":2
}]
 */
http.createServer((req, res)=>{
    if(req.method = 'POST'){
        let result='';
        let body='';
        req.on('data',chunk=>{body+=chunk.toString();});
        req.on('end',()=>{
            console.log(body);
            let os = JSON.parse(body);
            result={
                m:os[0].m,
                x:os[0].x,
                y:os[0].y,
                length_m: os[0].m.length,
                sum: os[0].x + os[0].y
            };
            res.writeHead(200,{'Content-Type': 'application/json'});
            console.log(result);
            res.end(JSON.stringify(result));
            });
    }
    else{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end('no other http-method not so');
    }
}).listen(3000);
console.log('localhost:3000');