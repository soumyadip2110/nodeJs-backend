import express from 'express';
import users from './MOCK_DATA.json' with {type: 'json'};
// const express = require('express');
// const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 8000;

// Routes
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join('')}
        </ul>
    `;
    res.send(html);
})

// REST APIs
app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})

app.post('/api/users/:id', (req, res) => {
    // TODO: Create new user
    return res.json({ status: 'Pending' });
})

app.patch('/api/users/:id', (req, res) => {
    // TODO: Edit user with id
    return res.json({ status: 'Pending' });
})

app.delete('/api/users/:id', (req, res) => {
    // TODO: Delete user with id
    return res.json({ status: 'Pending' });
})

// OR
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        return res.json({ status: 'Pending' });
    })
    .delete((req, res) => {
        // TODO: Delete user with id
        return res.json({ status: 'Pending' });
    })

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
})
