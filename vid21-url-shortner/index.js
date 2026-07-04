import express from 'express';
import urlRouter from './routes/url.js';
import connectMongoDb from './connection.js';

const app = express();
const PORT = 8000;

// Connection
connectMongoDb('mongodb://127.0.0.1:27017/url-shortner');

// app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use('/url', urlRouter);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});