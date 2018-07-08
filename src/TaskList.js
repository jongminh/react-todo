import React, { Component } from 'react';
import Task from './Task'

class TaskList extends React.Component {
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

export default TaskList