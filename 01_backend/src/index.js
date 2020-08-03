const express = require('express');
const {uuid} = require('uuidv4');
const { request, response } = require('express');

const projects = [];

const app = express();

function logRequests(request, response, next){
    const { method, url } = request;
    const label = `[${method.toUpperCase()}] - ${url}`;
    console.log(label);
    next();
}

app.use(logRequests);

app.use(express.json())

app.get('/', (request, response) =>{
    return response.json({method: "GET", url: "/"});
});

app.get('/projects', (request, response)=>{

    const {  name } = request.query;

    const results = name
    ? projects.filter(p => p.name.includes(name)) : projects

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const {name, desc} = request.body;
    const project = {id: uuid(), name, desc};
    projects.push(project);
    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const projectIndex = projects.findIndex(p => p.id = id);
    console.log("index", projectIndex);
    const {name, desc} = request.body;
    
    if (projectIndex < 0){
        return response.status(400).json({message: "Project not Found"});
    }

    const project = {
        id,
        name,
        desc
    }

    projects[projectIndex] = project;

    return response.json(project)
});

app.get('/projects/:id', (request, response) => {
    const {id} = request.params;
    const projectIndex = projects.findIndex(p => p.id = id);
    
    if (projectIndex < 0){
        return response.status(400).json({message: "Project not Found"});
    }
    const project = projects[projectIndex];
    return response.json(project)
});

app.delete('/projects/:id', (request, response)=> {
    const { id } = request.params;
    const projectIndex = projects.findIndex(p => p.id = id);
    if(projectIndex < 0){
        return request.status(400).json({message: "Project not found"});
    }
    projects.splice(projectIndex, 1);
    return response.status(204).send()
});

app.listen(3333, ()=>{
    console.log('Express server started')
});