const WebSocket = require('ws');
const wss = new WebSocket.Server({port:5000, host:'localhost'});

wss.on('connection', (ws)=>{
    ws.on('message', (data)=>{
        console.log('message: ', JSON.parse(data));
    });
    let k = 0;
    setInterval(()=>{
        ws.send(JSON.stringify({k: ++k, sender: 'Server'}));
    },5000);
});