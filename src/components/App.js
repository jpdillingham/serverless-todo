import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CheckBox from 'material-ui/svg-icons/toggle/check-box'
import CheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import TextField from 'material-ui/TextField'
import TodoList from './TodoList';

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

class App extends Component {
    state = initialState;

    handleTodoChange = (event, value) => {
        this.setState({ 
            newTodo: value 
        });
    }

    handleTodoEnter = () => {
        this.setState({
            todos: this.state.todos.concat({ todo: this.state.newTodo }),
            newTodo: ''
        })     
    }

    handleAdd = () => {
        this.setState({
            todos: this.state.todos.concat({ todo: this.state.newTodo }),
            newTodo: ''
        })
    }

    handleClick = (todo) => {
        this.setState({
            todos: this.state.todos.map(t => { 
                return t.todo === todo.todo ? { ...todo, done: !todo.done } : t
            })
        })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <TextField
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
                        onClick={this.handleClick}
                    />
                    <TodoList
                        todos={this.state.todos.filter(todo => todo.done)}
                        title={'Done'}
                        icon={<CheckBox/>}
                        onClick={this.handleClick}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
