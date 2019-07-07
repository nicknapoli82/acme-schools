import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter as Router, Route} from 'react-router-dom';

import store from './store';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import Home from './components/Home';

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
      </Provider>
    );
  }
}
