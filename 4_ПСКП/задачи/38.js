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

// удаление файла
//+ unlinkSync (без ф.обр.вызова);
if(url.parse(req.url).pathname === '/delete')
{
    fs.unlink('./Files/File2.txt', (e)=>{
        if (e) console.log('Ошибка: ', e);
        else console.log('Файл удален');
    })
}

// переименование файла
if(url.parse(req.url).pathname === '/rename')
{
    fs.rename('./Files/File.txt', './Files/File2.txt', (e)=>{
        if (e) console.log('Ошибка: ', e);
        else console.log('Файл переименован');
    })
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

// чтение из файла
if(url.parse(req.url).pathname === '/read')
{
    const fs = require('fs');
    fs.readFile('./Files/File.txt', (e, data)=>{
        if (e) console.log('Ошибка: ', e);
        else console.log('data: ', data.toString('utf8'));
    })
}

// ас чтение из файла
if(url.parse(req.url).pathname === '/readas'){
    fs.readFileSync('./Files/File.txt', 'utf8', function(e, data){
        if(e) console.log('Ошибка: ', e);
        else console.log('Ассинхронное чтение:' + data)
    })
}

}}

http.createServer(function (req, res){
    try{http_handler(req,res);}
    catch(e){console.error(e);}
}).listen(3000);