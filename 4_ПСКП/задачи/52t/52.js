var http = require('http');
var fs = require('fs');

let GET_handler = (req, res) => {
    var parseUrl = require('url').parse(req.url);

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
        let html = fs.readFileSync('52.html');
        res.writeHead(200, {
            'Content-Type' : 'text/html;charset=utf-8'
        });
        res.end(html);
    }
    console.log(parseUrl);
}

let POST_handler = (req, res) => {
    var parseUrl = require('url').parse(req.url);
    var insertedObject = '';

    if (parseUrl.pathname.includes("/api/")) {
        var table = parseUrl.pathname.replace("/api/", "");

        req.on('data', (data) => {insertedObject += data;});
        req.on('end', () => {
            try {
                let obj = JSON.parse(insertedObject);
                console.log(obj);

                selectRequest(table);

                setTimeout(() => {
                        pool.connect().then(() => {
                            var keys = Object.keys(obj);
                            var array = Object.values(obj);

                            var k = "";
                            var v = "";

                            for (var i = 0; i < keys.length; i++) {
                                k += ` ${keys[i]} `;        //названия полей
                                v += ` '${array[i]}' `;     //введенные значения
                            }
                            pool.request().query(`insert into ${table} (${k}) values (${v})`, (err, result) => {
                                console.log("Inserted");
                                pool.close();
                            });
                        });
                }, 1000);


            } catch {
                console.log("PARSE ERROR");
            }
        })
    }
    res.end("POST REQUEST");
}

OTHER_handler = (req, res) => {
    res.end(`{"${req.method}": "${req.url}"}`);
}

let http_handler = (req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
    })
    console.log(req.method, " - ", req.url);
    
    if(req.method === 'GET'){
        GET_handler(req, res);
    }
    else if (req.method === 'POST'){
        POST_handler(req, res);
    }
    else OTHER_handler(req, res);
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

var objects;

function selectRequest(table) {
    pool.connect().then(() => {
        pool.request().query(`select * from ${table}`, (err, result) => {
            if (err) {
                res.end(JSON.stringify({
                    code: 1,
                    message: `Table ${table} does not exist`
                }));
            } else {
                objects = result.recordset;
            }
            pool.close();
        });
    });
};