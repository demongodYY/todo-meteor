import React from 'react';
import PropTypes from 'prop-types';

// Task component - represents a single todo item
export default class Task extends React.Component {
    render() {
        return (
            <li>{this.props.task.text}</li>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
};
