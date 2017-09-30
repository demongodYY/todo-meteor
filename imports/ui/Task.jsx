import React from 'react';
import PropTypes from 'prop-types';
import { Tasks } from '../api/tasks.js'

// Task component - represents a single todo item
export default class Task extends React.Component {
    toggleChecked() {
        Tasks.update(this.props.task._id, {
            $set: {checked: !this.props.task.checked },
        })
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }
    render() {
        const taskClassName = this.props.task.checked ? 'checked' : '';
        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>
                <input
                    type="checkbox"
                    readOnly
                    defaultChecked={this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                />
                <span className="text">{this.props.task.text}</span>
            </li>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
};
