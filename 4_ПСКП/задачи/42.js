const Readable = require('stream').Readable;
let fs = require('fs');

let rs = new Readable();    //поток на чтение
rs.push('aaa'); //поместить в поток
rs.push('bbb');
rs.push(null);  //конец данных

rs.on('readable', ()=>{ //поток готов для чтения
    let chunk;
    //вывести все
    while((chunk=rs.read())!= null){
        console.log(`отправлено ${chunk.length} байтов: ${chunk}`);
    }
});

//все данные прочитаны
rs.on('end', ()=>{
    console.log('end of data');
})

rs.on('error', (e)=> {
    console.log('error = ', e);
});

/*
//------читать из файла-------
let rf = fs.createReadStream('./MyFile.txt');

//в буфере есть данные (1 вариант)
rf.on('data', (data)=>{
    console.log('данные: ', data.toString(), '\nдлина: ', data.length);
})

//поток готов для чтения (2 вариант)
rf.on('readable', ()=>{
    let ch = null;
    //полностью чит.из файла
    while((ch=rf.read())!=null){
        console.log(ch.toString());
    }
    //читать из файла по байтам
    while((ch=rf.read(2))!=null){
        console.log(ch.toString());
    }
});

rf.on('end', ()=>{
    console.log('end of data');
})

rf.on('error', (e)=>{
    console.log('error = '. e);
});*/