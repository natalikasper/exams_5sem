//Октет - 8 бит (2сс разрядов)
//(1 октет - байт)

//Buffer - объект, предназн для работы с потоком октетов
//применяется в функциях readFile, writeFile, 1GB
//размер устан при создании и не мб изменен
//allocUnsafe - выделенная память не обнуляется (иначе наоб.)
//   => при перезаписи могут просочиться старые д-е, но он быстрее

var http = require('http');
var url = require('url');
var fs = require('fs');

//let buf01 = Buffer.from([1,2,3,4,5,6,7,8,9,10]);      //4 байт
let buf01 = Buffer.from('aa bb cc AA BB CC', 'ascii');  //1 байт
//let buf01 = Buffer.from('aa bb AA BB', 'utf8');       //но 128 номера - 1 байт

fs.writeFile('./Files/File.dat', buf01, (e)=>{
    if (e) throw e;
    console.log('buf01 = ', buf01);
    console.log('длина буфера = ', buf01.length);
});

fs.open('./Files/File.dat', (e,file)=>{
    fs.readFile('./Files/File.dat', (e,buf)=> {
        if(e) console.log('Ошибка: ', e);
        else {
            let m = [];
            for (const value of buf.values()) {
                m.push(String.fromCharCode(value));
                //если buf01 первый с массивом чисел, то просто value
            }
            console.log(m);
        }        
    })
})