import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url}: New req. received\n`;
    fs.appendFile('./logs.txt', log, (err, data) => {
        switch(req.url){
            case '/':
                res.end('Hello from server');
                break;
            case '/about':
                res.end('I am learning backend');
                break;
            default:
                res.end('404 error! Page not found!');
        }
    });
});

server.listen(8000, () => {
    console.log('Server started!')
});
