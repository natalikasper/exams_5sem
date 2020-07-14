const rpcWCSS = require('rpc-websockets').Client;
let ws = new rpcWCSS('ws://localhost:4000');
ws.on('open',()=>
{
    ws.call('sum',[2]).then((r)=>{console.log('sum 2 =',r);}).catch(e=>{console.log(e);});
    ws.call('sum',[2,4,6,8,10]).then((r)=>{console.log('sum 2,4,6,8,10 =',r);}).catch(e=>{console.log(e);});
    ws.login({login:'user',password:'12345'}).then(login=>
        {
            if(login)
            {
                ws.call('square',[3]).then((r)=>{console.log('square param 3 =',r);}).catch(e=>{console.log(e);});
                ws.call('square',[5,4]).then((r)=>{console.log('square params 5,4 =',r);}).catch(e=>{console.log(e);});
            }
            else console.log("Error login");
        });

});
ws.on('error',(e)=>{console.log('ws client error',e);});