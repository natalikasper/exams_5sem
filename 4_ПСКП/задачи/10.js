const http = require('http');
const fs   = require('fs').promises;

//async - ставится перед ф-цией и означ, что ф-ция всегда возвращ.промис
const requestHandler = async (req, res) => {
	if (req.url === '/xmlhttprequest') {
		//await - заставит интерпертатор JS ждать пока промис
			//справа от await не вып-ся
		let html = await fs.readFile('xmlhttprequest.html');
		res.end(html);
	}

	else if (req.url === '/fetch') {
		let html = await fs.readFile('fetch.html');
		res.end(html);
    }

    else if (req.url === '/api/fac') {
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.end('Faculty of Information Technology');
    }
};

const server = http.createServer(requestHandler).listen(3000);