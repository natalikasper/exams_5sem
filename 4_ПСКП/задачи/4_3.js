//модуль консоль
//console.info (тож самое)
console.log('LOG');

const code = 5;
//console.warn(тож самое)
console.error('error', code);

//запуск таймер для вычисл.длительности оп-ции
console.time('100-elements');
for (var i = 0; i > 100; i++) {
  ;
}
//остан.таймер, запущенный пред.ф-цией
console.timeEnd('100-elements');

//выводит в stdout полученную строку в виде объекта
console.dir('erer');

//выводит в stderr строку 'trace' с сообщение и отслеж.его поз.в коде
console.trace('Show me');
