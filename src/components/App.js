import React, { Component } from 'react';
import axios from 'axios';

import { getGuid } from '../util';

import { API_URL } from '../constants';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Paper from 'material-ui/Paper';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';

import TodoInput from './TodoInput';
import TodoList from './TodoList';

const styles = {
    paper: {
        width: 400,
        margin: 'auto'
    }
};

class App extends Component {
    state = {
        input: '',
        todos: [],        
    };

    componentWillMount = () => {
        axios.get(API_URL)
        .then(response => {
            this.setState({ todos: response.data })
        })
    }

    handleTodoChange = (event, value) => {
        this.setState({ 
            input: value 
        });
    };

    handleTodoEnter = (input) => {
        let todo = { id: getGuid(), todo: input };
        
        axios.post(API_URL, todo)
        .then(response => {
            this.setState({
                todos: response.data
            });
        });
    };

    handleTodoClick = (todo) => {
        todo = { ...todo, done: !todo.done };

        axios.patch(API_URL + '/' + todo.id, todo)
        .then(response => {
            this.setState({
                todos: response.data
            });
        })
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Paper zDepth={4} style={styles.paper}>
                    <TodoInput
                        placeholder={'To Do'}
                        handleEnter={this.handleTodoEnter}
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
    };
};

export default App;
