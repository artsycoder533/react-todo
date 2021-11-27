import React, { Component } from 'react';
import Overview from "./components/Overview";
import uniqid from 'uniqid';

class App extends Component{
  constructor () {
    super();

    this.state = {
			task: {
        text: "",
        changeText: "",
        message: "",
        id: uniqid(),
        isEditable: false,
			},
      tasks: [],
      count: 0,
		};
  }
  
  handleInputChange = (e) => {
    this.setState({
			task: {
				text: e.target.value,
				message: e.target.value,
				id: this.state.task.id,
        isEditable: false,
        changeText: "",
			},
		});
  };

  handleEditChange = (e) => {
    this.setState({
			task: {
				text: "",
				changeText: e.target.value,
				message: e.target.value,
				id: this.state.task.id,
				isEditable: true,
			},
    });
  }

  addTask = (e) => {
    e.preventDefault();
    this.setState({
			tasks: this.state.tasks.concat(this.state.task),
			count: this.state.count + 1,
    });

    this.resetTask();
  };

  resetTask = () => {
    this.setState({
			task: {
				text: "",
				changeText: "",
				message: "",
				id: uniqid(),
				isEditable: false,
			},
		});
  }

  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter(task => {
        return task.id !== id;
      }),
      count: this.state.count - 1,
    })
  };
  
  allowEdit = (id, message) => {
    const copy = [...this.state.tasks];
    const index = copy.findIndex(task => {
      return task.id === id;
    });
    copy[index] = {
			isEditable: true,
			message: message,
			changeText: "",
			id: id,
		};
    
    this.setState({
      tasks: [...copy],
      count: this.state.count,
    });
  };

  replaceTask = (id, message) => {
    const copy = [...this.state.tasks];
    const index = copy.findIndex(task => {
      return task.id === id;
    });

    if (this.state.task.message !== "") {
      copy[index] = {
				isEditable: false,
				text: "",
				message: this.state.task.message,
				changeText: "",
				id: id,
			};
    }

    else if(this.state.task.message === ""){
      copy[index] = {
				isEditable: false,
				text: "",
				message: message,
				changeText: "",
				id: id,
			};
    }

    this.setState({
			tasks: [...copy],
      count: this.state.count
		});

		this.resetTask();
  };

  render() {
    const { task, tasks, count } = this.state;
    return (
			<div>
				<form>
					<h1 className="title">Task List</h1>
					<label htmlFor="input">Enter Task</label>
					<input
						onChange={this.handleInputChange}
						value={task.text} 
						type="text"
						id="input"
						className="input"
					></input>
					<button type="submit" onClick={this.addTask}>
						Add Task
					</button>
				</form>
        <Overview tasks={tasks} count={count} deleteTask={this.deleteTask} allowEdit={this.allowEdit} handleEditChange={this.handleEditChange} replaceTask={this.replaceTask}/>
			</div>
		);
  }
}

export default App;
