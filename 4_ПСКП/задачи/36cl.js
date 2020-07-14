const rpcWSC = WebSocket = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:4000');
process.stdin.setEncoding('utf-8');
process.stdin.on('readable',()=>{
    let chunk2=null;
    while ((chunk2 = process.stdin.read()) !=null){

        if	(chunk2.trim() == 'A') {
            ws.notify('A', {message:"MessageA"});
        }
        else if	(chunk2.trim() == 'B') {
            ws.notify('B', {message:"MessageB"});
        }
        else if	(chunk2.trim() == 'C') {
            ws.notify('C', {message:"MessageC"});
        }
        else console.log('такого события не существует');
});