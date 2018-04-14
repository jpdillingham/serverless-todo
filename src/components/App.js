import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader'
import CheckBox from 'material-ui/svg-icons/toggle/check-box'
import CheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import TodoList from './TodoList';
import { Checkbox } from 'material-ui';

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
        this.setState({ newTodo: value });
    }

    handleAdd = () => {
        this.setState({
            todos: this.state.todos.concat({ todo: this.state.newTodo }),
            newTodo: ''
        })
    }

    handleClick = (todo) => {
        console.log(todo)
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <TextField
                        hintText="To Do"
                        floatingLabelText="To Do"
                        value={this.state.newTodo}
                        onChange={this.handleTodoChange}
                    />
                    <RaisedButton 
                        label="Add" 
                        primary={true}
                        disabled={this.state.newTodo === ''}
                        onClick={this.handleAdd}
                    />
                    <TodoList
                        todos={this.state.todos.filter(todo => !todo.done)}
                        title={'Active'}
                        icon={<CheckBoxOutlineBlank/>}
                        onClick={handleClick}
                    />
                    <TodoList
                        todos={this.state.todos.filter(todo => todo.done)}
                        title={'Done'}
                        icon={<CheckBox/>}
                        onClick={handleClick}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
