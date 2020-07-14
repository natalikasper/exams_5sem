var http =require('http');

let parms=JSON.stringify(
    {   
        "req": "Запрос.Лабораторная работа 8/10",
        "x": 1,
        "y": 2,
    });

let options= {
    host: 'localhost',
    port: 5000,
    path: '/JSON',
    method:'POST',
    headers: {'content-type':'application/json', 'accept':'application/json'}
}
const req = http.request(options,(res)=> {
    let data = '';
    res.on('data',(chunk) => { data += chunk.toString(); });
    res.on('end',()=>{ console.log('end');
    console.log('parse(body)=', JSON.parse(data));
    }); 
});
req.on('error', (e)=> {console.log('http.request: error:', e.message);});
req.write(parms);
req.end();