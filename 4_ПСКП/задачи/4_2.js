const greeting = require("./4");
 
//устан.гло.пер-ную name, кот.получ в модуле 4
/**ричем все глобальные функции и объекты, например,
 *  console, также доступны внутри global, поэтому мы можем
 *  написать и global.console.log(), и просто console.log()*/
global.name = "NATALIE";
 
global.console.log(date);
console.log(greeting.getMessage());

//process
//argv - массив, сод-щий эл-ты ком.строки, перед.при запуске
process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });
  
//process.cwd() - тек.раб.дир.процесса
console.log(`Current directory: ${process.cwd()}`);

//PID процесса (уник.id)
console.log(`This process is pid ${process.pid}`);

//платформа ОС
console.log(`This platform is ${process.platform}`);

//заголовок процесса
console.log(`This title is ${process.title}`);

//как долго длится процесс (мс)
console.log('time: ', process.uptime())

console.log(process.stdout.write(`STDOUT\n`));
