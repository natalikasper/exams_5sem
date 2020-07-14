//TCP: прослуш 2 порта, обмен текст
//№ порта через параметр

const net=require('net');
let HOST='127.0.0.1';
let PORT = process.argv[2];
let client=new net.Socket();
let timerID=null;

client.connect(PORT,HOST,()=>
{
    let k=0;
    console.log('Client connected:',client.remoteAddress+' '+client.remotePort);
    timerID= setInterval(()=>
    {
        client.write(`Message ${++k}`);
    },1000);
    
    setTimeout(()=>
    {
        clearInterval(timerID);
        client.end();
    },20000);
})
client.on('data',(data)=>
{
    console.log('Server answer: ', data.toString());
});