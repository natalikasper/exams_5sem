//1 сек -> 32-число
//20 сек стоп


const net=require('net');
let HOST='127.0.0.1';
let PORT = 40000;
let client=new net.Socket();
let buf=new Buffer.alloc(4);
let timerID=null;

client.connect(PORT,HOST,()=>
{
    console.log('Server connected:',client.remoteAddress+' '+client.remotePort);
    let k=0;
    timerID= setInterval(()=>{client.write((buf.writeInt32LE(k++,0),buf));},  1000);

    setTimeout(()=> {
        clearInterval(timerID);
        client.end();
    },20000);
})