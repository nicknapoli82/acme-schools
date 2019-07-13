import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

import store from './store';
import Home from './components/Home';
import Students from './components/Students';
import Schools from './components/Schools';
import {schoolReducer, initSchools} from './storeReducers/schoolReducer';
import {initStudents} from './storeReducers/studentReducer';

export default class Main extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    try{
      let result = await axios.get('/api/schools');
      store.dispatch(initSchools(result.data));
      result = await axios.get('/api/students');
      store.dispatch(initStudents(result.data));
    }
    catch(e){
      console.log(e);
    }

  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/students" component={Students} />
          <Route path="/schools" component={Schools} />
        </Router>
      </Provider>
    );
  }
}
