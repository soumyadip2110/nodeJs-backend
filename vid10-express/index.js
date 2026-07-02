import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello from home page');
})

app.get('/about', (req, res) => {
    return res.send(`Hello ${req.query.name} of age ${req.query.age}`);
})

app.listen(8000, () => console.log('Server started!'));
