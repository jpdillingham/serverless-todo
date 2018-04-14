import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

class TodoList extends Component {
    handleTodoChange = (event, value) => {
        this.setState({ newTodo: value });
    }

    handleAdd = () => {
        this.setState({
            todos: this.state.todos.concat({ todo: this.state.newTodo }),
            newTodo: ''
        })
    }

    render() {
        return (
            <List>
                {this.props.todos.length > 0 ? 
                    <Subheader>{this.props.title}</Subheader> : ''}
                    {this.props.todos
                        .map(todo => 
                            <ListItem
                                leftIcon={this.props.icon}
                                onClick={() => this.props.onClick(todo)}
                            >
                                {todo.todo}
                            </ListItem>
                        )
                    }
            </List>
        );
    }
}

export default TodoList;
