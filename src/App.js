import React, { Component } from 'react';
import Overview from "./components/Overview";
import uniqid from 'uniqid';

class App extends Component{
  constructor () {
    super();

    this.state = {
			//task.text will be the state handling what we type in our input field
			task: {
        text: "",
        changeText: "",
        message: "",
				// sets id to a unique id based on time. etc.
        id: uniqid(),
        isEditable: false,
			},
			//tasks initially set to an empty array, where we will store all our tasks
      tasks: [],
      count: 0,
		};
  }
  
  handleInputChange = (e) => {
    //changes the state of the value of the input field to reflect what is being typed
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
    console.log(
			`handleChange before -> state changeText: ${this.state.task.changeText}, state message: ${this.state.task.message}`
		);
    this.setState({
			task: {
				text: "",
				changeText: e.target.value,
				message: e.target.value,
				id: this.state.task.id,
				isEditable: true,
			},
    });
    console.log(
			`handleChange after -> state changeText: ${this.state.task.changeText}, state message: ${this.state.task.message}`
		);
  }

  addTask = (e) => {
    e.preventDefault();
    // add the new task to the end of the array by updating the state of the array to reflect an addition

    //check if value was empty
    console.log("added task");
    this.setState({
			// tasks: [...this.state.tasks, this.state.task],
			tasks: this.state.tasks.concat(this.state.task),
			// set the state of the input field value back to an empty string to clear it
			// task: {
      //   text: "",
      //   changeText: "",
      //   id: uniqid(),
      //   message: this.state.task.message,
      //   isEditable: false,
			// },
			count: this.state.count + 1,
    });

    //reset task
    this.resetTask();
  };

  resetTask = () => {
    this.setState({
			task: {
				text: "",
				changeText: "",
				message: "",
				// sets id to a unique id based on time. etc.
				id: uniqid(),
				isEditable: false,
			},
		});
  }

  deleteTask = (id) => {
    //set the state of the array equal to the filtered away, filtering out the task with matching id to delete
    this.setState({
      tasks: this.state.tasks.filter(task => {
        return task.id !== id;
      }),
      //decrease total count
      count: this.state.count - 1,
    })
  };
  
  allowEdit = (id, message) => {
    console.log(`allow edit before -> state changeText: ${this.state.task.changeText}, state message: ${this.state.task.message} message: ${message}`);
    const copy = [...this.state.tasks];
    const index = copy.findIndex(task => {
      return task.id === id;
    });
    copy[index] = {
			isEditable: true,
			// text: "",
			message: message,
			changeText: "",
			id: id,
		};
    
    this.setState({
      tasks: [...copy],
      count: this.state.count,
    });
    console.log(
			`allow edit after -> state changeText: ${this.state.task.changeText}, state message: ${this.state.task.message} message: ${message}`
		);
  };

  replaceTask = (id, message) => {
    console.log(
			`replaceTask before -> state changeText: ${this.state.task.changeText}, state message: ${this.state.task.message} message: ${message}`
		);

    //make copy of tasks array, search for that id, change task at that id, spread copy array into state array
    const copy = [...this.state.tasks];
    const index = copy.findIndex(task => {
      return task.id === id;
    });

    //if the message state has text update it to that
    if (this.state.task.message !== "") {
      copy[index] = {
				isEditable: false,
				text: "",
				message: this.state.task.message,
				changeText: "",
				id: id,
			};
    }
    //if the message stae doesnt have state keep message as message
    else if(this.state.task.message === ""){
      copy[index] = {
				isEditable: false,
				text: "",
				message: message,
				changeText: "",
				id: id,
			};
    }
    

    // if(this.state.task.changeText !== message)
    // copy[index] = {
		// 	isEditable: true,
    //   text: "",
    //   message: message,
    //   changeText: "",
    //   id: id,
		// };

    this.setState({
			tasks: [...copy],
      count: this.state.count
		});

		//reset task
		this.resetTask();
    // //if changeText isnt undefined, update message
    // const copy = [...this.state.tasks];
    // const index = copy.findIndex((task) => {
		// 	return task.id === id;
    // });
    
    // // if (this.state.task.changeText === "" || this.state.task.changeText === message || this.state.task.message === message) {
    // if ( this.state.task.changeText === "") {
    //   copy[index] = {
    //     isEditable: false,
    //     // text: "",
    //     message: message,
    //     changeText: "",
    //     id: id,
    //   };
    // }
    // else {
    //   console.log(
		// 		"change",
		// 		message,
		// 		this.state.task.changeText,
		// 		this.state.task.message
		// 	);
    //   copy[index] = {
    //     isEditable: false,
    //     // text: "",
    //     message: this.state.task.message,
    //     changeText: "",
    //     id: id,
    //   };
      
    // }

    // this.setState({
    //   tasks: [...copy],
    //   count: this.state.count,
    // });
    console.log(
			`replaceTask after -> state changeText: ${this.state.task.changeText}, state message: ${this.state.task.message} message: ${message}`
		);
  };

  render() {
    //desstructure props
    const { task, tasks, count } = this.state;
    return (
			<div>
				<form>
					<h1 className="title">Task List</h1>
					<label htmlFor="input">Enter Task</label>
					<input
						onChange={this.handleInputChange}
						value={task.text} //will change based on the state of the task value inside the event handler
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
