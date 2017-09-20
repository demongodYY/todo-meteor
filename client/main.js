import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../imports/api/tasks';

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
        Meteor.call('tasks.insert', text);

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
    return Tasks.find({
        checked: { $ne: true },
        owner:Meteor.userId()
    }).count();
  },
});

Template.tasks.helpers({
  taskList() {
    if(bodyInstance.state.get('hideCompleted')) {
      return Tasks.find({
          checked: { $ne: true },
          owner:Meteor.userId()
      }, { sort: { createdAt: -1 } });
    }
    return Tasks.find({owner:Meteor.userId()}, { sort: { createdAt: -1 } });
  },
});

Template.tasks.events({
    'click .toggle-checked'() {
        Meteor.call('tasks.setChecked', this._id, !this.checked);
    },
    'click .delete'() {
        Meteor.call('tasks.remove', this._id);
    },

});

