var http = require('http');
var url = require('url');
let mp=require('multiparty');


let http_handler=(req,res)=>
{
	if(req.method=='POST')
    {
			if(url.parse(req.url).pathname=== '/UploadFile')
			{
				let result='';
				let form =new mp.Form({uploadDir:'./static'});
				form.on('field',(name,value)=>{
					console.log('------------field-------------');
					console.log(name,value);
					result+=`<br/>---${name}= ${value}`;
				});
				form.on('file', (name, file)=>{
					console.log('-----file ------------');
					console.log(name,file);
					result+=`<br/>---${name}= ${file.originalFilename}: ${file.path}`;
				});
				form.parse(req);
				res.end('file is uploaded');
            }
    }
}

http.createServer(function (req, res){
    http_handler(req,res);
}).listen(5000);