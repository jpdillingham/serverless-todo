import React, { Component } from 'react';

const initialState = {
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

  render() {
    console.log(this.state);
    return (
      <div>
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
    );
  }
}

export default App;
