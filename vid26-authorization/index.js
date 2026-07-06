import express from 'express';
import connectMongoDb from './connection.js';
import path from 'path';

import urlRouter from './routes/url.js';
import staticRouter from './routes/staticRouter.js';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import { checkForAuthentication, restrictTo } from './middleware/auth.js';

const app = express();
const PORT = 8000;

// Connection
connectMongoDb('mongodb://127.0.0.1:27017/url-shortner');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

// Routes
app.use('/', staticRouter);
app.use('/user', userRouter);
app.use('/url', restrictTo(['NORMAL', 'ADMIN']), urlRouter);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});