var http =require('http');
var query= require('querystring');

let parms=query.stringify({x:3,y:4, s:"fff"});

let options= {
    host: 'localhost',
    path: '/threepar',
    port: 5000,
    method:'POST'
}
const req = http.request(options,(res)=> {
    res.on('data',(data) =>{ console.log('body:', data.toString());});
    res.on('end',()=>{ console.log('http.request: end: body=', data);}); 
});
req.on('error', (e)=> {console.log('http.request: error:', e.message);
});
req.write(parms);
req.end();