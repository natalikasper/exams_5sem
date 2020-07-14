const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000');

ws.on('open', ()=>{
    ws.on('message', (data)=>{
        console.log('data: ' + data);
        ws.send('client\n\n');
    });
});