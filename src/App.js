import React, { Component } from 'react';
import Overview from './components/Overview';
import uniqid from 'uniqid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: { 
        text: '',
        edit: false,
        id: uniqid(),
      },
      tasks: [],
    };
  }

  handleChange = (e) => {
    this.setState((prevState) => {
      return {
        task: {
          text: e.target.value,
          id: prevState.task.id,
        },
      };
    });
  };

  
  onSubmitTask = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        tasks: [...prevState.tasks, prevState.task],
        task: {
          text: '',
          edit: false,
          id: uniqid(),
        },
      };
    });
  };  
  
  removeTask = (e) => {
    const idToRemove = e.target.parentElement.dataset.id;

    this.setState((prevState) => {
      const filteredTasks = prevState.tasks.filter((task) => {
        return task.id !== idToRemove;
      });

      return {
        tasks: filteredTasks,
      };
    });
  };

  editTask = (e) => {
    const taskId = e.target.parentElement.dataset.id;
    const targetElementId = e.target.id;
    
    this.setState((prevState) => {
      const updatedTasks = [...prevState.tasks];
      const index = prevState.tasks.findIndex((task) => {
        return task.id === taskId;
      });
      
      if (targetElementId === 'edit-btn') {
        updatedTasks[index].edit = true;
      } else {
        const input = e.target.parentElement.children[0].value;
        updatedTasks[index].text = input;
        updatedTasks[index].edit = false;
      }

      return {
        tasks: updatedTasks,
      };
    });
  };

  render() {
    const { task, tasks } = this.state;

    return (
      <div>
        <form onSubmit={ this.onSubmitTask }>
          <label htmlFor='taskInput'>Enter task</label>
          <input 
            type='text' 
            id='taskInput'
            value={ task.text }
            onChange={ this.handleChange } />
          <button type='submit'>Add Task</button>
        </form>
        <Overview tasks={ tasks } 
          removeTask={ this.removeTask }
          editTask={ this.editTask } />
      </div>
    );
  }
}

export default App;







  // handleChange = (e) => {
  //   this.setState({
  //     task: {
  //       text: e.target.value,
  //       id: this.state.task.id,
  //     },
  //   });
  // };

  // onSubmitTask = (e) => {
    //   e.preventDefault();
    //   this.setState({
      //     tasks: this.state.tasks.concat(this.state.task),
  //     task: { 
  //       text: '',
  //       id: uniqid(),
  //     },
  //   });
  // };