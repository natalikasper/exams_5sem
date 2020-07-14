//Разработка широковещательного Websockets-приложения: 
//Node.js-сервер, Node.js-клиент.
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:5000/broadcast');

ws.on('open', ()=>{
    let k=0;
    setInterval(()=>{ ws.send(`client: ${++k}`);}, 2000);

    ws.on('message', message => {
        console.log(`Message => ${message}`);
    })

    setTimeout(()=> {ws.close()}, 25000);
});