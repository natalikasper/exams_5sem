var http =require('http');

let parms=JSON.stringify(
    {
        "c": "Запрос от клиента",
        "x": 1,
        "y": 2,
        "o": {"surname":"Каспер","name":"Наталья"}
    }
);
let options= {
    host: 'localhost',
    port: 5000,
    method:'POST',
    headers: {'content-type':'application/json', 'accept':'application/json'}
}

const req = http.request(options,(res)=> {
    let data = '';
    //записываем в пер-ную чтобы потом проще вывести
    res.on('data',(chunk) => { data += chunk.toString(); });
    res.on('end',()=>{ console.log('end');
    console.log('parse(body)=', JSON.parse(data));
    }); 
});
req.on('error', (e)=> {console.log('http.request: error:', e.message);});
req.write(parms);
req.end();