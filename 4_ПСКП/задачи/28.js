//Разработка Websockets-приложения: Node.js-сервер, браузер-клиент. Пример.
const Websocket = require('ws');
let http = require('http');
let fs = require('fs');
let k = 0;

//html
http.createServer((req, res)=>{
    if(req.method == 'GET' && req.url == '/start'){
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end(fs.readFileSync('./28html.html'));
    }
}).listen(3000);
console.log('ws server: 3000');

//сервер
const wsserver = new Websocket.Server({port: 5000, host: 'localhost', path:'/wsserver'})
wsserver.on('connection', (ws)=>{
    ws.on('message', message =>{
        console.log(`Message = > ${message} `)
    })
})
wsserver.on('error', (e)=> {console.log('ws server error', e)});
console.log(`ws server host: ${wsserver.options.host}, port: ${wsserver.options.port}, path: ${wsserver.options.path} `);

//браузер
//http://localhost:3000/start