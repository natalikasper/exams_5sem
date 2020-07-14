//TCP: пересылка файла от К к С

const net=require('net');
const fs = require('fs');

let HOST='127.0.0.1';
let PORT = 40000;
let client=new net.Socket();

let rs = fs.createReadStream('./file.txt');
    
client.connect(PORT,HOST,()=>
{
    console.log('Client connected:  ', client.remoteAddress+' '+client.remotePort);
    rs.pipe(client);
})