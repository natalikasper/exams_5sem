const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:5000');
ws.on('open', (wss)=>{
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let wfile = fs.createWriteStream(`./nat.txt`);
    duplex.pipe(wfile);
});

