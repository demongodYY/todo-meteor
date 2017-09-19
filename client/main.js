import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import Tasks from '../imports/api/tasks.js';
import '../imports/startup/accounts-config.js';

import './main.html';

let bodyInstance = null;

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
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});

Template.body.onCreated( () => {
  bodyInstance = Template.instance();
  bodyInstance.state =  new ReactiveDict();
});

Template.body.helpers({
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.tasks.helpers({
  taskList() {
    if(bodyInstance.state.get('hideCompleted')) {
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});

Template.tasks.events({
  'click .toggle-checked'() {
    Tasks.update(this._id, {
      $set: { checked: !this.checked},
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },  

});

