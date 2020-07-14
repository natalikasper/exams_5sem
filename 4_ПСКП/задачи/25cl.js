var http =require('http');
let parseString= require('xml2js').parseString;
let xmlbuilder= require('xmlbuilder');

let xmldoc=xmlbuilder.create('request').att('id',33);
xmldoc.ele('x').att('value',3);
xmldoc.ele('x').att('value',1);
xmldoc.ele('y').att('value',5);
xmldoc.ele('m').att('value','b');
xmldoc.ele('m').att('value','c');

console.log(xmldoc.toString({pretty:true}));
let options= {
    host: 'localhost',
    port: 5000,
    method:'POST',
    headers: {'content-type':'application/xml', 'accept':'application/xml' }
}
const req = http.request(options,(res)=> {
    let data = '';
    res.on('data',(chunk) => { console.log(data+=chunk); });
    res.on('end',()=>{ console.log('end of data'); }); 
});
req.on('error', (e)=> {console.log('error:', e.message);
});
req.write(xmldoc.toString({pretty:true}));
req.end();