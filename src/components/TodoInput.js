import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

const styles = {
    textField: {
        width: 370,
        left: 15,
        top: 10,
        marginBottom: 10
    },
};

class TodoInput extends Component {
    state = { input: '' };

    handleChange = (event, value) => {
        this.setState({ 
            input: value 
        });
    };

    render() {
        return (
            <TextField
                style={styles.textField}
                hintText={this.props.placeholder}
                value={this.state.input}
                onChange={this.handleChange}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        this.props.handleEnter(this.state.input);
                        this.setState({ input: '' });
                    };
                }}
            />
        );
    };
};

export default TodoInput;
