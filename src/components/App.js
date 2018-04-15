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
        axios.get(API_URL + '/todos')
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
        this.setState({
            todos: this.state.todos.concat({ id: getGuid(), todo: input })
        });
    };

    handleTodoClick = (todo) => {
        this.setState({
            todos: this.state.todos.map(t => { 
                return t.id === todo.id ? { ...todo, done: !todo.done } : t
            })
        });
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
