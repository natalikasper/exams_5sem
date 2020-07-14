//TCP: пересылка файла от С к К

const net=require('net');
const fs = require('fs');

let HOST='127.0.0.1';
let PORT = 40000;
let client=new net.Socket();

let ws = fs.createWriteStream('./Cfile.txt');

console.log('TCP-сервер is listening');
client.connect(PORT,HOST,()=>
{
    console.log('Client connected:  ', client.remoteAddress+' '+client.remotePort);
    client.pipe(ws);
})