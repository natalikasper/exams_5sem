var http = require('http');
var url = require('url');


let http_handler=(req,res)=>
{
    if(req.method=='POST')
    {
		if(url.parse(req.url).pathname=== '/JSON')
		{
			let result='';
			let body='';
			req.on('data',chunk=>{body+=chunk.toString();});
			req.on('end',()=>{
				let os = JSON.parse(body);
				console.log(os);
				result={
					c:"Ответ от сервера",
					value_x: os.x,
					value_y: os.y,
					x_plus_y:os.x+os.y,
					information: os.o.surname+" "+os.o.name,
				};
				res.writeHead(200,{'Content-Type': 'application/json'});
				console.log(result);
				res.end(JSON.stringify(result));});
			}
    }
}
var server=http.createServer(function (req, res){
    http_handler(req,res);
}).listen(5000);