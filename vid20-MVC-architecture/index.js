import express from 'express';
import userRouter from './routes/user.js';
import connectMongoDb from './connection.js';
import createLogs from './middlewares/index.js';

const app = express();
const PORT = 8000;

// DB Connection
connectMongoDb('mongodb://127.0.0.1:27017/myDb-1');
// mongoose.connect()
//     .then(() => console.log('MongoDB Connected!'))
//     .catch((err) => console.log('Connection error: ', err));

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Custom Middleware
app.use(createLogs('logs.txt'));

// Routes
app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
})
