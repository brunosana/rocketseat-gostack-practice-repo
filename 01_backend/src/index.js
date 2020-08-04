const express = require('express');
const cors = require('cors');
const { request, response } = require('express');
const { uuid } = require('uuidv4');
const app = express();

app.use(cors())

app.use(express.json())

const users = [];

app.get('/', (request, response) => {
    return response.json({message: "Working", path: "/"});
});

app.get('/users', (request, response) => {
    return response.json(users);
});

app.get('/users/:id', (request, response) => {
    const { id } = request.params;
    const userIndex = users.findIndex(user => user.id = id);
    if (userIndex < 0){
        return response.status(204).json({message: "User not found"});
    }
    const user = users[userIndex];
    return response.json(user);
});

app.post('/users', (request, response) => {
    const { login, password, profile } = request.body;
    const user = {
        id: uuid(),
        login,
        password,
        profile
    };
    users.push(user);
    return response.json(user)
});

app.put('/users/:id', (request, response) => {
    const { id } = request.params;
    const {login, password, profile} = request.body;
    const userIndex = users.findIndex(user => user.id = id);
    if (userIndex < 0){
        return response.status(204).json({message: "User not found"});
    }

    const user = {
        id,
        login,
        password,
        profile
    }

    users[userIndex] = user;
    return response.json(user);

})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params;
    const userIndex = users.findIndex(user => user.id = id);
    if (userIndex < 0){
        return response.status(204).json({message: "User not found"});
    }
    users.splice(userIndex, 1);
    return response.status(204).send();
});


app.listen(3333)