const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:5000');

ws.on('open', ()=>{
    ws.on('message', data => {
        console.log('message: ', JSON.parse(data));
    });
    let k = 0;
    setInterval(()=> {
        ws.send(JSON.stringify({k:++k, sender: 'Client'}));
    }, 3000);
});