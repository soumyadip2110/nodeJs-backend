import express, { urlencoded } from 'express';
import users from './MOCK_DATA.json' with {type: 'json'};
import fs from 'fs';

const app = express();
const PORT = 8000;

// Middlewares
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    fs.appendFile('./logs.txt', `${new Date().toLocaleString()} - ${req.ip} - ${req.method}: ${req.path}\n`, (err) => {
        if (err) {
            console.log('Error in generating logs!', err);
        }
        next();
    })
})

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
    return res.json(user ? user : {status: 'user not found!'});
})

app.post('/api/users/', (req, res) => {
    const body = req.body;
    users.push({ id: users.length + 1, ...body });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            console.log(err)
        } else {
            return res.json({ status: 'success', generated_id: users.length });
        }
    });
})

app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    // const updatedUsers = users.map(user => (
    //     user.id === id ? {id, ...body} : user
    // ));

    // alternate recommended way, updates the users array in the memory as well

    const user = users.find(user => user.id === id);
    if (!user) return res.json({status: 'failed, user not found!'});

    Object.assign(user, body);
    
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) console.log(err);
        else return res.json({status: 'success'});
    })
})

app.delete('/api/users/:id', (req, res) => {
    const index = users.findIndex(user => user.id === Number(req.params.id));
    users.splice(index, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), err => {
        if (err) {
            return res.json({ status: 'Failed to delete' });
        }
        res.json({ status: 'success' });
    })
})

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
})
