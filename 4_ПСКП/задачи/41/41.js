//Buffer - объект, предназн для работы с потоком октетов
//применяется в функциях readFile, writeFile, 1GB
//размер устан при создании и не мб изменен
//allocUnsafe - выделенная память не обнуляется
//   => при перезаписи могут просочиться старые д-е, но он быстрее

var fs = require('fs');

let k = 5;                                      //кол-во записываемых чисел
let sizeInt32LE = 4;                            //размер числа (Int32)
let buf2 = Buffer.allocUnsafe(sizeInt32LE * k); //выдел 40 байт без иниц

fs.open('./Files/File10.dat', 'w', (e, file)=>{

    for (let i=0; i<k; i++)
    //для значений без знака
    //запис на байты со смещением
    //0 - 1-4
    //1 - 5-8
        buf2.writeInt32LE(i, i*sizeInt32LE);
    
    fs.appendFile(file, buf2, (e)=>{
        if (e) throw e;
        console.log('Запись в файл выполнена успешно');
    })
})


fs.open('./Files/File10.dat', (e,file)=>{
    fs.readFile('./Files/File10.dat', (e,buf)=> {
        if(e) console.log('Ошибка: ', e);
        else {
            let k = buf.length/sizeInt32LE; //кол-во Int32-чисел
            let m = [];                     //массив для заполнения
            for (let i=0; i<k; i++) {
                m.push(buf.readInt32LE(i*sizeInt32LE));
            }
            console.log('m = ', m);
        }        
    })
})
