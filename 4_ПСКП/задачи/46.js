//TCP-сервер
//приним поток 32-чисел (1 за отпр)

const net=require('net');
let HOST='0.0.0.0';
let PORT = 40000;
let server =net.createServer();

server.on('connection',(sock)=>
{
    console.log('Client Connected: '+ sock.remoteAddress+':'+sock.remoteAddress);
    
    sock.on('data',(data)=>
    {
        console.log('Number: ',data.readInt32LE());
    });
    sock.on('close', ()=>{'server closed'});
});

server.listen(PORT,HOST);
console.log('Server is listening to '+PORT);