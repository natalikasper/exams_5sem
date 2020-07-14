const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:5000');
ws.on('open', ()=>{
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let rfile = fs.createReadStream(`./file.txt`);
    rfile.pipe(duplex);
});