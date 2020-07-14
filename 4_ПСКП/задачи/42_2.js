const Writable = require('stream').Writable;
let fs = require('fs');


let ws = Writable();
ws._write = (chun, enc, next)=>{
    console.log('_write', chun.toString());
    next();
}
ws.write('1111');
ws.write('2222');
ws.end('end', ()=> {console.log('end-ok')});


/*
let wsf = fs.createWriteStream('./WSF.txt');
wsf.on('ready', ()=>{
    for(let i = 0; i < 10; i++){
        wsf.write(`\n--${i}--`);
    }
    wsf.end(null);
});

//вывести
let rf = fs.createReadStream('./WSF.txt');
rf.on('data', (data)=>{console.log(data.toString())})
*/

process.stdin.on('data', (data)=>{ws.write(data);});