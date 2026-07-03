import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import { timeStamp } from 'console';

const app = express();
const PORT = 8000;

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/myDb-1')
    .then(() => console.log('MongoDB Connected!'))
    .catch((err) => console.log('Connection error: ', err));

// Schema
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        jobTitle: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

// Model
const User = mongoose.model('user', userSchema);

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Custom Middleware
app.use((req, res, next) => {
    fs.appendFile('./logs.txt', `${new Date().toLocaleString()} - ${req.ip} - ${req.method}: ${req.path}\n`, (err) => {
        if (err) {
            console.log('Error on creating logs: ', err)
        }
        next()
    });
});

// Routes and REST APIs
app.get('/users', async (req, res) => {
    const allUsers = await User.find({});
    const html = `
        <ul>
            ${allUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join('')}
        </ul>
    `;
    res.status(200).send(html);
});

app.get('/api/users', async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
});

app.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user){
        return res.status(404).json({msg: 'No user found'});
    }
    return res.status(200).json(user);
});

app.post('/api/users', async (req, res) => {
    const body = req.body;
    if (!body || !body.firstName || !body.email || !body.jobTitle || !body.gender) {
        res.status(400).json({ msg: 'First name, email, job title and gender are required fields!' });
    }
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName || '',
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle
    });
    console.log('Result: ', result);
    res.status(201).json({ msg: 'User created' });
});

app.patch('/api/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {lastName: 'Changed'});
    return res.json({msg: 'success'});
});

app.delete('/api/users/:id', async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id);
    console.log(result);
    res.json({msg: 'deleted!'});
});

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
})
