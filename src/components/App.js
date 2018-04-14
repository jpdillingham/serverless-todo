import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
          <ul>
            {this.state.todos
              .filter(todo => !todo.done)
              .map(todo => 
                <li>{todo.todo}</li>
              )
            }
          </ul>
          <span>Done</span>
          <ul>
            {this.state.todos
              .filter(todo => todo.done)
              .map(todo => 
                <li>{todo.todo}</li>
              )
            }
          </ul>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
