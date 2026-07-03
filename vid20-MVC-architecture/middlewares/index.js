import fs from 'fs';

const createLogs = (fileName) => {
    return (req, res, next) => {
        fs.appendFile(fileName, `${new Date().toLocaleString()} - ${req.ip} - ${req.method}: ${req.path}\n`, (err) => {
            if (err) {
                console.log('Error on creating logs: ', err)
            }
            next();
        })
    }
}

export default createLogs;