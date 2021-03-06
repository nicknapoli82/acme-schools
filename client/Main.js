import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

import store from './store';
import Home from './components/Home';
import Students from './components/Students';
import Schools from './components/Schools';
import SingleSchool from './components/SingleSchool';
import Register from './components/Register';
import {initSchools} from './storeReducers/schoolReducer';
import {initStudents} from './storeReducers/studentReducer';
import {loginUser} from './storeReducers/userReducer';

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
	  result = await axios.get('/api/session/checkLoggedIn');
	  if(result.status === 202) {
	      store.dispatch(loginUser(result.data));
	  }
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
          <Route exact path="/schools" component={Schools} />
          <Route path="/schools/:id" component={SingleSchool} />
          <Route path="/register" component={Register} />
        </Router>
      </Provider>
    );
  }
}
