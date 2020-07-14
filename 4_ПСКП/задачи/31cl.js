const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000');

//можно ловить
ws.on('ping', (data)=>{
    console.log('on ping:', data.toString());
});

//2 вариант 
/*
ws.on('pong', (data)=>{
    console.log('pong from client:', data.toString());
});
setInterval(()=> {
    ws.ping('client: ping')
}, 5000);
*/