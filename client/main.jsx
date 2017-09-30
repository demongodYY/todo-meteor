import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDom from 'react-dom';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
    ReactDom.render(<App />, document.getElementById('app'));
});
