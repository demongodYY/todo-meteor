import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import Task from './Task.jsx';
import { Tasks } from '../api/tasks'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftTask: '',
            hideCompleted: false,
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const text = this.state.draftTask;
        Tasks.insert({
            text,
            createdAt: new Date(),
        })
        this.setState({
            draftTask:'',
        })
    } 
    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }
    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
          filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => {
            return (<Task key={task._id} task={task} />);
        });
    }
    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                    <label className="hide-completed">
                        <input
                        type="checkbox"
                        readOnly
                        checked={this.state.hideCompleted}
                        onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new tasks"
                            value = {this.state.draftTask}
                            onChange= {(event) => {
                                this.setState({
                                    draftTask: event.target.value,
                                })
                            }}
                        />
                    </form>
                </header>
                <ul>
                    { this.renderTasks() }
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);
