const rpcWCSS = require('rpc-websockets').Server;

let server = new rpcWCSS({port: 4000, host: 'localhost'});

server.setAuth((l)=>
    {return l.login=='user' && l.password=='12345'});

server.register('sum', (params)=>{
    let sum=0;
    for(let i=0;i<params.length;i++)
    {
        sum+=params[i];
    }
     return sum;
    }).public();

server.register('square', (params)=>{
    if(params.length==1)
    {
        return params[0]*params[0];
    }
    else
    {
        return params[0]*params[1];
    }
}).protected();