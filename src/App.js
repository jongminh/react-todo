import React, { Component } from 'react';
import './App.css';
// import Message from './Message'
// import TaskAdd from './TaskAdd'
// import TaskList from './TaskList'

const todoTasks = [
  { id: 1, name: 'school', description: 'do homework', done: true },
  { id: 2, name: 'school', description: 'do homework2', done: true },
  { id: 3, name: 'school', description: 'do homework3', done: false },
  { id: 4, name: 'school1', description: 'do homework4', done: true },
  { id: 5, name: 'school1', description: 'do homework5', done: false },
  { id: 6, name: 'school1', description: 'do homework6', done: true },
  { id: 7, name: 'school2', description: 'do homework7', done: true },
  { id: 8, name: 'school2', description: 'do homework8', done: false },
  { id: 9, name: 'school2', description: 'do homework9', done: true },
  { id: 10, name: 'school3', description: 'do homework10', done: false }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoTasks: todoTasks,
      lastId: todoTasks[todoTasks.length - 1].id
    }

    this.removeTask = this.removeTask.bind(this);
    this.changeTaskStatus = this.changeTaskStatus.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask(newItem) {
    const { name, description } = newItem
    const newLastId = this.state.lastId + 1
    const newTask = {
      id: newLastId,
      name: name,
      description: description,
      done: false
    };

    this.setState({
      todoTasks: [newTask, ...this.state.todoTasks ],
      lastId: newLastId
    });

    console.log("A new task is added")
  }

  removeTask(index) {
    console.log(this.state.todoTasks)
    this.state.todoTasks.splice(index, 1);
    this.setState({
      todoTasks: this.state.todoTasks
    });
    console.log(index + "A task is removed")
    console.log(this.state.todoTasks)
  }

  changeTaskStatus(index) {
    let changedTasks = this.state.todoTasks
    changedTasks[index].done = !changedTasks[index].done;
    this.setState({
      todoTasks: changedTasks
    });
    console.log("Done status is changed")
    console.log(this.state.todoTasks)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">To Do List App</h1>
        </header>
        <div className="Todo-list">
          <h2> To Do List</h2>
          <Message tasks={this.state.todoTasks} />
          <div className="Task-add">
            <TaskAdd addNewTask={this.addTask} />
          </div>
          <TaskList tasks={this.state.todoTasks} removeTask={this.removeTask} changeTaskStatus={this.changeTaskStatus} >
          </TaskList>
        </div>
      </div>
    );
  }
}

class TaskAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }
  handleSubmit(event) {
    // stops the default action(refresh) of an element from happening 
    event.preventDefault();

    if (this.state.name && this.state.description) {
      this.props.addNewTask(this.state);
      this.setState({
        name: '', description: ''
      });
    }
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  render() {
    const hasErrors = (this.state.name.length === 0 || this.state.description.length === 0);

    return (
      <form ref="taskAddForm" onSubmit={this.handleSubmit}>
        <input ref="taskName" type="text" value={this.state.name} onChange={this.handleChangeName} placeholder="Task Name" />
        {" : "}
        <input ref="taskDescription" type="text" size="30" value={this.state.description} onChange={this.handleChangeDescription} placeholder="Task Description" />
        <button type="submit" disabled={hasErrors}>Add Task</button>
      </form>
    );
  }
}

class TaskList extends Component {

  render() {
    const tasks = this.props.tasks;
    const unorderedListTasks = tasks.map((task, index) =>
      <Task key={task.id.toString()} task={task} index={index} removeTask={this.props.removeTask} changeTaskStatus={this.props.changeTaskStatus} />
    )

    return (
      <ul>
        {unorderedListTasks}
      </ul>

    )
  }
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleTaskStatus = this.handleTaskStatus.bind(this);
  }

  handleRemove() {
    this.props.removeTask(parseInt(this.props.index, 10));
  }

  handleTaskStatus() {
    this.props.changeTaskStatus(parseInt(this.props.index, 10));
  }

  render() {
    const task = this.props.task
    return (
      <li>
        <div className="Todo-task-content">
          <input type="checkbox" checked={task.done} onChange={this.handleTaskStatus} />
          {' '}
          <span className={task.done ? 'Task-done' : null}>
            {task.name}: {task.description}
          </span>
          {' '}
          <button type="button" onClick={this.handleRemove}>X</button>
        </div>

      </li>
    )
  }
}

function Message(props) {
  const hasIncompletedTasks = props.tasks.filter((task) => task.done === false).length > 0;
  let message = props.tasks.length === 0 ? "No More Todo Tasks" : "";

  if (!hasIncompletedTasks && props.tasks.length > 0) {
    message = "No More Incompleted Todo Tasks"
  }

  if (message.length === 0) {
    return null;
  }
  return (
    <div className="Message">
      {message}
    </div>
  );
}

export default App;
