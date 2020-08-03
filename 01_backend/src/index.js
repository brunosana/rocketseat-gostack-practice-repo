const express = require('express');
const { request, response } = require('express');

const app = express();
app.use(express.json())

app.get('/', (request, response) =>{
    return response.json({method: "GET", url: "/"});
});

app.get('/projects', (request, response)=>{
    return response.json([
        "elemento1",
        "elemento2",
        "elemento3",
        "elemento4"
    ]);
});

app.post('/projects', (request, response) => {
    const body = request.body;
    return response.json({
        name: body.name,
        desc: body.desc
    });
});

app.put('/projects/:id', (request, response) => {
    const params = request.params;
    const query = request.query;
    return response.json({
        id_passed: params.id,
        queryParams: query
    })
});

app.listen(3333, ()=>{
    console.log('Express server started')
});