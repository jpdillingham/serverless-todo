import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CheckBox from 'material-ui/svg-icons/toggle/check-box'
import CheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import TextField from 'material-ui/TextField'
import TodoList from './TodoList';
import Paper from 'material-ui/Paper'

import { getGuid } from '../util'

const initialState = {
    newTodo: '',
    todos: [
        {
            todo: "Load the app",
            done: true,
        },
        {
            todo: "Make some To Dos",
        }
    ]
};

const styles = {
    paper: {
        width: 400,
        margin: 'auto'
    },
    textField: {
        width: 370,
        left: 15,
        top: 10,
        marginBottom: 10
    }
}

class App extends Component {
    state = initialState;

    handleTodoChange = (event, value) => {
        this.setState({ 
            newTodo: value 
        });
    }

    handleTodoEnter = () => {
        this.setState({
            todos: this.state.todos.concat({ id: getGuid(), todo: this.state.newTodo }),
            newTodo: ''
        })     
    }

    handleTodoClick = (todo) => {
        this.setState({
            todos: this.state.todos.map(t => { 
                return t.todo === todo.todo ? { ...todo, done: !todo.done } : t
            })
        })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Paper zDepth={4} style={styles.paper}>
                    <TextField
                        style={styles.textField}
                        hintText="To Do"
                        value={this.state.newTodo}
                        onChange={this.handleTodoChange}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                              this.handleTodoEnter();
                            }
                        }}
                    />
                    <TodoList
                        todos={this.state.todos.filter(todo => !todo.done)}
                        title={'Active'}
                        icon={<CheckBoxOutlineBlank/>}
                        onClick={this.handleTodoClick}
                    />
                    <TodoList
                        todos={this.state.todos.filter(todo => todo.done)}
                        title={'Done'}
                        icon={<CheckBox/>}
                        onClick={this.handleTodoClick}
                    />
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default App;
