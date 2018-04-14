import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { List, ListItem } from 'material-ui/List';
import CheckBox from 'material-ui/svg-icons/toggle/check-box'
import CheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

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
          <span>To Do</span>
          <List>
            {this.state.todos
              .filter(todo => !todo.done)
              .map(todo => 
                <ListItem
                  leftIcon={<CheckBoxOutlineBlank/>}
                >{todo.todo}</ListItem>
              )
            }
          </List>
          <span>Done</span>
          <List>
            {this.state.todos
              .filter(todo => todo.done)
              .map(todo => 
                <ListItem
                  leftIcon={<CheckBox/>}
                >{todo.todo}</ListItem>
              )
            }
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
