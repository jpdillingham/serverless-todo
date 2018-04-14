import React, { Component } from 'react';

const initialState = {
  todos: [
    {
      todo: "Load the app",
      done: true,
    },
    {
      todo: "Make some TODOs",
    }
  ]
};

class App extends Component {
  state = initialState;

  render() {
    return (
      <div>
        TODOS etc
      </div>
    );
  }
}

export default App;
