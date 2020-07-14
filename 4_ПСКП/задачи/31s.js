const WebSocket = require('ws');

//ping-pong (server-client)

const wss = new WebSocket.Server({port:5000, host:'localhost'});
wss.on('connection', (ws)=>{
    ws.on('pong', (data)=>{
        console.log('pong from client:', data.toString());
    });
    
    setInterval(()=>{ ws.ping('server ping')}, 5000);
});

//ping/pong (client-server)
/*
wss.on('connection', (ws)=>{
    ws.on('ping', (data)=>{
        console.log('on ping:', data.toString());
    });
});
wss.on('error', (e)=>{console.log('wss server error', e)});*/