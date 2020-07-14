let http = require('http');
let parseString= require('xml2js').parseString;
let xmlbuilder= require('xmlbuilder');

http.createServer((req, res)=>{
    let sumx=0 , val_y=0;
    let resultm='', id='', body='';
	req.on('data',chunk=>{body+=chunk.toString();});
	req.on('end',()=>{
		console.log(body);
		parseString(body,function(err,result)
		{
			id=result.request.$.id;
			console.log(id);
			result.request.m.map((e,i)=>{
                console.log('m: ', e.$.value);
				resultm+=e.$.value;
            });

            result.request.x.map((e,i)=>{
				console.log('x: ', e.$.value);
				sumx+=(+e.$.value);
            });
                    
            result.request.y.map((e,i)=>{
				console.log('y: ', e.$.value);
				val_y+=(+e.$.value);
            });
		});
		let result=xmlbuilder.create('response').att('id',id);
		result.ele('value_y',{element:"y",result:val_y});
		result.ele('sum_of_x',{element:"x",result:sumx});
		result.ele('concat',{element:"m",result:resultm});
		res.writeHead(200,{'Content-Type': 'application/xml'});
        res.end(result.toString({pretty:true}));
    });   
}).listen(5000);