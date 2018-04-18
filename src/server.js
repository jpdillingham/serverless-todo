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

const database = require('./database');
const user = 'default-user';

let todos = [];

app.get('/todos', (req, res) => {  
    database.get('todos', user)
    .then(data => {
        let todos = data && data.Item && data.Item.todos ? data.Item.todos : [];

        res.status(200);
        res.json(todos);
    })
});

app.post('/todos', (req, res) => {
    let todo = req.body;

    database.get('todos', user)
    .then(data => {
        let todos = data && data.Item && data.Item.todos ? data.Item.todos : [];

        todos.push(todo);
        return todos;
    })
    .then(todos => {
        database.set('todos', user, todos);
        return todos;
    })
    .then(todos => {
        res.status(200);
        res.json(todos);
    });
});

app.put('/todos/:id', (req, res) => {
    let id = req.params.id;
    let todo = req.body;

    database.get('todos', user)
    .then(data => {
        let todos = data && data.Item && data.Item.todos ? data.Item.todos : [];

        todos = todos.map(t => { 
            return t.id === id ? todo : t
        });

        return todos;
    })
    .then(todos => {
        database.set('todos', user, todos);
        return todos;
    })
    .then(todos => {
        res.status(200);
        res.json(todos);
    });
});

app.listen(port, () => console.log('Listening on port ' + port + '.')); // ignored by lambda

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);  