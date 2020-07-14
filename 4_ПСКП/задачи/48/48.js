//TCP: пересылка файла от С к К

const net=require('net');
const fs = require('fs');
let HOST='0.0.0.0';
let PORT = 40000;

let rs = fs.createReadStream('./file.txt');

net.createServer((sock)=>
{
    console.log('Server Connected:      '+ sock.remoteAddress+':'+sock.remotePort);
    rs.pipe(sock);
   
}).listen(PORT,HOST);

console.log('TCP-сервер is listening');