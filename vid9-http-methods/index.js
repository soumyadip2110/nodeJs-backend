import http from 'http';
import fs from 'fs';
import url from 'url';

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();

    const log = `${Date.now()}- ${req.method}: ${req.url} - New req. received\n`;

    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile('./logs.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end('Hello from server');
                break;
            case '/user':
                const userName = myUrl.query.name;
                res.end(`Hi ${userName}`);
                break;
            case '/signup':
                if (req.method === 'GET')
                    res.end('This is sign up page');
                else if (req.method === 'POST') {
                    // db query
                    res.end('success');
                }
                break;
            default:
                res.end('404 error! Page not found!');
        }
    });
});

server.listen(8000, () => {
    console.log('Server started!')
});
