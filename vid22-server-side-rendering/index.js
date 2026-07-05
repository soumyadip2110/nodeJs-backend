import express from 'express';
import urlRouter from './routes/url.js';
import staticRouter from './routes/staticRouter.js';
import connectMongoDb from './connection.js';
import path from 'path';

const app = express();
const PORT = 8000;

// Connection
connectMongoDb('mongodb://127.0.0.1:27017/url-shortner');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/url', urlRouter);

app.use('/', staticRouter);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});