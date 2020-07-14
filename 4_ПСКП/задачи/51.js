var http = require('http');
var fs = require('fs');
var url = require('url');

let GET_handler = (req, res) => {
    var parseUrl = url.parse(req.url);

    if (parseUrl.pathname.includes("/api/")) {
        var table = parseUrl.pathname.replace("/api/", "");
        console.log("table: " + table);

        pool.connect().then(() => {
            pool.request().query(`select * from ${table}`, (err, result) => {
                if (err) {
                    res.end(JSON.stringify({
                        code: 1,
                        message: `Table ${table} does not exist`
                    }))
                } else {
                    console.log(result.recordset);
                    res.end(JSON.stringify(result.recordset));
                }
                pool.close();
            });
        });
    } else if (parseUrl.pathname === '/') {
        let html = fs.readFileSync('51.html');
        res.writeHead(200, {
            'Content-Type' : 'text/html;charset=utf-8'
        });
        res.end(html);
    }


    console.log(parseUrl);
}

let http_handler = (req, res) => {
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8" })
    console.log(req.method, " - ", req.url);
    if(req.method === 'GET'){
        GET_handler(req, res);
    }
    else console.log('choose the get method')
}

let server = http.createServer();
server.listen(3000, (v) => {
    console.log("server.listen(3000)");
}).on('error', (e) => {
    console.log("server.listen(3000); error: ", e);
}).on('request', http_handler);

var sql = require('mssql/msnodesqlv8');
const pool = new sql.ConnectionPool({
    database: "univer",
    server: "DESKTOP-4K3JN12\\SQLEXPR",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
});

