//TCP: пересылка файла от К к С

const net=require('net');
const fs = require('fs');
let HOST='0.0.0.0';
let PORT = 40000;

let ws = fs.createWriteStream('./Sfile.txt');
let server = net.createServer();

server.on('connection', (sock)=>{
    console.log('Server Connected:      '+ sock.remoteAddress+':'+sock.remotePort);
    sock.pipe(ws);
})


server.listen(PORT,HOST);

console.log('TCP-сервер is listening');