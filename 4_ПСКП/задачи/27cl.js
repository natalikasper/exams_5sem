var http =require('http');
const fs=require('fs');

//меняем здесь на что-то другое из разрешенных форматов на С
const file=fs.createWriteStream('1.css');

//path тоже меняем в соотв.с тем что указали выше ↑
let options= {
    host: 'localhost',
    path: '/1.css',
    port: 5000,
    method:'GET'
}
const req = http.request(options,(res)=> {
    res.pipe(file);}); 
req.on('error', (e)=> {console.log('http.request: error:', e.message);});
req.end();