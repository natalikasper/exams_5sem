let http = require('http');
let parseString= require('xml2js').parseString;
let xmlbuilder= require('xmlbuilder');
/*
<request id = "1">
	<x value = "7898311" />
	<m value = "natasha" />
</request>
 */
http.createServer((req, res)=>{
    if(req.method = 'POST'){
		let id='';
		let body='';
		req.on('data',chunk=>{body+=chunk.toString();});
		req.on('end',()=>{
			console.log(body);
			parseString(body, function(err,result)
			{
				id=result.request.$.id;
				console.log('id = ', id);
				result.request.x.map((e,i)=>{	//map сод.пару ключ=знач.
					console.log('x = ', e.$.value);
					value_x=e.$.value;
				});
				result.request.m.map((e,i)=>{
					console.log('m = ', e.$.value);
					value_m=e.$.value;
				});
			});
			let result=xmlbuilder.create('response').att('id',id);
			result.ele('x',{element:"x", value: value_x});
			result.ele('m',{element:"m", value: value_m});
			res.writeHead(200,{'Content-Type': 'application/xml'});
			res.end(result.toString());
		});
    }
    else{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end('no other http-method not so');
    }
}).listen(3000);
console.log('server listerning on localhost:3000');