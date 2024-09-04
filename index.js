const http = require('http');
const url = require('url');

const apiKey = process.env.apiKey
const city = 'Omsk'
//const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`

const getFormCreateComponent = () => (`
  <form method="POST" action="/do">
    <div>Город</div>
    <input name="city" required />
    <button class="btn btn-sm btn-success" type="submit">Погода</button>
  </form>
`)

const server = http.createServer((req, res) => {
  const urlParsed = url.parse(req.url, true);
  const { pathname, query } = urlParsed;
  const { method } = req;
  res.setHeader('Content-Type', 'text/html; charset=utf-8;')
  if (pathname === '/do') {
    if (method === 'POST') {
      let body = [];
      console.log('loading')
      req
        .on('data', (chunk) => {
          body.push(chunk)
        })
        .on('end', () => {
          body = Buffer.concat(body).toString().split('=')[1];
          console.log(body)
        });
    }
  }
  else {
    res.write("<h1>Погода</h1>")
    res.write(getFormCreateComponent())
  }
  res.statusCode = 302;  
  res.setHeader('Location', '/');
  res.end()
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);