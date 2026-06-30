// const fs = require('fs');
import fs from 'fs';

// Writing........
// Synchronous call
// fs.writeFileSync('./test.txt', 'hello');

// Asynchronous call
// fs.writeFile('./test.txt', 'hello, asynchronous call', (err) => {});


// Reading........
// Synchronous call
// const result = fs.readFileSync('./readFile.txt', 'utf-8');
// console.log(result);

// Asynchronous call
// fs.readFile('./readFile.txt', 'utf-8', (err, result) => {
//     if (err) {
//         console.log('error: ', err);
//     } else {
//         console.log(result);
//     }
// });


// Appending.......
// Synchronous call
// fs.appendFileSync('./test.txt', `${Date.now()}: Hello again!\n`);

// ................
// copy file
// fs.cpSync('./test.txt', './copy.txt');

// delete file
// fs.unlinkSync('./copy.txt');

// get status/file info
console.log(fs.statSync('./test.txt').isFile());
