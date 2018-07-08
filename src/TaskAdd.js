import React, { Component } from 'react';

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

export default TaskAdd;