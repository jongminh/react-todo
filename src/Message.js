import React from 'react';


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

export default Message;