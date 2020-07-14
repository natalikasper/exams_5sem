var http = require('http');
var url = require('url');
var fs = require('fs');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var url = require('url');

async function init() {
  try {
    await oracledb.createPool({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
      });
    console.log('Connection pool started');
  } catch (err) {
    console.error('init() error: ' + err.message);
  } 
}

async function ExecuteSQL(sql) {
  let connection;
  try {
    console.log(sql);
    connection = await oracledb.getConnection();
    const result = await connection.execute(sql);
    await connection.execute('Commit');
    return result;
  } 
  catch (err) {
    console.error(err);
  } 
  finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
        process.exit(0);
      }
    }
  }
}

async function closePoolAndExit() {
  console.log('\nTerminating');
  try {
    await oracledb.getPool().close(10);
    console.log('Pool closed');
    process.exit(0);
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}

process
  .once('SIGTERM', closePoolAndExit)
  .once('SIGINT',  closePoolAndExit);


init();
http.createServer(function (req, res){
    try{
        http_handler(req,res);
    }
    catch(e)
    {
        console.error(e);
    }

}).listen(5000);
