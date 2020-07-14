var http =require('http');
var query= require('querystring');

//let parms=query.stringify({x:3,y:4});

//через консоль передаем через побел
let parms=query.stringify({x:parseInt(process.argv[2]),
    y:parseInt(process.argv[3])});

let path=`/twopar?${parms}`;
console.log(`${parms}`);

let options= {
    host: 'localhost',
    path: path,
    port: 5000,
    method:'GET'
}

const req = http.request(options,(res)=> {
    console.log('http.request: statusCode: ',res.statusCode);
    res.on('data',(data) => {console.log('body: ', data.toString());});
    res.on('end',()=>{ console.log('end');}); 
});
req.on('error', (e)=> {console.log('http.request: error:', e.message);
});
req.end();