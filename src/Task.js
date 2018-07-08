import React, { Component } from 'react';

class Task extends React.Component {
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

export default Task