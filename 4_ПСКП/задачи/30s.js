const Websocket = require('ws');

const wss = new Websocket.Server({port: 5000, host: 'localhost'});

wss.on('connection', (ws)=>{
    const duplex = Websocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    duplex.pipe(process.stdout);    //от клиента
    process.stdin.pipe(duplex);     //клиенту
});