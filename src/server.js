const awsServerlessExpress = require('aws-serverless-express');  
const path = require('path');  
const express = require('express');  
const bodyParser = require('body-parser');  
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

app.get('/todos', (req, res) => {  
    res.status(200);
    res.json(todos);
});

app.post('/todos', (req, res) => {
    let todo = req.body;

    todos.push(todo);

    res.status(200);
    res.json(todos);
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;

    todos = todos.map(todo => { 
        return todo.id === id ? { ...todo, done: !todo.done } : todo
    });

    res.status(200);
    res.json(todos);
});

app.listen(port, () => console.log('Listening on port ' + port + '.')); // ignored by lambda

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);  