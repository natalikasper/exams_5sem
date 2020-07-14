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
    //путь  режим(запись - w )
    fs.open('./Files/File.txt', 'w', (e, file) =>{
        if (e) throw e;
        console.log('Файл создан');
    })
}

// копирование файла (новый будет создан или перекроет сущ-щий)
if(url.parse(req.url).pathname === '/copy')
{
    fs.copyFile('./Files/File.txt', './Files/File2.txt', (e)=>{
        if(e) console.log('Ошибка: ', e);
        else console.log('Файл скопирован');
    })
}

// проверка сущ-ния файла
if(url.parse(req.url).pathname === '/exists')
{
    fs.exists('./Files/File.txt', (exists)=>{
        if(exists) console.log('Файл есть');
        else console.log('Файла нет');
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

//синх запись
if(url.parse(req.url).pathname === '/rewritesync')
{
    let str01 = 'natasha ';
    fs.writeFileSync('./Files/File.txt', str01);
}

// асинх запись в хвост/создание и запись в файл
//+ м. синхр.
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

// c чтение из файла
if(url.parse(req.url).pathname === '/reads'){
    fs.readFileSync('./Files/File.txt', 'utf8');}

}
}

http.createServer(function (req, res){
    try{http_handler(req,res);}
    catch(e){console.error(e);}
}).listen(3000);