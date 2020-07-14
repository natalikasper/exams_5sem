//синх - без ф.обр.вызова.
var http = require('http');
var url = require('url');
var fs = require('fs');

http_handler=(req,res)=>
{ 
  if(req.method=='GET'){

// создание пустого файла  
if(url.parse(req.url).pathname === '/create')
{
    fs.open('./Files/File.txt', 'w', (e, file) =>{
        if (e) throw e;
        console.log('Файл создан');
    })
}

// слежение за файлом
if(url.parse(req.url).pathname === '/watch')
{
    const filename = './Files/File.txt';
    try {
        fs.watch(filename, (event, f) => {
            if (f) console.log(`file: ${f}, event = ${event}`);
        });
    }
    catch (e) {
        console.log('catch e = ', e.code);
    }
}

// асинх перезапись/создание и запись в файл
if(url.parse(req.url).pathname === '/rewrite')
{
    let str01 = 'Строка01 Строка02 Строка03 ';
    fs.writeFile('./Files/File.txt', str01, (e)=>{
        if (e) throw e;
        console.log('Запись в файл выполнена успешно');
    })
}

// асинх запись в хвост/создание и запись в файл
if(url.parse(req.url).pathname === '/endwrite')
{
    let str01x = 'Строка04 Строка05 Строка06';
    fs.appendFile('./Files/File.txt', str01x, (e)=>{
        if(e) throw e;
        console.log('Запись в файл выполнена успешно');
    })
}

//ас. чтение из файла
if(url.parse(req.url).pathname === '/read')
{
    fs.readFile('./Files/File.txt', (e, data)=>{
        if (e) console.log('Ошибка: ', e);
        else console.log('data: ', data.toString('utf8'));
    })
}

  }}

http.createServer(function (req, res){
    try{http_handler(req,res);}
    catch(e){console.error(e);}
}).listen(3000);