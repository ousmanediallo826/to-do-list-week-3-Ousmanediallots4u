import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker , LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      date: "",
      due: null,
      todos: []
    };
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: new Date().toLocaleString('en-US')
    });
  };

  handleDueDateChange = (date) => {
    this.setState({
      due: date,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { content, due } = this.state;

    if (content.trim() === "" || due === null || isNaN(Date.parse(due))) {
      return;
    }

    const exists = this.state.todos.find(t => t.content === content);
    if (exists) {
      return;
    }

    const todo = {
      id: Math.random(),
      content: content,
      due: due.toLocaleDateString(),
    };
    this.props.addTodo(todo);

    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
      content: "",
      date: "",
      due: null
    }));
  
    // Reset the due date after adding a todo
    this.handleDueDateChange(null);
  };

  render() {
    return (
      <div>
        <TextField
          label="Add New Item"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            id="new-item-date"
            label="Due Date"
            value={this.state.due}
            onChange={this.handleDueDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </div>
    );
  }
}
export default AddTodo;
