//сами создаем MyFile.txt
var http =require('http');
var fs= require('fs');

//1-70 символов
//для инкапсуляции всех частей сост.сущности
let bound='kasper';
let body=`--${bound}\r\n`;
body+='Content-Disposition:form-data; name="file"; Filename="MyFile.txt"\r\n';
body+='Content-Type:text/plain\r\n\r\n';
body+=fs.readFileSync('MyFile.txt');    //данные из файла
body+=`\r\n--${bound}--\r\n`;


let options= {
    host: 'localhost',
    path: '/UploadFile',
    port: 5000,
    method:'POST',
    headers: {'Content-Type':'multipart/form-data; boundary='+ bound}
}

const req = http.request(options,(res)=> {
    let data = '';
    res.on('data',(data) => { console.log(data.toString());});
    res.on('end',()=>{ console.log('end of data');}); 
});
req.on('error', (e)=> {console.log('http.request: error:', e.message);});
req.write(body);
req.end(null);