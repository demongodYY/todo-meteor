import { Template } from 'meteor/templating';

import Tasks from '../imports/api/tasks.js';

import './main.html';


Template.tasks.helpers({
  taskList() {
    return Tasks.find({}, { sort: { createdAt: -1 } });
  }
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});

