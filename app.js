const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1 align="center">Please type a message below</h1>');
        res.write('<form align="center" action="/message" method="POST"><input type="text" name="message"></input><br><button type="submit">Submit</button></form>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {    
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.appendFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
};

exports.handler = requestHandler;
exports.someText = 'Some hard coded Text';

