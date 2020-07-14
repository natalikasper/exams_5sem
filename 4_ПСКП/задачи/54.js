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
        let html = fs.readFileSync('54.html');
        res.writeHead(200, {
            'Content-Type' : 'text/html;charset=utf-8'
        });
        res.end(html);
    }


    console.log(parseUrl);
}

let DELETE_handler = (req, res) => {
    var parseUrl = require('url').parse(req.url);

    var deleteObject = '';

    if (parseUrl.pathname.includes("/api/")) {
        var str = parseUrl.pathname.replace("/api/", "");

        // table name
        table = str.substring(0, str.indexOf("/"));

        // id of deleted element
        id = str.replace(table + "/", "");
        console.log("table: " + table + " id: " + id);


        pool.connect().then(() => {
            console.log(`delete from ${table} where ${table} = '${id}'`);
            pool.request().query(`delete from ${table} where ${table} = '${id}'`, (err, result) => {
                if (err) {
                    res.end(JSON.stringify({
                        code: 1,
                        message: `Table ${table} does not exist`
                    }));
                } else {
                    console.log("Deleted");
                    //objects = result.recordset;
                }
                pool.close();
            });
        });


        res.end("PUT REQUEST");

    }

}
OTHER_handler = (req, res) => {
    res.end(`{"${req.method}": "${req.url}"}`);
}

let http_handler = (req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
    })
    console.log(req.method, " - ", req.url);
    if(req.method === 'GET') GET_handler(req, res);
    else if (req.method === 'DELETE') DELETE_handler(req, res);
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