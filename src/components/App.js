import React, { Component } from 'react';
import { getGuid } from '../util';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';

import TodoList from './TodoList';

const initialState = {
    input: '',
    todos: [],
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
    },
}

class App extends Component {
    state = initialState;

    handleTodoChange = (event, value) => {
        this.setState({ 
            input: value 
        });
    }

    handleTodoEnter = () => {
        this.setState({
            todos: this.state.todos.concat({ id: getGuid(), todo: this.state.input }),
            input: ''
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
                        value={this.state.input}
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
