let fs = require('fs');

function Stat (sfn) {
    let pathStatic = (fn) => {return `${sfn}${fn}`;}

    this.isStatic = (ext, fn) => {
        let reg = new RegExp(`\/.+\.${ext}$`);  //  /бла.ext(html/css/...)
        return reg.test(fn);
    }

    this.writeHTTP404 = (res) => { res.end("404: Resource not found");}

    this.sendFile = (req, res, headers) => {
                                        //файл мб прочитан вызыв.процессом
        fs.access(pathStatic(req.url), fs.constants.R_OK, err => {
            if(err) this.writeHTTP404(res);
            else
            {
                res.writeHead(200, headers);    //из 13.js
                fs.createReadStream(pathStatic(req.url)).pipe(res);
            }
        });
    }
}
module.exports = (parm) => {
    return new Stat(parm);
}