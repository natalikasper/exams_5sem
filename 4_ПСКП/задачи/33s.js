const WebSocket = require('ws');
const fs = require('fs');
const wss = new WebSocket.Server({port:5000, host:'localhost'});

let k = 0;
wss.on('connection', (ws)=>{
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let wfile = fs.createWriteStream(`./file${++k}.txt`);
    duplex.pipe(wfile);
});