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
        let html = fs.readFileSync('53.html');
        res.writeHead(200, {
            'Content-Type' : 'text/html;charset=utf-8'
        });
        res.end(html);
    }


    console.log(parseUrl);
}

let PUT_handler = (req, res) => {
    var parseUrl = require('url').parse(req.url);

    var insertedObject = '';

    if (parseUrl.pathname.includes("/api/")) {
        var table = parseUrl.pathname.replace("/api/", "");
        console.log("table: " + table);

        req.on('data', (data) => {
            insertedObject += data;
        });
        req.on('end', () => {
            try {
                let obj = JSON.parse(insertedObject);
                console.log(obj);

                selectRequest(table);

                setTimeout(() => {
                    var equal = true;
                    for (i in obj)
                        if (!objects[0].hasOwnProperty(i))
                            equal = false;
                    //console.log("COMPARE: " + compareObjects(obj, objects[0]));
                    console.log(equal);
                    if (equal) {
                        // put new object into db

                        pool.connect().then(() => {
                            var keys = Object.keys(obj);
                            var array = Object.values(obj);
                            console.log(array[0]) // John

                            var updatedValues = "";
                            for (var i = 0; i < keys.length; i++) {
                                console.log('updatedValues: ' + updatedValues);
                                if (i != 0) {
                                    updatedValues += `, ${keys[i]} = '${array[i]}' `;
                                } else {
                                    updatedValues += `${keys[i]} = '${array[i]}' `;
                                }
                            }
                            console.log(updatedValues);

                            pool.request().query(`update ${table} set ${updatedValues} where ${keys[0]} = '${array[0]}'`, (err, result) => {
                                console.log(`update ${table} set ${updatedValues} where ${keys[0]} = '${array[0]}'`);
                                if (err) {
                                    res.end(JSON.stringify({
                                        code: 1,
                                        message: `Table ${table} does not exist`
                                    }));
                                } else {
                                    console.log("Updated");
                                }
                                pool.close();
                            });
                        });
                    }
                }, 1000);


            } catch {
                console.log("PARSE ERROR");
            }
        })
    }

    res.end("PUT REQUEST");

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
        GET_handler(req,res);
    }
    else if (req.method === 'PUT'){
        PUT_handler(req, res);
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